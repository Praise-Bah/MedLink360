from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from .models import (
    Role, PatientProfile, DoctorProfile, NurseProfile,
    PharmacistProfile, LabTechnicianProfile, FacilityAdminProfile
)

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """Serializer for User model"""
    
    roles = serializers.SerializerMethodField()
    full_name = serializers.ReadOnlyField()
    
    class Meta:
        model = User
        fields = [
            'id', 'email', 'first_name', 'last_name', 'full_name',
            'phone_number', 'date_of_birth', 'profile_picture',
            'active_role', 'is_verified', 'verified_at',
            'roles', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'is_verified', 'verified_at', 'created_at', 'updated_at']
    
    def get_roles(self, obj):
        return obj.roles.filter(is_active=True).values_list('role_type', flat=True)


class RoleSerializer(serializers.ModelSerializer):
    """Serializer for Role model"""
    
    role_display = serializers.CharField(source='get_role_type_display', read_only=True)
    user_email = serializers.EmailField(source='user.email', read_only=True)
    verified_by_email = serializers.EmailField(source='verified_by.email', read_only=True, allow_null=True)
    
    class Meta:
        model = Role
        fields = [
            'id', 'user', 'user_email', 'role_type', 'role_display',
            'is_verified', 'verified_at', 'verified_by', 'verified_by_email',
            'verification_documents', 'verification_notes',
            'is_active', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'verified_at', 'verified_by', 'created_at', 'updated_at']


class PatientProfileSerializer(serializers.ModelSerializer):
    """Serializer for Patient Profile"""
    
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = PatientProfile
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']


class DoctorProfileSerializer(serializers.ModelSerializer):
    """Serializer for Doctor Profile"""
    
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = DoctorProfile
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']


class NurseProfileSerializer(serializers.ModelSerializer):
    """Serializer for Nurse Profile"""
    
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = NurseProfile
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']


class PharmacistProfileSerializer(serializers.ModelSerializer):
    """Serializer for Pharmacist Profile"""
    
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = PharmacistProfile
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']


class LabTechnicianProfileSerializer(serializers.ModelSerializer):
    """Serializer for Lab Technician Profile"""
    
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = LabTechnicianProfile
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']


class FacilityAdminProfileSerializer(serializers.ModelSerializer):
    """Serializer for Facility Admin Profile"""
    
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = FacilityAdminProfile
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']


class UserRegistrationSerializer(serializers.ModelSerializer):
    """Serializer for user registration with role selection"""
    
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password_confirm = serializers.CharField(write_only=True, required=True)
    role_type = serializers.ChoiceField(choices=Role.ROLE_CHOICES, required=True, write_only=True)
    
    # Profile fields based on role
    license_number = serializers.CharField(required=False, allow_blank=True, write_only=True)
    specialization = serializers.CharField(required=False, allow_blank=True, write_only=True)
    education = serializers.CharField(required=False, allow_blank=True, write_only=True)
    
    class Meta:
        model = User
        fields = [
            'email', 'password', 'password_confirm', 'first_name', 'last_name',
            'phone_number', 'date_of_birth', 'role_type',
            'license_number', 'specialization', 'education'
        ]
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        
        # Validate role-specific required fields
        role_type = attrs.get('role_type')
        
        if role_type in ['doctor', 'nurse', 'pharmacist', 'lab_technician']:
            if not attrs.get('license_number'):
                raise serializers.ValidationError(
                    {"license_number": f"License number is required for {role_type} role."}
                )
            if not attrs.get('education'):
                raise serializers.ValidationError(
                    {"education": f"Education details are required for {role_type} role."}
                )
        
        return attrs
    
    def create(self, validated_data):
        # Extract role and profile data
        role_type = validated_data.pop('role_type')
        validated_data.pop('password_confirm')
        
        license_number = validated_data.pop('license_number', '')
        specialization = validated_data.pop('specialization', '')
        education = validated_data.pop('education', '')
        
        # Create user
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            phone_number=validated_data.get('phone_number'),
            date_of_birth=validated_data.get('date_of_birth'),
        )
        
        # Set active role
        user.active_role = role_type
        user.save()
        
        # Create role
        role = Role.objects.create(
            user=user,
            role_type=role_type,
            is_verified=(role_type == 'patient')  # Auto-verify patients
        )
        
        # Create role-specific profile
        if role_type == 'patient':
            PatientProfile.objects.create(user=user)
        elif role_type == 'doctor':
            DoctorProfile.objects.create(
                user=user,
                license_number=license_number,
                specialization=specialization,
                education=education
            )
        elif role_type == 'nurse':
            NurseProfile.objects.create(
                user=user,
                license_number=license_number,
                specialization=specialization,
                education=education
            )
        elif role_type == 'pharmacist':
            PharmacistProfile.objects.create(
                user=user,
                license_number=license_number,
                education=education
            )
        elif role_type == 'lab_technician':
            LabTechnicianProfile.objects.create(
                user=user,
                license_number=license_number,
                specialization=specialization,
                education=education
            )
        elif role_type == 'hospital_admin':
            FacilityAdminProfile.objects.create(
                user=user,
                position='Hospital Administrator'
            )
        
        return user


class RoleSwitchSerializer(serializers.Serializer):
    """Serializer for switching active role"""
    
    role_type = serializers.ChoiceField(choices=Role.ROLE_CHOICES)
    
    def validate_role_type(self, value):
        user = self.context['request'].user
        if not user.roles.filter(role_type=value, is_active=True).exists():
            raise serializers.ValidationError(
                f"You do not have the '{value}' role or it is not active."
            )
        return value


class UserDetailSerializer(serializers.ModelSerializer):
    """Detailed user serializer with all profile information"""
    
    roles = RoleSerializer(many=True, read_only=True)
    patient_profile = PatientProfileSerializer(read_only=True)
    doctor_profile = DoctorProfileSerializer(read_only=True)
    nurse_profile = NurseProfileSerializer(read_only=True)
    pharmacist_profile = PharmacistProfileSerializer(read_only=True)
    lab_tech_profile = LabTechnicianProfileSerializer(read_only=True)
    facility_admin_profile = FacilityAdminProfileSerializer(read_only=True)
    full_name = serializers.ReadOnlyField()
    
    class Meta:
        model = User
        fields = [
            'id', 'email', 'first_name', 'last_name', 'full_name',
            'phone_number', 'date_of_birth', 'profile_picture',
            'active_role', 'is_verified', 'verified_at',
            'roles', 'patient_profile', 'doctor_profile', 'nurse_profile',
            'pharmacist_profile', 'lab_tech_profile', 'facility_admin_profile',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'is_verified', 'verified_at', 'created_at', 'updated_at']
