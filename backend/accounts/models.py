from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.utils.translation import gettext_lazy as _


class UserManager(BaseUserManager):
    """Custom user manager for email-based authentication"""
    
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError(_('The Email field must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        
        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))
        
        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
    """Custom User model with email as primary identifier"""
    
    username = None  # Remove username field
    email = models.EmailField(_('email address'), unique=True)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    profile_picture = models.URLField(blank=True, null=True, help_text="Supabase Storage URL")
    
    # Active role (current session role for multi-role users)
    active_role = models.CharField(max_length=50, blank=True, null=True)
    
    # Verification status
    is_verified = models.BooleanField(default=False)
    verified_at = models.DateTimeField(blank=True, null=True)
    verified_by = models.ForeignKey(
        'self', 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        related_name='verified_users'
    )
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    objects = UserManager()
    
    class Meta:
        db_table = 'users'
        verbose_name = _('user')
        verbose_name_plural = _('users')
    
    def __str__(self):
        return self.email
    
    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}".strip() or self.email


class Role(models.Model):
    """User roles in the system"""
    
    ROLE_CHOICES = [
        ('patient', 'Patient'),
        ('doctor', 'Doctor'),
        ('nurse', 'Nurse'),
        ('pharmacist', 'Pharmacist'),
        ('lab_technician', 'Lab Technician'),
        ('hospital_admin', 'Hospital Administrator'),
        ('moh_admin', 'Ministry of Health Administrator'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='roles')
    role_type = models.CharField(max_length=50, choices=ROLE_CHOICES)
    
    # Verification status for professional roles
    is_verified = models.BooleanField(default=False)
    verified_at = models.DateTimeField(blank=True, null=True)
    verified_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='roles_verified'
    )
    
    # Document verification
    verification_documents = models.JSONField(
        default=list,
        blank=True,
        help_text="List of Supabase Storage URLs for verification documents"
    )
    verification_notes = models.TextField(blank=True)
    
    # Status
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'user_roles'
        unique_together = ['user', 'role_type']
        verbose_name = _('role')
        verbose_name_plural = _('roles')
    
    def __str__(self):
        return f"{self.user.email} - {self.get_role_type_display()}"


class PatientProfile(models.Model):
    """Profile for patients"""
    
    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
        ('N', 'Prefer not to say'),
    ]
    
    BLOOD_GROUP_CHOICES = [
        ('A+', 'A+'), ('A-', 'A-'),
        ('B+', 'B+'), ('B-', 'B-'),
        ('AB+', 'AB+'), ('AB-', 'AB-'),
        ('O+', 'O+'), ('O-', 'O-'),
    ]
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='patient_profile')
    
    # Personal information
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, blank=True)
    blood_group = models.CharField(max_length=3, choices=BLOOD_GROUP_CHOICES, blank=True)
    height = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True, help_text="Height in cm")
    weight = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True, help_text="Weight in kg")
    
    # Contact information
    address = models.TextField(blank=True)
    city = models.CharField(max_length=100, blank=True)
    state = models.CharField(max_length=100, blank=True)
    postal_code = models.CharField(max_length=20, blank=True)
    
    # Emergency contact
    emergency_contact_name = models.CharField(max_length=255, blank=True)
    emergency_contact_phone = models.CharField(max_length=20, blank=True)
    emergency_contact_relationship = models.CharField(max_length=100, blank=True)
    
    # Medical information
    allergies = models.TextField(blank=True, help_text="List of known allergies")
    chronic_conditions = models.TextField(blank=True, help_text="List of chronic conditions")
    current_medications = models.TextField(blank=True, help_text="List of current medications")
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'patient_profiles'
        verbose_name = _('patient profile')
        verbose_name_plural = _('patient profiles')
    
    def __str__(self):
        return f"Patient: {self.user.full_name}"


class DoctorProfile(models.Model):
    """Profile for doctors"""
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='doctor_profile')
    
    # Professional information
    license_number = models.CharField(max_length=100, unique=True)
    specialization = models.CharField(max_length=200)
    years_of_experience = models.PositiveIntegerField(default=0)
    education = models.TextField(help_text="Educational qualifications")
    
    # Practice information
    consultation_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    consultation_duration = models.PositiveIntegerField(default=30, help_text="Duration in minutes")
    max_patients_per_day = models.PositiveIntegerField(default=30)
    
    # Bio
    bio = models.TextField(blank=True)
    languages = models.CharField(max_length=255, blank=True, help_text="Comma-separated languages")
    
    # Availability
    is_available_for_appointments = models.BooleanField(default=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'doctor_profiles'
        verbose_name = _('doctor profile')
        verbose_name_plural = _('doctor profiles')
    
    def __str__(self):
        return f"Dr. {self.user.full_name} - {self.specialization}"


class NurseProfile(models.Model):
    """Profile for nurses"""
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='nurse_profile')
    
    # Professional information
    license_number = models.CharField(max_length=100, unique=True)
    specialization = models.CharField(max_length=200, blank=True)
    years_of_experience = models.PositiveIntegerField(default=0)
    education = models.TextField(help_text="Educational qualifications")
    
    # Work information
    shift_preference = models.CharField(
        max_length=50,
        choices=[('day', 'Day'), ('night', 'Night'), ('both', 'Both')],
        default='both'
    )
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'nurse_profiles'
        verbose_name = _('nurse profile')
        verbose_name_plural = _('nurse profiles')
    
    def __str__(self):
        return f"Nurse {self.user.full_name}"


class PharmacistProfile(models.Model):
    """Profile for pharmacists"""
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='pharmacist_profile')
    
    # Professional information
    license_number = models.CharField(max_length=100, unique=True)
    years_of_experience = models.PositiveIntegerField(default=0)
    education = models.TextField(help_text="Educational qualifications")
    
    # Specializations
    specializations = models.CharField(max_length=255, blank=True, help_text="Comma-separated specializations")
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'pharmacist_profiles'
        verbose_name = _('pharmacist profile')
        verbose_name_plural = _('pharmacist profiles')
    
    def __str__(self):
        return f"Pharmacist {self.user.full_name}"


class LabTechnicianProfile(models.Model):
    """Profile for laboratory technicians"""
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='lab_tech_profile')
    
    # Professional information
    license_number = models.CharField(max_length=100, unique=True)
    specialization = models.CharField(max_length=200, blank=True)
    years_of_experience = models.PositiveIntegerField(default=0)
    education = models.TextField(help_text="Educational qualifications")
    
    # Certifications
    certifications = models.TextField(blank=True, help_text="List of certifications")
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'lab_tech_profiles'
        verbose_name = _('lab technician profile')
        verbose_name_plural = _('lab technician profiles')
    
    def __str__(self):
        return f"Lab Tech {self.user.full_name}"


class FacilityAdminProfile(models.Model):
    """Profile for facility administrators (Hospital Admin)"""
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='facility_admin_profile')
    
    # Admin information
    position = models.CharField(max_length=200)
    department = models.CharField(max_length=200, blank=True)
    
    # Permissions
    can_verify_doctors = models.BooleanField(default=True)
    can_verify_nurses = models.BooleanField(default=True)
    can_verify_lab_techs = models.BooleanField(default=True)
    can_manage_appointments = models.BooleanField(default=True)
    
    # Limits
    max_staff_accounts = models.PositiveIntegerField(
        default=3,
        help_text="Maximum number of staff accounts this admin can create"
    )
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'facility_admin_profiles'
        verbose_name = _('facility administrator profile')
        verbose_name_plural = _('facility administrator profiles')
    
    def __str__(self):
        return f"Admin {self.user.full_name} - {self.position}"


class AdminInvitation(models.Model):
    """
    Tracks invitation links sent to hospital admins and ministry admins.
    These accounts are not self-registered but created via invitation by authorized personnel.
    """
    
    ROLE_CHOICES = [
        ('hospital_admin', 'Hospital Administrator'),
        ('ministry_admin', 'Ministry of Health Administrator'),
    ]
    
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('expired', 'Expired'),
        ('revoked', 'Revoked'),
    ]
    
    # Invitation details
    email = models.EmailField(help_text="Email address to send the invitation")
    role = models.CharField(max_length=50, choices=ROLE_CHOICES)
    token = models.CharField(max_length=255, unique=True, help_text="Unique token for invitation link")
    
    # Hospital association (only for hospital_admin role)
    hospital = models.ForeignKey(
        'facilities.Hospital',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='admin_invitations',
        help_text="Hospital this admin will manage (required for hospital_admin role)"
    )
    
    # Invitee information
    full_name = models.CharField(max_length=255, blank=True)
    phone_number = models.CharField(max_length=20, blank=True)
    message = models.TextField(blank=True, help_text="Optional message to include in invitation email")
    
    # Tracking
    invited_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        related_name='invitations_sent',
        help_text="User who sent this invitation"
    )
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField(help_text="Invitation expiration timestamp")
    accepted_at = models.DateTimeField(null=True, blank=True)
    
    # Revocation
    revoked_at = models.DateTimeField(null=True, blank=True)
    revoked_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='invitations_revoked'
    )
    
    # Additional metadata
    metadata = models.JSONField(default=dict, blank=True)
    
    class Meta:
        db_table = 'admin_invitations'
        verbose_name = _('admin invitation')
        verbose_name_plural = _('admin invitations')
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['email']),
            models.Index(fields=['token']),
            models.Index(fields=['status']),
            models.Index(fields=['hospital']),
        ]
    
    def __str__(self):
        return f"Invitation for {self.email} as {self.get_role_display()}"
    
    @property
    def is_expired(self):
        from django.utils import timezone
        return timezone.now() > self.expires_at
    
    @property
    def is_valid(self):
        return self.status == 'pending' and not self.is_expired
    
    def save(self, *args, **kwargs):
        # Generate token if not set
        if not self.token:
            import secrets
            self.token = secrets.token_urlsafe(32)
        
        # Set default expiration (7 days from creation)
        if not self.expires_at:
            from django.utils import timezone
            from datetime import timedelta
            self.expires_at = timezone.now() + timedelta(days=7)
        
        super().save(*args, **kwargs)
    
    def accept(self, user):
        """Mark invitation as accepted and link to user"""
        from django.utils import timezone
        self.status = 'accepted'
        self.accepted_at = timezone.now()
        self.save()
        return user
    
    def revoke(self, revoked_by_user):
        """Revoke this invitation"""
        from django.utils import timezone
        self.status = 'revoked'
        self.revoked_at = timezone.now()
        self.revoked_by = revoked_by_user
        self.save()
