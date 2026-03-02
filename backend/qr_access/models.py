from django.db import models
from django.conf import settings
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
import secrets
import hashlib
from datetime import timedelta


class QRToken(models.Model):
    """
    QR Code access tokens for sharing medical records
    Supports various access types and expiration policies
    """
    
    TOKEN_TYPES = [
        ('single_use', 'Single Use'),
        ('time_limited', 'Time Limited'),
        ('permanent', 'Permanent'),
        ('multi_use', 'Multi-Use (Limited Count)'),
    ]
    
    PERMISSION_LEVELS = [
        ('view_only', 'View Only'),
        ('view_edit', 'View and Edit'),
        ('view_vitals', 'View Vitals Only'),
        ('view_prescriptions', 'View Prescriptions Only'),
        ('view_lab_results', 'View Lab Results Only'),
        ('emergency_access', 'Emergency Access (Full)'),
    ]
    
    # Token identification
    token = models.CharField(
        max_length=64,
        unique=True,
        db_index=True,
        help_text="Secure random token (hashed)"
    )
    display_token = models.CharField(
        max_length=12,
        unique=True,
        help_text="Short display token for UI"
    )
    
    # Ownership
    medical_book = models.ForeignKey(
        'medical_records.MedicalBook',
        on_delete=models.CASCADE,
        related_name='qr_tokens'
    )
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='created_qr_tokens'
    )
    
    # Token configuration
    token_type = models.CharField(max_length=20, choices=TOKEN_TYPES, default='time_limited')
    permission_level = models.CharField(max_length=30, choices=PERMISSION_LEVELS, default='view_only')
    
    # Expiration settings
    expires_at = models.DateTimeField(
        null=True,
        blank=True,
        db_index=True,
        help_text="When token expires (null for permanent)"
    )
    
    # Usage tracking
    max_uses = models.PositiveIntegerField(
        null=True,
        blank=True,
        help_text="Maximum number of uses (null for unlimited)"
    )
    use_count = models.PositiveIntegerField(default=0)
    
    # Status
    is_active = models.BooleanField(default=True, db_index=True)
    revoked_at = models.DateTimeField(null=True, blank=True)
    revoked_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='revoked_qr_tokens'
    )
    revocation_reason = models.TextField(blank=True)
    
    # Metadata
    description = models.CharField(
        max_length=255,
        blank=True,
        help_text="Purpose or description of this token"
    )
    metadata = models.JSONField(
        default=dict,
        blank=True,
        help_text="Additional metadata (facility info, etc.)"
    )
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    last_used_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        db_table = 'qr_tokens'
        verbose_name = _('QR token')
        verbose_name_plural = _('QR tokens')
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['medical_book', 'is_active']),
            models.Index(fields=['token', 'is_active']),
            models.Index(fields=['created_by', '-created_at']),
        ]
    
    def __str__(self):
        return f"QR Token {self.display_token} - {self.medical_book.patient.email}"
    
    @classmethod
    def generate_token(cls, medical_book, created_by, token_type='time_limited', 
                       permission_level='view_only', expires_in_hours=24, 
                       max_uses=None, description=''):
        """
        Generate a new QR token
        """
        # Generate secure random token
        raw_token = secrets.token_urlsafe(32)
        hashed_token = hashlib.sha256(raw_token.encode()).hexdigest()
        
        # Generate short display token
        display_token = secrets.token_hex(6).upper()
        
        # Calculate expiration
        expires_at = None
        if token_type == 'time_limited':
            expires_at = timezone.now() + timedelta(hours=expires_in_hours)
        elif token_type == 'single_use':
            max_uses = 1
        
        token = cls.objects.create(
            token=hashed_token,
            display_token=display_token,
            medical_book=medical_book,
            created_by=created_by,
            token_type=token_type,
            permission_level=permission_level,
            expires_at=expires_at,
            max_uses=max_uses,
            description=description
        )
        
        # Return raw token (only time it's accessible)
        token._raw_token = raw_token
        return token
    
    def is_valid(self):
        """Check if token is valid for use"""
        if not self.is_active:
            return False, "Token is inactive"
        
        if self.revoked_at:
            return False, "Token has been revoked"
        
        if self.expires_at and timezone.now() > self.expires_at:
            return False, "Token has expired"
        
        if self.max_uses and self.use_count >= self.max_uses:
            return False, "Token usage limit reached"
        
        return True, "Token is valid"
    
    def use_token(self, accessed_by, metadata=None):
        """
        Record token usage
        """
        valid, message = self.is_valid()
        if not valid:
            return False, message
        
        # Update usage
        self.use_count += 1
        self.last_used_at = timezone.now()
        
        # Auto-revoke single-use tokens
        if self.token_type == 'single_use':
            self.is_active = False
            self.revoked_at = timezone.now()
        
        # Auto-revoke if max uses reached
        if self.max_uses and self.use_count >= self.max_uses:
            self.is_active = False
            self.revoked_at = timezone.now()
        
        self.save()
        
        # Create access log
        QRAccessLog.objects.create(
            token=self,
            accessed_by=accessed_by,
            medical_book=self.medical_book,
            permission_level=self.permission_level,
            metadata=metadata or {}
        )
        
        return True, "Access granted"
    
    def revoke(self, revoked_by, reason=''):
        """Revoke the token"""
        self.is_active = False
        self.revoked_at = timezone.now()
        self.revoked_by = revoked_by
        self.revocation_reason = reason
        self.save()
    
    @property
    def is_expired(self):
        """Check if token has expired"""
        if not self.expires_at:
            return False
        return timezone.now() > self.expires_at
    
    @property
    def time_remaining(self):
        """Get remaining time until expiration"""
        if not self.expires_at:
            return None
        remaining = self.expires_at - timezone.now()
        return remaining if remaining.total_seconds() > 0 else timedelta(0)


class QRAccessLog(models.Model):
    """
    Audit log for QR code access attempts
    Tracks who accessed what medical records and when
    """
    
    ACCESS_RESULTS = [
        ('granted', 'Access Granted'),
        ('denied', 'Access Denied'),
        ('expired', 'Token Expired'),
        ('revoked', 'Token Revoked'),
        ('invalid', 'Invalid Token'),
    ]
    
    # Token and access details
    token = models.ForeignKey(
        QRToken,
        on_delete=models.SET_NULL,
        null=True,
        related_name='access_logs'
    )
    medical_book = models.ForeignKey(
        'medical_records.MedicalBook',
        on_delete=models.CASCADE,
        related_name='qr_access_logs'
    )
    
    # Who accessed
    accessed_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='qr_accesses',
        help_text="User who accessed (if authenticated)"
    )
    accessed_by_email = models.EmailField(
        blank=True,
        help_text="Email of accessor (for unauthenticated users)"
    )
    
    # Access details
    permission_level = models.CharField(max_length=30)
    access_result = models.CharField(max_length=20, choices=ACCESS_RESULTS, default='granted')
    access_type = models.CharField(
        max_length=50,
        default='qr_scan',
        help_text="How access was attempted (qr_scan, api, manual)"
    )
    
    # Location data (optional)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(blank=True)
    geolocation = models.JSONField(
        null=True,
        blank=True,
        help_text="Geolocation data (lat, lon, address)"
    )
    
    # Metadata
    metadata = models.JSONField(
        default=dict,
        blank=True,
        help_text="Additional context (facility, reason, etc.)"
    )
    
    # Timestamp
    accessed_at = models.DateTimeField(auto_now_add=True, db_index=True)
    
    class Meta:
        db_table = 'qr_access_logs'
        verbose_name = _('QR access log')
        verbose_name_plural = _('QR access logs')
        ordering = ['-accessed_at']
        indexes = [
            models.Index(fields=['medical_book', '-accessed_at']),
            models.Index(fields=['token', '-accessed_at']),
            models.Index(fields=['accessed_by', '-accessed_at']),
        ]
    
    def __str__(self):
        accessor = self.accessed_by.email if self.accessed_by else self.accessed_by_email or 'Anonymous'
        return f"Access by {accessor} at {self.accessed_at}"
    
    @classmethod
    def log_access(cls, token, medical_book, accessed_by=None, 
                   access_result='granted', metadata=None, request=None):
        """
        Create an access log entry
        """
        log = cls.objects.create(
            token=token,
            medical_book=medical_book,
            accessed_by=accessed_by,
            permission_level=token.permission_level if token else 'unknown',
            access_result=access_result,
            metadata=metadata or {}
        )
        
        # Extract request metadata if provided
        if request:
            log.ip_address = cls.get_client_ip(request)
            log.user_agent = request.META.get('HTTP_USER_AGENT', '')
            log.save()
        
        return log
    
    @staticmethod
    def get_client_ip(request):
        """Extract client IP from request"""
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip
