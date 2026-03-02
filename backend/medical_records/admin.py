from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from .models import (
    MedicalBook, MedicalBookAccess, Visit, VitalSigns,
    ClinicalNote, Diagnosis, Prescription, LabOrder,
    LabResult, Admission, Document
)


@admin.register(MedicalBook)
class MedicalBookAdmin(admin.ModelAdmin):
    """Admin for MedicalBook"""
    
    list_display = ['patient', 'blood_type', 'created_at', 'updated_at']
    list_filter = ['blood_type', 'created_at']
    search_fields = ['patient__email', 'patient__first_name', 'patient__last_name']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        (_('Patient'), {
            'fields': ('patient',)
        }),
        (_('Emergency Information'), {
            'fields': ('blood_type', 'allergies', 'chronic_conditions', 'current_medications')
        }),
        (_('Medical History'), {
            'fields': ('past_surgeries', 'family_medical_history')
        }),
        (_('Timestamps'), {
            'fields': ('created_at', 'updated_at')
        }),
    )


@admin.register(MedicalBookAccess)
class MedicalBookAccessAdmin(admin.ModelAdmin):
    """Admin for MedicalBookAccess"""
    
    list_display = ['medical_book', 'user', 'access_level', 'is_active', 'granted_at']
    list_filter = ['access_level', 'is_active', 'granted_at']
    search_fields = ['user__email', 'medical_book__patient__email']
    readonly_fields = ['granted_at']
    
    fieldsets = (
        (_('Access'), {
            'fields': ('medical_book', 'user', 'access_level')
        }),
        (_('Grant Information'), {
            'fields': ('granted_by', 'granted_at', 'expires_at', 'reason')
        }),
        (_('Status'), {
            'fields': ('is_active',)
        }),
    )


@admin.register(Visit)
class VisitAdmin(admin.ModelAdmin):
    """Admin for Visit"""
    
    list_display = [
        'patient', 'doctor', 'facility', 'visit_date', 'visit_time',
        'visit_type', 'status'
    ]
    list_filter = ['status', 'visit_type', 'visit_date', 'facility']
    search_fields = [
        'patient__email', 'patient__first_name', 'patient__last_name',
        'doctor__email', 'doctor__first_name', 'doctor__last_name',
        'facility__name'
    ]
    readonly_fields = ['checked_in_at', 'started_at', 'completed_at', 'created_at', 'updated_at']
    date_hierarchy = 'visit_date'
    
    fieldsets = (
        (_('Visit Information'), {
            'fields': ('medical_book', 'appointment', 'visit_date', 'visit_time', 'visit_type', 'status')
        }),
        (_('Parties'), {
            'fields': ('patient', 'doctor', 'facility')
        }),
        (_('Details'), {
            'fields': ('chief_complaint', 'visit_summary')
        }),
        (_('Follow-up'), {
            'fields': ('follow_up_required', 'follow_up_date', 'follow_up_notes')
        }),
        (_('Timestamps'), {
            'fields': ('checked_in_at', 'started_at', 'completed_at', 'created_at', 'updated_at')
        }),
    )


@admin.register(VitalSigns)
class VitalSignsAdmin(admin.ModelAdmin):
    """Admin for VitalSigns"""
    
    list_display = [
        'visit', 'temperature', 'pulse_rate', 'systolic_bp', 'diastolic_bp',
        'oxygen_saturation', 'bmi', 'recorded_at'
    ]
    list_filter = ['recorded_at']
    search_fields = ['visit__patient__email']
    readonly_fields = ['bmi', 'recorded_at']
    
    fieldsets = (
        (_('Visit'), {
            'fields': ('visit',)
        }),
        (_('Basic Vitals'), {
            'fields': ('temperature', 'pulse_rate', 'respiratory_rate')
        }),
        (_('Blood Pressure'), {
            'fields': ('systolic_bp', 'diastolic_bp')
        }),
        (_('Oxygen & Measurements'), {
            'fields': ('oxygen_saturation', 'height', 'weight', 'bmi', 'blood_glucose')
        }),
        (_('Metadata'), {
            'fields': ('notes', 'recorded_by', 'recorded_at')
        }),
    )


@admin.register(ClinicalNote)
class ClinicalNoteAdmin(admin.ModelAdmin):
    """Admin for ClinicalNote"""
    
    list_display = ['visit', 'doctor', 'note_type', 'is_signed', 'created_at']
    list_filter = ['note_type', 'is_signed', 'created_at']
    search_fields = ['visit__patient__email', 'doctor__email', 'assessment']
    readonly_fields = ['created_at', 'updated_at', 'signed_at']
    
    fieldsets = (
        (_('Visit & Doctor'), {
            'fields': ('visit', 'doctor', 'note_type')
        }),
        (_('SOAP Note'), {
            'fields': ('subjective', 'objective', 'assessment', 'plan')
        }),
        (_('Additional'), {
            'fields': ('history_of_present_illness', 'review_of_systems', 'physical_examination')
        }),
        (_('Status'), {
            'fields': ('is_signed', 'signed_at')
        }),
        (_('Timestamps'), {
            'fields': ('created_at', 'updated_at')
        }),
    )


@admin.register(Diagnosis)
class DiagnosisAdmin(admin.ModelAdmin):
    """Admin for Diagnosis"""
    
    list_display = [
        'visit', 'diagnosis_name', 'diagnosis_code', 'diagnosis_type',
        'severity', 'status', 'diagnosed_at'
    ]
    list_filter = ['diagnosis_type', 'severity', 'status', 'diagnosed_at']
    search_fields = ['diagnosis_name', 'diagnosis_code', 'visit__patient__email']
    readonly_fields = ['diagnosed_at']
    
    fieldsets = (
        (_('Visit'), {
            'fields': ('visit',)
        }),
        (_('Diagnosis Information'), {
            'fields': ('diagnosis_code', 'diagnosis_name', 'diagnosis_type')
        }),
        (_('Details'), {
            'fields': ('description', 'severity', 'status')
        }),
        (_('Metadata'), {
            'fields': ('diagnosed_by', 'diagnosed_at')
        }),
    )


@admin.register(Prescription)
class PrescriptionAdmin(admin.ModelAdmin):
    """Admin for Prescription"""
    
    list_display = [
        'visit', 'medication_name', 'dosage', 'frequency',
        'duration_days', 'status', 'prescribed_at'
    ]
    list_filter = ['status', 'form', 'route', 'prescribed_at']
    search_fields = ['medication_name', 'generic_name', 'visit__patient__email']
    readonly_fields = ['prescribed_at', 'dispensed_at']
    
    fieldsets = (
        (_('Visit'), {
            'fields': ('visit',)
        }),
        (_('Medication'), {
            'fields': ('medication_name', 'generic_name', 'dosage', 'form')
        }),
        (_('Dosing'), {
            'fields': ('frequency', 'route', 'duration_days', 'quantity', 'refills')
        }),
        (_('Instructions'), {
            'fields': ('instructions', 'indication')
        }),
        (_('Status'), {
            'fields': ('status',)
        }),
        (_('Prescribed'), {
            'fields': ('prescribed_by', 'prescribed_at')
        }),
        (_('Dispensing'), {
            'fields': ('dispensed_by', 'dispensed_at', 'pharmacy')
        }),
    )


@admin.register(LabOrder)
class LabOrderAdmin(admin.ModelAdmin):
    """Admin for LabOrder"""
    
    list_display = [
        'visit', 'test_name', 'test_category', 'priority',
        'status', 'laboratory', 'ordered_at'
    ]
    list_filter = ['status', 'priority', 'test_category', 'ordered_at']
    search_fields = ['test_name', 'test_code', 'visit__patient__email', 'laboratory__name']
    readonly_fields = ['ordered_at', 'sample_collected_at', 'completed_at']
    
    fieldsets = (
        (_('Visit'), {
            'fields': ('visit',)
        }),
        (_('Test Information'), {
            'fields': ('test_name', 'test_code', 'test_category')
        }),
        (_('Order Details'), {
            'fields': ('priority', 'clinical_indication', 'special_instructions')
        }),
        (_('Status'), {
            'fields': ('status',)
        }),
        (_('Parties'), {
            'fields': ('ordered_by', 'laboratory')
        }),
        (_('Timestamps'), {
            'fields': ('ordered_at', 'sample_collected_at', 'completed_at')
        }),
    )


@admin.register(LabResult)
class LabResultAdmin(admin.ModelAdmin):
    """Admin for LabResult"""
    
    list_display = [
        'lab_order', 'abnormal_flag', 'is_abnormal',
        'is_released', 'performed_at'
    ]
    list_filter = ['abnormal_flag', 'is_abnormal', 'is_released', 'performed_at']
    search_fields = ['lab_order__test_name', 'result_value']
    readonly_fields = ['performed_at', 'reviewed_at', 'released_at']
    
    fieldsets = (
        (_('Lab Order'), {
            'fields': ('lab_order',)
        }),
        (_('Results'), {
            'fields': ('result_value', 'result_unit', 'reference_range')
        }),
        (_('Interpretation'), {
            'fields': ('is_abnormal', 'abnormal_flag', 'interpretation')
        }),
        (_('Narrative'), {
            'fields': ('narrative_report', 'attachments')
        }),
        (_('Metadata'), {
            'fields': ('performed_by', 'performed_at', 'reviewed_by', 'reviewed_at')
        }),
        (_('Release'), {
            'fields': ('is_released', 'released_at')
        }),
    )


@admin.register(Admission)
class AdmissionAdmin(admin.ModelAdmin):
    """Admin for Admission"""
    
    list_display = [
        'visit', 'admission_date', 'ward_name', 'bed_number',
        'admission_type', 'status', 'admitting_doctor'
    ]
    list_filter = ['status', 'admission_type', 'admission_source', 'admission_date']
    search_fields = ['visit__patient__email', 'ward_name', 'room_number', 'bed_number']
    readonly_fields = ['created_at', 'updated_at']
    date_hierarchy = 'admission_date'
    
    fieldsets = (
        (_('Visit & Medical Book'), {
            'fields': ('visit', 'medical_book')
        }),
        (_('Admission Details'), {
            'fields': ('admission_date', 'admission_type', 'admission_source')
        }),
        (_('Ward Assignment'), {
            'fields': ('ward_name', 'room_number', 'bed_number')
        }),
        (_('Medical Team'), {
            'fields': ('admitting_doctor', 'attending_doctor')
        }),
        (_('Diagnosis'), {
            'fields': ('chief_complaint', 'admitting_diagnosis')
        }),
        (_('Discharge'), {
            'fields': ('discharge_date', 'discharge_type', 'discharge_disposition', 'discharge_summary', 'discharge_instructions')
        }),
        (_('Status'), {
            'fields': ('status',)
        }),
        (_('Timestamps'), {
            'fields': ('created_at', 'updated_at')
        }),
    )


@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    """Admin for Document"""
    
    list_display = [
        'title', 'document_type', 'medical_book', 'visit',
        'is_patient_visible', 'uploaded_at'
    ]
    list_filter = ['document_type', 'is_patient_visible', 'is_confidential', 'uploaded_at']
    search_fields = ['title', 'description', 'medical_book__patient__email']
    readonly_fields = ['uploaded_at']
    
    fieldsets = (
        (_('Document Information'), {
            'fields': ('title', 'description', 'document_type')
        }),
        (_('Associated Records'), {
            'fields': ('medical_book', 'visit')
        }),
        (_('File Information'), {
            'fields': ('file_url', 'file_name', 'file_size', 'mime_type')
        }),
        (_('Access Control'), {
            'fields': ('is_patient_visible', 'is_confidential')
        }),
        (_('Metadata'), {
            'fields': ('uploaded_by', 'uploaded_at')
        }),
    )
