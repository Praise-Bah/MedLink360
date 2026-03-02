from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import (
    Hospital, Pharmacy, Laboratory, FacilityStaff,
    DoctorSchedule, Appointment
)

User = get_user_model()


class HospitalSerializer(serializers.ModelSerializer):
    """Serializer for Hospital model"""
    
    owner_email = serializers.EmailField(source='owner.email', read_only=True)
    owner_name = serializers.CharField(source='owner.full_name', read_only=True)
    verified_by_email = serializers.EmailField(source='verified_by.email', read_only=True, allow_null=True)
    current_staff_count = serializers.ReadOnlyField()
    can_add_staff = serializers.ReadOnlyField()
    
    class Meta:
        model = Hospital
        fields = '__all__'
        read_only_fields = ['verified_at', 'verified_by', 'created_at', 'updated_at']


class HospitalListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for listing hospitals"""
    
    owner_name = serializers.CharField(source='owner.full_name', read_only=True)
    
    class Meta:
        model = Hospital
        fields = [
            'id', 'name', 'registration_number', 'email', 'phone_number',
            'city', 'state', 'status', 'owner_name', 'emergency_services',
            'is_active', 'is_accepting_patients', 'logo', 'created_at'
        ]


class PharmacySerializer(serializers.ModelSerializer):
    """Serializer for Pharmacy model"""
    
    owner_email = serializers.EmailField(source='owner.email', read_only=True)
    owner_name = serializers.CharField(source='owner.full_name', read_only=True)
    verified_by_email = serializers.EmailField(source='verified_by.email', read_only=True, allow_null=True)
    current_pharmacist_count = serializers.ReadOnlyField()
    can_add_pharmacist = serializers.ReadOnlyField()
    
    class Meta:
        model = Pharmacy
        fields = '__all__'
        read_only_fields = ['verified_at', 'verified_by', 'created_at', 'updated_at']


class PharmacyListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for listing pharmacies"""
    
    owner_name = serializers.CharField(source='owner.full_name', read_only=True)
    
    class Meta:
        model = Pharmacy
        fields = [
            'id', 'name', 'registration_number', 'license_number', 'email',
            'phone_number', 'city', 'state', 'status', 'owner_name',
            'is_24_hours', 'is_active', 'is_accepting_prescriptions',
            'logo', 'created_at'
        ]


class LaboratorySerializer(serializers.ModelSerializer):
    """Serializer for Laboratory model"""
    
    owner_email = serializers.EmailField(source='owner.email', read_only=True)
    owner_name = serializers.CharField(source='owner.full_name', read_only=True)
    verified_by_email = serializers.EmailField(source='verified_by.email', read_only=True, allow_null=True)
    
    class Meta:
        model = Laboratory
        fields = '__all__'
        read_only_fields = ['verified_at', 'verified_by', 'created_at', 'updated_at']


class LaboratoryListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for listing laboratories"""
    
    owner_name = serializers.CharField(source='owner.full_name', read_only=True)
    
    class Meta:
        model = Laboratory
        fields = [
            'id', 'name', 'registration_number', 'license_number', 'email',
            'phone_number', 'city', 'state', 'status', 'owner_name',
            'has_mobile_collection', 'turnaround_time_hours', 'is_active',
            'is_accepting_tests', 'logo', 'created_at'
        ]


class FacilityStaffSerializer(serializers.ModelSerializer):
    """Serializer for FacilityStaff model"""
    
    user_email = serializers.EmailField(source='user.email', read_only=True)
    user_name = serializers.CharField(source='user.full_name', read_only=True)
    facility_name = serializers.SerializerMethodField()
    facility_type = serializers.SerializerMethodField()
    
    class Meta:
        model = FacilityStaff
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']
    
    def get_facility_name(self, obj):
        facility = obj.facility
        return facility.name if facility else None
    
    def get_facility_type(self, obj):
        if obj.hospital:
            return 'hospital'
        elif obj.pharmacy:
            return 'pharmacy'
        elif obj.laboratory:
            return 'laboratory'
        return None


class DoctorScheduleSerializer(serializers.ModelSerializer):
    """Serializer for DoctorSchedule model"""
    
    doctor_name = serializers.CharField(source='doctor.full_name', read_only=True)
    hospital_name = serializers.CharField(source='hospital.name', read_only=True)
    
    class Meta:
        model = DoctorSchedule
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']


class AppointmentSerializer(serializers.ModelSerializer):
    """Serializer for Appointment model"""
    
    patient_name = serializers.CharField(source='patient.full_name', read_only=True)
    patient_email = serializers.EmailField(source='patient.email', read_only=True)
    doctor_name = serializers.CharField(source='doctor.full_name', read_only=True)
    doctor_email = serializers.EmailField(source='doctor.email', read_only=True)
    hospital_name = serializers.CharField(source='hospital.name', read_only=True)
    
    class Meta:
        model = Appointment
        fields = '__all__'
        read_only_fields = [
            'confirmation_code', 'reminder_sent', 'reminder_sent_at',
            'created_at', 'updated_at'
        ]


class AppointmentCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating appointments"""
    
    class Meta:
        model = Appointment
        fields = [
            'doctor', 'hospital', 'appointment_type', 'appointment_date',
            'appointment_time', 'duration_minutes', 'reason', 'symptoms',
            'notes', 'is_follow_up', 'previous_appointment'
        ]
    
    def validate(self, attrs):
        # Check if doctor is available at the specified time
        doctor = attrs.get('doctor')
        hospital = attrs.get('hospital')
        appointment_date = attrs.get('appointment_date')
        appointment_time = attrs.get('appointment_time')
        
        # Check if doctor works at this hospital
        if not FacilityStaff.objects.filter(
            user=doctor,
            hospital=hospital,
            role='doctor',
            is_active=True
        ).exists():
            raise serializers.ValidationError({
                'doctor': 'This doctor does not work at the selected hospital.'
            })
        
        # Check for conflicting appointments
        existing = Appointment.objects.filter(
            doctor=doctor,
            appointment_date=appointment_date,
            appointment_time=appointment_time,
            status__in=['scheduled', 'confirmed', 'in_progress']
        ).exists()
        
        if existing:
            raise serializers.ValidationError({
                'appointment_time': 'This time slot is already booked.'
            })
        
        return attrs
    
    def create(self, validated_data):
        # Set patient from request context
        validated_data['patient'] = self.context['request'].user
        return super().create(validated_data)


class AppointmentListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for listing appointments"""
    
    patient_name = serializers.CharField(source='patient.full_name', read_only=True)
    doctor_name = serializers.CharField(source='doctor.full_name', read_only=True)
    hospital_name = serializers.CharField(source='hospital.name', read_only=True)
    
    class Meta:
        model = Appointment
        fields = [
            'id', 'patient_name', 'doctor_name', 'hospital_name',
            'appointment_type', 'appointment_date', 'appointment_time',
            'duration_minutes', 'status', 'confirmation_code', 'created_at'
        ]


class AppointmentCancelSerializer(serializers.Serializer):
    """Serializer for cancelling appointments"""
    
    cancellation_reason = serializers.CharField(required=True)
    
    def validate_cancellation_reason(self, value):
        if len(value.strip()) < 10:
            raise serializers.ValidationError(
                'Cancellation reason must be at least 10 characters.'
            )
        return value
