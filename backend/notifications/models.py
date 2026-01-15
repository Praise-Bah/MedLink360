from django.db import models
from django.conf import settings
from django.utils.translation import gettext_lazy as _


class Notification(models.Model):
    """
    Notification system for real-time updates
    """
    
    NOTIFICATION_TYPES = [
        # Appointment notifications
        ('appointment_created', 'Appointment Created'),
        ('appointment_confirmed', 'Appointment Confirmed'),
        ('appointment_reminder', 'Appointment Reminder'),
        ('appointment_cancelled', 'Appointment Cancelled'),
        ('appointment_rescheduled', 'Appointment Rescheduled'),
        
        # Medical record notifications
        ('medical_book_updated', 'Medical Book Updated'),
        ('visit_completed', 'Visit Completed'),
        ('clinical_note_added', 'Clinical Note Added'),
        ('diagnosis_added', 'New Diagnosis'),
        
        # Prescription notifications
        ('prescription_created', 'New Prescription'),
        ('prescription_dispensed', 'Prescription Dispensed'),
        ('prescription_refill_due', 'Prescription Refill Due'),
        
        # Lab notifications
        ('lab_order_created', 'Lab Order Created'),
        ('lab_sample_collected', 'Lab Sample Collected'),
        ('lab_result_ready', 'Lab Result Ready'),
        ('lab_result_abnormal', 'Abnormal Lab Result'),
        
        # Admission notifications
        ('admission_created', 'Hospital Admission'),
        ('discharge_ready', 'Discharge Ready'),
        
        # Access notifications
        ('medical_book_access_granted', 'Medical Book Access Granted'),
        ('medical_book_access_revoked', 'Medical Book Access Revoked'),
        
        # Facility notifications
        ('facility_verified', 'Facility Verified'),
        ('facility_suspended', 'Facility Suspended'),
        ('staff_added', 'Staff Member Added'),
        
        # MoH notifications
        ('moh_alert', 'Ministry of Health Alert'),
        ('moh_bulletin', 'Health Bulletin'),
        
        # System notifications
        ('system_maintenance', 'System Maintenance'),
        ('account_update', 'Account Update'),
    ]
    
    PRIORITY_LEVELS = [
        ('low', 'Low'),
        ('normal', 'Normal'),
        ('high', 'High'),
        ('urgent', 'Urgent'),
    ]
    
    # Recipient
    recipient = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='notifications'
    )
    
    # Notification details
    notification_type = models.CharField(max_length=50, choices=NOTIFICATION_TYPES)
    title = models.CharField(max_length=255)
    message = models.TextField()
    priority = models.CharField(max_length=10, choices=PRIORITY_LEVELS, default='normal')
    
    # Related objects (optional - use GenericForeignKey for flexibility)
    related_object_type = models.CharField(max_length=50, blank=True, help_text="Model name of related object")
    related_object_id = models.PositiveIntegerField(null=True, blank=True, help_text="ID of related object")
    
    # Additional data
    data = models.JSONField(
        default=dict,
        blank=True,
        help_text="Additional data for the notification (URLs, IDs, etc.)"
    )
    
    # Status
    is_read = models.BooleanField(default=False)
    read_at = models.DateTimeField(null=True, blank=True)
    
    # Delivery channels
    sent_push = models.BooleanField(default=False, help_text="Sent via push notification")
    sent_email = models.BooleanField(default=False, help_text="Sent via email")
    sent_sms = models.BooleanField(default=False, help_text="Sent via SMS")
    
    # Actions
    action_url = models.CharField(max_length=500, blank=True, help_text="URL to navigate to when clicked")
    action_label = models.CharField(max_length=100, blank=True, help_text="Label for action button")
    
    # Sender (optional)
    sender = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='sent_notifications'
    )
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    expires_at = models.DateTimeField(null=True, blank=True, help_text="When notification expires")
    
    class Meta:
        db_table = 'notifications'
        verbose_name = _('notification')
        verbose_name_plural = _('notifications')
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['recipient', '-created_at']),
            models.Index(fields=['recipient', 'is_read']),
            models.Index(fields=['notification_type', '-created_at']),
        ]
    
    def __str__(self):
        return f"{self.title} - {self.recipient.email}"
    
    def mark_as_read(self):
        """Mark notification as read"""
        if not self.is_read:
            from django.utils import timezone
            self.is_read = True
            self.read_at = timezone.now()
            self.save(update_fields=['is_read', 'read_at'])
    
    @property
    def is_expired(self):
        """Check if notification has expired"""
        if self.expires_at:
            from django.utils import timezone
            return timezone.now() > self.expires_at
        return False


class NotificationPreference(models.Model):
    """
    User preferences for notifications
    """
    
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='notification_preferences'
    )
    
    # Channel preferences
    enable_push = models.BooleanField(default=True)
    enable_email = models.BooleanField(default=True)
    enable_sms = models.BooleanField(default=False)
    
    # Notification type preferences (JSON with type: enabled mapping)
    enabled_types = models.JSONField(
        default=dict,
        blank=True,
        help_text="Dictionary of notification types and whether they're enabled"
    )
    
    # Quiet hours
    quiet_hours_enabled = models.BooleanField(default=False)
    quiet_hours_start = models.TimeField(null=True, blank=True, help_text="Start of quiet hours")
    quiet_hours_end = models.TimeField(null=True, blank=True, help_text="End of quiet hours")
    
    # Frequency settings
    daily_digest = models.BooleanField(default=False, help_text="Receive daily digest instead of individual notifications")
    digest_time = models.TimeField(null=True, blank=True, help_text="Time to send daily digest")
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'notification_preferences'
        verbose_name = _('notification preference')
        verbose_name_plural = _('notification preferences')
    
    def __str__(self):
        return f"Preferences for {self.user.email}"
    
    def is_type_enabled(self, notification_type):
        """Check if a notification type is enabled"""
        return self.enabled_types.get(notification_type, True)
    
    def is_in_quiet_hours(self):
        """Check if current time is within quiet hours"""
        if not self.quiet_hours_enabled or not self.quiet_hours_start or not self.quiet_hours_end:
            return False
        
        from datetime import datetime
        now = datetime.now().time()
        
        if self.quiet_hours_start < self.quiet_hours_end:
            return self.quiet_hours_start <= now <= self.quiet_hours_end
        else:
            # Quiet hours span midnight
            return now >= self.quiet_hours_start or now <= self.quiet_hours_end
