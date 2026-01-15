from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import (
    MedicalBook, MedicalBookAccess, Visit, VitalSigns,
    ClinicalNote, Diagnosis, Prescription, LabOrder,
    LabResult, Admission, Document
)

User = get_user_model()


class MedicalBookSerializer(serializers.ModelSerializer):
    """Serializer for MedicalBook"""
    
    patient_name = serializers.CharField(source='patient.full_name', read_only=True)
    patient_email = serializers.EmailField(source='patient.email', read_only=True)
    
    class Meta:
        model = MedicalBook
        fields = '__all__'
        read_only_fields = ['patient', 'created_at', 'updated_at']


class MedicalBookAccessSerializer(serializers.ModelSerializer):
    """Serializer for MedicalBookAccess"""
    
    user_name = serializers.CharField(source='user.full_name', read_only=True)
    user_email = serializers.EmailField(source='user.email', read_only=True)
    granted_by_name = serializers.CharField(source='granted_by.full_name', read_only=True)
    
    class Meta:
        model = MedicalBookAccess
        fields = '__all__'
        read_only_fields = ['granted_at']


class VitalSignsSerializer(serializers.ModelSerializer):
    """Serializer for VitalSigns"""
    
    recorded_by_name = serializers.CharField(source='recorded_by.full_name', read_only=True)
    
    class Meta:
        model = VitalSigns
        fields = '__all__'
        read_only_fields = ['bmi', 'recorded_at']


class DiagnosisSerializer(serializers.ModelSerializer):
    """Serializer for Diagnosis"""
    
    diagnosed_by_name = serializers.CharField(source='diagnosed_by.full_name', read_only=True)
    
    class Meta:
        model = Diagnosis
        fields = '__all__'
        read_only_fields = ['diagnosed_at']


class PrescriptionSerializer(serializers.ModelSerializer):
    """Serializer for Prescription"""
    
    prescribed_by_name = serializers.CharField(source='prescribed_by.full_name', read_only=True)
    dispensed_by_name = serializers.CharField(source='dispensed_by.full_name', read_only=True, allow_null=True)
    pharmacy_name = serializers.CharField(source='pharmacy.name', read_only=True, allow_null=True)
    
    class Meta:
        model = Prescription
        fields = '__all__'
        read_only_fields = ['prescribed_at', 'dispensed_at']


class LabOrderSerializer(serializers.ModelSerializer):
    """Serializer for LabOrder"""
    
    ordered_by_name = serializers.CharField(source='ordered_by.full_name', read_only=True)
    laboratory_name = serializers.CharField(source='laboratory.name', read_only=True)
    
    class Meta:
        model = LabOrder
        fields = '__all__'
        read_only_fields = ['ordered_at', 'sample_collected_at', 'completed_at']


class LabResultSerializer(serializers.ModelSerializer):
    """Serializer for LabResult"""
    
    test_name = serializers.CharField(source='lab_order.test_name', read_only=True)
    performed_by_name = serializers.CharField(source='performed_by.full_name', read_only=True, allow_null=True)
    reviewed_by_name = serializers.CharField(source='reviewed_by.full_name', read_only=True, allow_null=True)
    
    class Meta:
        model = LabResult
        fields = '__all__'
        read_only_fields = ['performed_at', 'reviewed_at', 'released_at']


class ClinicalNoteSerializer(serializers.ModelSerializer):
    """Serializer for ClinicalNote"""
    
    doctor_name = serializers.CharField(source='doctor.full_name', read_only=True)
    
    class Meta:
        model = ClinicalNote
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at', 'signed_at']


class AdmissionSerializer(serializers.ModelSerializer):
    """Serializer for Admission"""
    
    admitting_doctor_name = serializers.CharField(source='admitting_doctor.full_name', read_only=True)
    attending_doctor_name = serializers.CharField(source='attending_doctor.full_name', read_only=True)
    patient_name = serializers.CharField(source='visit.patient.full_name', read_only=True)
    
    class Meta:
        model = Admission
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']


class DocumentSerializer(serializers.ModelSerializer):
    """Serializer for Document"""
    
    uploaded_by_name = serializers.CharField(source='uploaded_by.full_name', read_only=True, allow_null=True)
    
    class Meta:
        model = Document
        fields = '__all__'
        read_only_fields = ['uploaded_at']


class VisitSerializer(serializers.ModelSerializer):
    """Serializer for Visit"""
    
    patient_name = serializers.CharField(source='patient.full_name', read_only=True)
    doctor_name = serializers.CharField(source='doctor.full_name', read_only=True)
    facility_name = serializers.CharField(source='facility.name', read_only=True)
    
    class Meta:
        model = Visit
        fields = '__all__'
        read_only_fields = [
            'checked_in_at', 'started_at', 'completed_at',
            'created_at', 'updated_at'
        ]


class VisitDetailSerializer(serializers.ModelSerializer):
    """Detailed visit serializer with related data"""
    
    patient_name = serializers.CharField(source='patient.full_name', read_only=True)
    doctor_name = serializers.CharField(source='doctor.full_name', read_only=True)
    facility_name = serializers.CharField(source='facility.name', read_only=True)
    
    # Related data
    vital_signs = VitalSignsSerializer(many=True, read_only=True)
    clinical_notes = ClinicalNoteSerializer(many=True, read_only=True)
    diagnoses = DiagnosisSerializer(many=True, read_only=True)
    prescriptions = PrescriptionSerializer(many=True, read_only=True)
    lab_orders = LabOrderSerializer(many=True, read_only=True)
    documents = DocumentSerializer(many=True, read_only=True)
    
    class Meta:
        model = Visit
        fields = '__all__'
        read_only_fields = [
            'checked_in_at', 'started_at', 'completed_at',
            'created_at', 'updated_at'
        ]


class VisitCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating visits"""
    
    class Meta:
        model = Visit
        fields = [
            'visit_date', 'visit_time', 'visit_type', 'doctor',
            'facility', 'chief_complaint', 'appointment'
        ]
    
    def create(self, validated_data):
        # Set patient from request
        validated_data['patient'] = self.context['request'].user
        
        # Set medical_book
        medical_book, _ = MedicalBook.objects.get_or_create(
            patient=validated_data['patient']
        )
        validated_data['medical_book'] = medical_book
        
        return super().create(validated_data)


class MedicalBookDetailSerializer(serializers.ModelSerializer):
    """Detailed medical book with recent visits"""
    
    patient_name = serializers.CharField(source='patient.full_name', read_only=True)
    patient_email = serializers.EmailField(source='patient.email', read_only=True)
    recent_visits = serializers.SerializerMethodField()
    active_prescriptions = serializers.SerializerMethodField()
    
    class Meta:
        model = MedicalBook
        fields = '__all__'
        read_only_fields = ['patient', 'created_at', 'updated_at']
    
    def get_recent_visits(self, obj):
        visits = obj.visits.all()[:5]
        return VisitSerializer(visits, many=True).data
    
    def get_active_prescriptions(self, obj):
        prescriptions = Prescription.objects.filter(
            visit__medical_book=obj,
            status='active'
        )[:10]
        return PrescriptionSerializer(prescriptions, many=True).data
