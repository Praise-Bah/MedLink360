from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _
from .models import (
    User, Role, PatientProfile, DoctorProfile, NurseProfile,
    PharmacistProfile, LabTechnicianProfile, FacilityAdminProfile
)


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    """Custom User admin"""
    
    list_display = ['email', 'first_name', 'last_name', 'active_role', 'is_verified', 'is_active', 'date_joined']
    list_filter = ['is_active', 'is_staff', 'is_verified', 'active_role']
    search_fields = ['email', 'first_name', 'last_name']
    ordering = ['-date_joined']
    
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal Info'), {'fields': ('first_name', 'last_name', 'phone_number', 'date_of_birth', 'profile_picture')}),
        (_('Role & Verification'), {'fields': ('active_role', 'is_verified', 'verified_at', 'verified_by')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'first_name', 'last_name'),
        }),
    )


@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    """Role admin"""
    
    list_display = ['user', 'role_type', 'is_verified', 'is_active', 'created_at']
    list_filter = ['role_type', 'is_verified', 'is_active']
    search_fields = ['user__email', 'user__first_name', 'user__last_name']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        (None, {'fields': ('user', 'role_type', 'is_active')}),
        (_('Verification'), {'fields': ('is_verified', 'verified_at', 'verified_by', 'verification_documents', 'verification_notes')}),
        (_('Timestamps'), {'fields': ('created_at', 'updated_at')}),
    )


@admin.register(PatientProfile)
class PatientProfileAdmin(admin.ModelAdmin):
    """Patient profile admin"""
    
    list_display = ['user', 'gender', 'blood_group', 'city', 'created_at']
    list_filter = ['gender', 'blood_group']
    search_fields = ['user__email', 'user__first_name', 'user__last_name', 'city']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        (_('User'), {'fields': ('user',)}),
        (_('Personal Info'), {'fields': ('gender', 'blood_group', 'height', 'weight')}),
        (_('Contact'), {'fields': ('address', 'city', 'state', 'postal_code')}),
        (_('Emergency Contact'), {'fields': ('emergency_contact_name', 'emergency_contact_phone', 'emergency_contact_relationship')}),
        (_('Medical Info'), {'fields': ('allergies', 'chronic_conditions', 'current_medications')}),
        (_('Timestamps'), {'fields': ('created_at', 'updated_at')}),
    )


@admin.register(DoctorProfile)
class DoctorProfileAdmin(admin.ModelAdmin):
    """Doctor profile admin"""
    
    list_display = ['user', 'license_number', 'specialization', 'years_of_experience', 'is_available_for_appointments']
    list_filter = ['specialization', 'is_available_for_appointments']
    search_fields = ['user__email', 'user__first_name', 'user__last_name', 'license_number', 'specialization']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        (_('User'), {'fields': ('user',)}),
        (_('Professional Info'), {'fields': ('license_number', 'specialization', 'years_of_experience', 'education')}),
        (_('Practice Info'), {'fields': ('consultation_fee', 'consultation_duration', 'max_patients_per_day')}),
        (_('Additional Info'), {'fields': ('bio', 'languages', 'is_available_for_appointments')}),
        (_('Timestamps'), {'fields': ('created_at', 'updated_at')}),
    )


@admin.register(NurseProfile)
class NurseProfileAdmin(admin.ModelAdmin):
    """Nurse profile admin"""
    
    list_display = ['user', 'license_number', 'specialization', 'years_of_experience', 'shift_preference']
    list_filter = ['specialization', 'shift_preference']
    search_fields = ['user__email', 'user__first_name', 'user__last_name', 'license_number']
    readonly_fields = ['created_at', 'updated_at']


@admin.register(PharmacistProfile)
class PharmacistProfileAdmin(admin.ModelAdmin):
    """Pharmacist profile admin"""
    
    list_display = ['user', 'license_number', 'years_of_experience', 'created_at']
    search_fields = ['user__email', 'user__first_name', 'user__last_name', 'license_number']
    readonly_fields = ['created_at', 'updated_at']


@admin.register(LabTechnicianProfile)
class LabTechnicianProfileAdmin(admin.ModelAdmin):
    """Lab technician profile admin"""
    
    list_display = ['user', 'license_number', 'specialization', 'years_of_experience', 'created_at']
    list_filter = ['specialization']
    search_fields = ['user__email', 'user__first_name', 'user__last_name', 'license_number']
    readonly_fields = ['created_at', 'updated_at']


@admin.register(FacilityAdminProfile)
class FacilityAdminProfileAdmin(admin.ModelAdmin):
    """Facility admin profile admin"""
    
    list_display = ['user', 'position', 'department', 'max_staff_accounts', 'created_at']
    search_fields = ['user__email', 'user__first_name', 'user__last_name', 'position']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        (_('User'), {'fields': ('user',)}),
        (_('Admin Info'), {'fields': ('position', 'department')}),
        (_('Permissions'), {'fields': ('can_verify_doctors', 'can_verify_nurses', 'can_verify_lab_techs', 'can_manage_appointments')}),
        (_('Limits'), {'fields': ('max_staff_accounts',)}),
        (_('Timestamps'), {'fields': ('created_at', 'updated_at')}),
    )

