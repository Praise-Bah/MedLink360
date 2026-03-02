from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from .models import QRToken, QRAccessLog


@admin.register(QRToken)
class QRTokenAdmin(admin.ModelAdmin):
    """Admin for QRToken"""
    
    list_display = [
        'display_token', 'get_patient_name', 'token_type', 'permission_level',
        'is_active', 'use_count', 'expires_at', 'created_at'
    ]
    list_filter = [
        'token_type', 'permission_level', 'is_active',
        'created_at', 'expires_at'
    ]
    search_fields = [
        'display_token', 'description',
        'medical_book__patient__email',
        'medical_book__patient__first_name',
        'medical_book__patient__last_name'
    ]
    readonly_fields = [
        'token', 'display_token', 'created_by', 'use_count',
        'last_used_at', 'revoked_at', 'revoked_by', 'created_at',
        'is_expired'
    ]
    date_hierarchy = 'created_at'
    
    fieldsets = (
        (_('Token Information'), {
            'fields': ('display_token', 'token', 'medical_book')
        }),
        (_('Configuration'), {
            'fields': ('token_type', 'permission_level', 'description')
        }),
        (_('Expiration & Limits'), {
            'fields': ('expires_at', 'max_uses', 'use_count', 'is_expired')
        }),
        (_('Status'), {
            'fields': ('is_active', 'revoked_at', 'revoked_by', 'revocation_reason')
        }),
        (_('Metadata'), {
            'fields': ('metadata',),
            'classes': ('collapse',)
        }),
        (_('Timestamps'), {
            'fields': ('created_at', 'created_by', 'last_used_at')
        }),
    )
    
    actions = ['revoke_tokens', 'activate_tokens']
    
    def get_patient_name(self, obj):
        """Get patient name"""
        return obj.medical_book.patient.full_name
    get_patient_name.short_description = 'Patient'
    
    def revoke_tokens(self, request, queryset):
        """Revoke selected tokens"""
        updated = 0
        for token in queryset.filter(is_active=True):
            token.revoke(revoked_by=request.user, reason='Admin revocation')
            updated += 1
        self.message_user(request, f'{updated} tokens revoked.')
    revoke_tokens.short_description = 'Revoke selected tokens'
    
    def activate_tokens(self, request, queryset):
        """Activate selected tokens"""
        updated = queryset.filter(is_active=False, revoked_at__isnull=True).update(
            is_active=True
        )
        self.message_user(request, f'{updated} tokens activated.')
    activate_tokens.short_description = 'Activate selected tokens'


@admin.register(QRAccessLog)
class QRAccessLogAdmin(admin.ModelAdmin):
    """Admin for QRAccessLog"""
    
    list_display = [
        'id', 'get_token_display', 'get_patient_name', 'get_accessor_name',
        'access_result', 'permission_level', 'accessed_at'
    ]
    list_filter = [
        'access_result', 'access_type', 'permission_level', 'accessed_at'
    ]
    search_fields = [
        'accessed_by__email', 'accessed_by_email',
        'medical_book__patient__email', 'ip_address'
    ]
    readonly_fields = [
        'token', 'medical_book', 'accessed_by', 'accessed_by_email',
        'permission_level', 'access_result', 'access_type',
        'ip_address', 'user_agent', 'geolocation', 'metadata', 'accessed_at'
    ]
    date_hierarchy = 'accessed_at'
    
    fieldsets = (
        (_('Access Details'), {
            'fields': ('token', 'medical_book', 'accessed_by', 'accessed_by_email')
        }),
        (_('Result'), {
            'fields': ('access_result', 'access_type', 'permission_level')
        }),
        (_('Location & Device'), {
            'fields': ('ip_address', 'user_agent', 'geolocation'),
            'classes': ('collapse',)
        }),
        (_('Metadata'), {
            'fields': ('metadata',),
            'classes': ('collapse',)
        }),
        (_('Timestamp'), {
            'fields': ('accessed_at',)
        }),
    )
    
    def get_token_display(self, obj):
        """Get token display"""
        return obj.token.display_token if obj.token else 'N/A'
    get_token_display.short_description = 'Token'
    
    def get_patient_name(self, obj):
        """Get patient name"""
        return obj.medical_book.patient.full_name
    get_patient_name.short_description = 'Patient'
    
    def get_accessor_name(self, obj):
        """Get accessor name"""
        if obj.accessed_by:
            return obj.accessed_by.full_name
        return obj.accessed_by_email or 'Anonymous'
    get_accessor_name.short_description = 'Accessed By'
    
    def has_add_permission(self, request):
        """Access logs are read-only"""
        return False
    
    def has_change_permission(self, request, obj=None):
        """Access logs are read-only"""
        return False
