from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from .models import (
    Hospital, Pharmacy, Laboratory, FacilityStaff,
    DoctorSchedule, Appointment
)


@admin.register(Hospital)
class HospitalAdmin(admin.ModelAdmin):
    """Admin for Hospital model"""
    
    list_display = [
        'name', 'city', 'state', 'status', 'owner', 'bed_count',
        'emergency_services', 'is_active', 'created_at'
    ]
    list_filter = ['status', 'state', 'city', 'emergency_services', 'is_active']
    search_fields = ['name', 'registration_number', 'city', 'email', 'owner__email']
    readonly_fields = ['created_at', 'updated_at', 'current_staff_count', 'can_add_staff']
    
    fieldsets = (
        (_('Basic Information'), {
            'fields': ('name', 'registration_number', 'email', 'phone_number', 'website')
        }),
        (_('Address'), {
            'fields': ('address', 'city', 'state', 'postal_code', 'country', 'latitude', 'longitude')
        }),
        (_('Ownership'), {
            'fields': ('owner',)
        }),
        (_('Verification'), {
            'fields': ('status', 'verified_at', 'verified_by', 'verification_documents', 'verification_notes')
        }),
        (_('Details'), {
            'fields': ('description', 'services_offered', 'specialties', 'bed_count', 'emergency_services', 'ambulance_services')
        }),
        (_('Operations'), {
            'fields': ('operating_hours', 'max_staff_accounts', 'is_active', 'is_accepting_patients')
        }),
        (_('Media'), {
            'fields': ('logo', 'cover_image', 'images')
        }),
        (_('Stats'), {
            'fields': ('current_staff_count', 'can_add_staff', 'created_at', 'updated_at')
        }),
    )


@admin.register(Pharmacy)
class PharmacyAdmin(admin.ModelAdmin):
    """Admin for Pharmacy model"""
    
    list_display = [
        'name', 'city', 'state', 'status', 'owner', 'is_24_hours',
        'is_active', 'created_at'
    ]
    list_filter = ['status', 'state', 'city', 'is_24_hours', 'is_active']
    search_fields = ['name', 'registration_number', 'license_number', 'city', 'email', 'owner__email']
    readonly_fields = ['created_at', 'updated_at', 'current_pharmacist_count', 'can_add_pharmacist']
    
    fieldsets = (
        (_('Basic Information'), {
            'fields': ('name', 'registration_number', 'license_number', 'email', 'phone_number')
        }),
        (_('Address'), {
            'fields': ('address', 'city', 'state', 'postal_code', 'country', 'latitude', 'longitude')
        }),
        (_('Ownership'), {
            'fields': ('owner',)
        }),
        (_('Verification'), {
            'fields': ('status', 'verified_at', 'verified_by', 'verification_documents', 'verification_notes')
        }),
        (_('Details'), {
            'fields': ('description', 'services_offered', 'has_inventory_management', 'accepts_insurance')
        }),
        (_('Operations'), {
            'fields': ('operating_hours', 'is_24_hours', 'max_pharmacist_accounts', 'is_active', 'is_accepting_prescriptions')
        }),
        (_('Media'), {
            'fields': ('logo', 'images')
        }),
        (_('Stats'), {
            'fields': ('current_pharmacist_count', 'can_add_pharmacist', 'created_at', 'updated_at')
        }),
    )


@admin.register(Laboratory)
class LaboratoryAdmin(admin.ModelAdmin):
    """Admin for Laboratory model"""
    
    list_display = [
        'name', 'city', 'state', 'status', 'owner', 'turnaround_time_hours',
        'has_mobile_collection', 'is_active', 'created_at'
    ]
    list_filter = ['status', 'state', 'city', 'has_mobile_collection', 'is_active']
    search_fields = ['name', 'registration_number', 'license_number', 'city', 'email', 'owner__email']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        (_('Basic Information'), {
            'fields': ('name', 'registration_number', 'license_number', 'email', 'phone_number')
        }),
        (_('Address'), {
            'fields': ('address', 'city', 'state', 'postal_code', 'country', 'latitude', 'longitude')
        }),
        (_('Ownership'), {
            'fields': ('owner',)
        }),
        (_('Verification'), {
            'fields': ('status', 'verified_at', 'verified_by', 'verification_documents', 'verification_notes')
        }),
        (_('Details'), {
            'fields': ('description', 'tests_offered', 'certifications', 'turnaround_time_hours', 'has_mobile_collection')
        }),
        (_('Operations'), {
            'fields': ('operating_hours', 'is_active', 'is_accepting_tests')
        }),
        (_('Media'), {
            'fields': ('logo', 'images')
        }),
        (_('Timestamps'), {
            'fields': ('created_at', 'updated_at')
        }),
    )


@admin.register(FacilityStaff)
class FacilityStaffAdmin(admin.ModelAdmin):
    """Admin for FacilityStaff model"""
    
    list_display = [
        'user', 'role', 'get_facility_name', 'position_title',
        'is_active', 'start_date'
    ]
    list_filter = ['role', 'is_active']
    search_fields = ['user__email', 'user__first_name', 'user__last_name', 'position_title', 'employee_id']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        (_('User & Role'), {
            'fields': ('user', 'role')
        }),
        (_('Facility'), {
            'fields': ('hospital', 'pharmacy', 'laboratory')
        }),
        (_('Employment'), {
            'fields': ('position_title', 'department', 'employee_id', 'start_date', 'end_date', 'is_active')
        }),
        (_('Permissions'), {
            'fields': ('can_manage_appointments', 'can_manage_inventory', 'can_view_records')
        }),
        (_('Timestamps'), {
            'fields': ('created_at', 'updated_at')
        }),
    )
    
    def get_facility_name(self, obj):
        return obj.facility.name if obj.facility else 'N/A'
    get_facility_name.short_description = 'Facility'


@admin.register(DoctorSchedule)
class DoctorScheduleAdmin(admin.ModelAdmin):
    """Admin for DoctorSchedule model"""
    
    list_display = [
        'doctor', 'hospital', 'day_of_week', 'start_time', 'end_time',
        'slot_duration_minutes', 'is_active'
    ]
    list_filter = ['day_of_week', 'is_active', 'hospital']
    search_fields = ['doctor__email', 'doctor__first_name', 'doctor__last_name', 'hospital__name']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        (_('Doctor & Facility'), {
            'fields': ('doctor', 'hospital')
        }),
        (_('Schedule'), {
            'fields': ('day_of_week', 'start_time', 'end_time', 'slot_duration_minutes', 'max_patients_per_slot')
        }),
        (_('Date Range'), {
            'fields': ('effective_from', 'effective_until')
        }),
        (_('Status'), {
            'fields': ('is_active',)
        }),
        (_('Timestamps'), {
            'fields': ('created_at', 'updated_at')
        }),
    )


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    """Admin for Appointment model"""
    
    list_display = [
        'patient', 'doctor', 'hospital', 'appointment_date', 'appointment_time',
        'appointment_type', 'status', 'confirmation_code'
    ]
    list_filter = ['status', 'appointment_type', 'appointment_date', 'hospital']
    search_fields = [
        'patient__email', 'patient__first_name', 'patient__last_name',
        'doctor__email', 'doctor__first_name', 'doctor__last_name',
        'hospital__name', 'confirmation_code'
    ]
    readonly_fields = ['confirmation_code', 'reminder_sent_at', 'created_at', 'updated_at']
    date_hierarchy = 'appointment_date'
    
    fieldsets = (
        (_('Parties'), {
            'fields': ('patient', 'doctor', 'hospital')
        }),
        (_('Appointment Details'), {
            'fields': ('appointment_type', 'appointment_date', 'appointment_time', 'duration_minutes', 'confirmation_code')
        }),
        (_('Medical Info'), {
            'fields': ('reason', 'symptoms', 'notes')
        }),
        (_('Status'), {
            'fields': ('status', 'is_follow_up', 'previous_appointment')
        }),
        (_('Cancellation'), {
            'fields': ('cancelled_at', 'cancelled_by', 'cancellation_reason')
        }),
        (_('Reminders'), {
            'fields': ('reminder_sent', 'reminder_sent_at')
        }),
        (_('Timestamps'), {
            'fields': ('created_at', 'updated_at')
        }),
    )
