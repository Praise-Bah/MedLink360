from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from .models import (
    Role, PatientProfile, DoctorProfile, NurseProfile,
    PharmacistProfile, LabTechnicianProfile, FacilityAdminProfile, AdminInvitation
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


# ============================================================================
# Admin Invitation Serializers
# ============================================================================

class AdminInvitationSerializer(serializers.ModelSerializer):
    """Serializer for AdminInvitation model"""
    
    role_display = serializers.CharField(source='get_role_display', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    hospital_name = serializers.CharField(source='hospital.name', read_only=True, allow_null=True)
    invited_by_email = serializers.EmailField(source='invited_by.email', read_only=True, allow_null=True)
    invited_by_name = serializers.CharField(source='invited_by.full_name', read_only=True, allow_null=True)
    is_valid = serializers.BooleanField(read_only=True)
    is_expired = serializers.BooleanField(read_only=True)
    
    class Meta:
        model = AdminInvitation
        fields = [
            'id', 'email', 'role', 'role_display', 'token',
            'hospital', 'hospital_name',
            'full_name', 'phone_number', 'message',
            'invited_by', 'invited_by_email', 'invited_by_name',
            'status', 'status_display',
            'created_at', 'expires_at', 'accepted_at',
            'revoked_at', 'revoked_by',
            'is_valid', 'is_expired',
            'metadata'
        ]
        read_only_fields = [
            'id', 'token', 'invited_by', 'status',
            'created_at', 'accepted_at', 'revoked_at', 'revoked_by'
        ]


class AdminInvitationCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating admin invitations (used by MoH admins)"""
    
    class Meta:
        model = AdminInvitation
        fields = [
            'email', 'role', 'hospital',
            'full_name', 'phone_number', 'message',
            'expires_at', 'metadata'
        ]
    
    def validate(self, attrs):
        role = attrs.get('role')
        hospital = attrs.get('hospital')
        
        # Hospital admin requires a hospital
        if role == 'hospital_admin' and not hospital:
            raise serializers.ValidationError({
                "hospital": "Hospital is required for hospital_admin role."
            })
        
        # Ministry admin should not have a hospital
        if role == 'ministry_admin' and hospital:
            raise serializers.ValidationError({
                "hospital": "Ministry admin should not be associated with a specific hospital."
            })
        
        # Check if email already has a pending invitation
        email = attrs.get('email')
        existing = AdminInvitation.objects.filter(
            email=email,
            status='pending'
        ).exists()
        if existing:
            raise serializers.ValidationError({
                "email": "A pending invitation already exists for this email."
            })
        
        return attrs
    
    def create(self, validated_data):
        # Set invited_by from request user
        validated_data['invited_by'] = self.context['request'].user
        return super().create(validated_data)


class AdminInvitationVerifySerializer(serializers.Serializer):
    """Serializer for verifying an invitation token"""
    
    token = serializers.CharField(required=True)
    
    def validate_token(self, value):
        try:
            invitation = AdminInvitation.objects.get(token=value)
        except AdminInvitation.DoesNotExist:
            raise serializers.ValidationError("Invalid invitation token.")
        
        if invitation.status != 'pending':
            raise serializers.ValidationError(
                f"This invitation has already been {invitation.status}."
            )
        
        if invitation.is_expired:
            raise serializers.ValidationError("This invitation has expired.")
        
        return value


class AdminInvitationAcceptSerializer(serializers.Serializer):
    """Serializer for accepting an invitation and creating account"""
    
    token = serializers.CharField(required=True)
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password_confirm = serializers.CharField(write_only=True, required=True)
    first_name = serializers.CharField(required=True, max_length=150)
    last_name = serializers.CharField(required=True, max_length=150)
    phone_number = serializers.CharField(required=False, allow_blank=True, max_length=20)
    
    def validate(self, attrs):
        # Validate passwords match
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError({"password": "Passwords don't match."})
        
        # Validate token
        token = attrs.get('token')
        try:
            invitation = AdminInvitation.objects.select_related('hospital').get(token=token)
        except AdminInvitation.DoesNotExist:
            raise serializers.ValidationError({"token": "Invalid invitation token."})
        
        if not invitation.is_valid:
            if invitation.is_expired:
                raise serializers.ValidationError({"token": "This invitation has expired."})
            raise serializers.ValidationError({"token": f"This invitation has been {invitation.status}."})
        
        # Check if email already registered
        if User.objects.filter(email=invitation.email).exists():
            raise serializers.ValidationError({
                "email": "An account with this email already exists."
            })
        
        attrs['invitation'] = invitation
        return attrs
    
    def create(self, validated_data):
        invitation = validated_data.pop('invitation')
        validated_data.pop('password_confirm')
        validated_data.pop('token')
        
        # Create user
        user = User.objects.create_user(
            email=invitation.email,
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            phone_number=validated_data.get('phone_number', invitation.phone_number),
            is_verified=True,  # Admin accounts are pre-verified
        )
        
        # Set active role
        user.active_role = invitation.role
        user.save()
        
        # Create role
        Role.objects.create(
            user=user,
            role_type=invitation.role,
            is_verified=True
        )
        
        # Create facility admin profile if hospital_admin
        if invitation.role == 'hospital_admin':
            FacilityAdminProfile.objects.create(
                user=user,
                position='Hospital Administrator'
            )
            
            # Link user to hospital as admin via FacilityStaff
            from facilities.models import FacilityStaff
            from django.utils import timezone
            FacilityStaff.objects.create(
                user=user,
                hospital=invitation.hospital,
                role='admin',
                position_title='Hospital Administrator',
                start_date=timezone.now().date(),
                is_active=True,
                can_manage_appointments=True,
                can_view_records=True
            )
        
        # Mark invitation as accepted
        invitation.accept(user)
        
        return user


class AdminInvitationRevokeSerializer(serializers.Serializer):
    """Serializer for revoking an invitation"""
    
    invitation_id = serializers.IntegerField(required=True)
    
    def validate_invitation_id(self, value):
        try:
            invitation = AdminInvitation.objects.get(id=value)
        except AdminInvitation.DoesNotExist:
            raise serializers.ValidationError("Invitation not found.")
        
        if invitation.status != 'pending':
            raise serializers.ValidationError(
                f"Cannot revoke an invitation that has been {invitation.status}."
            )
        
        return value
