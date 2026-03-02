from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from .models import Notification, NotificationPreference


@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    """Admin for Notification"""
    
    list_display = [
        'title', 'recipient', 'notification_type', 'priority',
        'is_read', 'created_at'
    ]
    list_filter = [
        'notification_type', 'priority', 'is_read',
        'sent_push', 'sent_email', 'sent_sms', 'created_at'
    ]
    search_fields = [
        'title', 'message', 'recipient__email',
        'recipient__first_name', 'recipient__last_name'
    ]
    readonly_fields = ['created_at', 'read_at', 'is_expired']
    date_hierarchy = 'created_at'
    
    fieldsets = (
        (_('Recipient'), {
            'fields': ('recipient', 'sender')
        }),
        (_('Notification Details'), {
            'fields': ('notification_type', 'title', 'message', 'priority')
        }),
        (_('Related Object'), {
            'fields': ('related_object_type', 'related_object_id', 'data')
        }),
        (_('Status'), {
            'fields': ('is_read', 'read_at', 'expires_at', 'is_expired')
        }),
        (_('Delivery'), {
            'fields': ('sent_push', 'sent_email', 'sent_sms')
        }),
        (_('Actions'), {
            'fields': ('action_url', 'action_label')
        }),
        (_('Timestamps'), {
            'fields': ('created_at',)
        }),
    )
    
    actions = ['mark_as_read', 'mark_as_unread']
    
    def mark_as_read(self, request, queryset):
        """Mark selected notifications as read"""
        from django.utils import timezone
        updated = queryset.filter(is_read=False).update(
            is_read=True,
            read_at=timezone.now()
        )
        self.message_user(request, f'{updated} notifications marked as read.')
    mark_as_read.short_description = 'Mark selected as read'
    
    def mark_as_unread(self, request, queryset):
        """Mark selected notifications as unread"""
        updated = queryset.filter(is_read=True).update(
            is_read=False,
            read_at=None
        )
        self.message_user(request, f'{updated} notifications marked as unread.')
    mark_as_unread.short_description = 'Mark selected as unread'


@admin.register(NotificationPreference)
class NotificationPreferenceAdmin(admin.ModelAdmin):
    """Admin for NotificationPreference"""
    
    list_display = [
        'user', 'enable_push', 'enable_email', 'enable_sms',
        'daily_digest', 'quiet_hours_enabled'
    ]
    list_filter = [
        'enable_push', 'enable_email', 'enable_sms',
        'daily_digest', 'quiet_hours_enabled'
    ]
    search_fields = ['user__email', 'user__first_name', 'user__last_name']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        (_('User'), {
            'fields': ('user',)
        }),
        (_('Channel Preferences'), {
            'fields': ('enable_push', 'enable_email', 'enable_sms')
        }),
        (_('Notification Types'), {
            'fields': ('enabled_types',)
        }),
        (_('Quiet Hours'), {
            'fields': ('quiet_hours_enabled', 'quiet_hours_start', 'quiet_hours_end')
        }),
        (_('Digest Settings'), {
            'fields': ('daily_digest', 'digest_time')
        }),
        (_('Timestamps'), {
            'fields': ('created_at', 'updated_at')
        }),
    )
