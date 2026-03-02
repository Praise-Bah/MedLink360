from django.db import models
from django.conf import settings
from django.utils.translation import gettext_lazy as _
from django.core.validators import MinValueValidator, MaxValueValidator


class Hospital(models.Model):
    """Hospital/Medical Facility"""
    
    STATUS_CHOICES = [
        ('pending', 'Pending Verification'),
        ('verified', 'Verified'),
        ('suspended', 'Suspended'),
        ('rejected', 'Rejected'),
    ]
    
    # Basic Information
    name = models.CharField(max_length=255)
    registration_number = models.CharField(max_length=100, unique=True)
    email = models.EmailField()
    phone_number = models.CharField(max_length=20)
    website = models.URLField(blank=True, null=True)
    
    # Address
    address = models.TextField()
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    country = models.CharField(max_length=100, default='Ghana')
    
    # Location coordinates (for mapping)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    
    # Ownership & Administration
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name='owned_hospitals'
    )
    administrators = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        through='FacilityStaff',
        related_name='administered_hospitals'
    )
    
    # Verification
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    verified_at = models.DateTimeField(null=True, blank=True)
    verified_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='hospitals_verified'
    )
    verification_documents = models.JSONField(
        default=list,
        blank=True,
        help_text="List of Supabase Storage URLs for verification documents"
    )
    verification_notes = models.TextField(blank=True)
    
    # Facility Details
    description = models.TextField(blank=True)
    services_offered = models.JSONField(
        default=list,
        blank=True,
        help_text="List of services offered (e.g., Emergency, Surgery, Maternity)"
    )
    specialties = models.JSONField(
        default=list,
        blank=True,
        help_text="Medical specialties available"
    )
    
    # Capacity
    bed_count = models.PositiveIntegerField(default=0)
    emergency_services = models.BooleanField(default=False)
    ambulance_services = models.BooleanField(default=False)
    
    # Operating Hours
    operating_hours = models.JSONField(
        default=dict,
        blank=True,
        help_text="Operating hours by day of week"
    )
    
    # Limits & Restrictions
    max_staff_accounts = models.PositiveIntegerField(
        default=50,
        help_text="Maximum number of staff accounts allowed"
    )
    
    # Status
    is_active = models.BooleanField(default=True)
    is_accepting_patients = models.BooleanField(default=True)
    
    # Images
    logo = models.URLField(blank=True, null=True, help_text="Supabase Storage URL")
    cover_image = models.URLField(blank=True, null=True, help_text="Supabase Storage URL")
    images = models.JSONField(default=list, blank=True, help_text="Additional facility images")
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'hospitals'
        verbose_name = _('hospital')
        verbose_name_plural = _('hospitals')
        ordering = ['-created_at']
    
    def __str__(self):
        return self.name
    
    @property
    def current_staff_count(self):
        return self.facilitystaff_set.filter(is_active=True).count()
    
    @property
    def can_add_staff(self):
        return self.current_staff_count < self.max_staff_accounts


class Pharmacy(models.Model):
    """Pharmacy/Drugstore"""
    
    STATUS_CHOICES = [
        ('pending', 'Pending Verification'),
        ('verified', 'Verified'),
        ('suspended', 'Suspended'),
        ('rejected', 'Rejected'),
    ]
    
    # Basic Information
    name = models.CharField(max_length=255)
    registration_number = models.CharField(max_length=100, unique=True)
    license_number = models.CharField(max_length=100, unique=True)
    email = models.EmailField()
    phone_number = models.CharField(max_length=20)
    
    # Address
    address = models.TextField()
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    country = models.CharField(max_length=100, default='Ghana')
    
    # Location coordinates
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    
    # Ownership
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name='owned_pharmacies'
    )
    pharmacists = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        through='FacilityStaff',
        related_name='employed_pharmacies'
    )
    
    # Verification
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    verified_at = models.DateTimeField(null=True, blank=True)
    verified_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='pharmacies_verified'
    )
    verification_documents = models.JSONField(default=list, blank=True)
    verification_notes = models.TextField(blank=True)
    
    # Facility Details
    description = models.TextField(blank=True)
    services_offered = models.JSONField(
        default=list,
        blank=True,
        help_text="Services like prescription filling, OTC sales, consultations"
    )
    
    # Operating Hours
    operating_hours = models.JSONField(default=dict, blank=True)
    is_24_hours = models.BooleanField(default=False)
    
    # Inventory capabilities
    has_inventory_management = models.BooleanField(default=False)
    accepts_insurance = models.BooleanField(default=False)
    
    # Limits
    max_pharmacist_accounts = models.PositiveIntegerField(
        default=10,
        help_text="Maximum pharmacist accounts allowed"
    )
    
    # Status
    is_active = models.BooleanField(default=True)
    is_accepting_prescriptions = models.BooleanField(default=True)
    
    # Images
    logo = models.URLField(blank=True, null=True)
    images = models.JSONField(default=list, blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'pharmacies'
        verbose_name = _('pharmacy')
        verbose_name_plural = _('pharmacies')
        ordering = ['-created_at']
    
    def __str__(self):
        return self.name
    
    @property
    def current_pharmacist_count(self):
        return self.facilitystaff_set.filter(is_active=True, role='pharmacist').count()
    
    @property
    def can_add_pharmacist(self):
        return self.current_pharmacist_count < self.max_pharmacist_accounts


class Laboratory(models.Model):
    """Laboratory/Diagnostic Center"""
    
    STATUS_CHOICES = [
        ('pending', 'Pending Verification'),
        ('verified', 'Verified'),
        ('suspended', 'Suspended'),
        ('rejected', 'Rejected'),
    ]
    
    # Basic Information
    name = models.CharField(max_length=255)
    registration_number = models.CharField(max_length=100, unique=True)
    license_number = models.CharField(max_length=100, unique=True)
    email = models.EmailField()
    phone_number = models.CharField(max_length=20)
    
    # Address
    address = models.TextField()
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    country = models.CharField(max_length=100, default='Ghana')
    
    # Location coordinates
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    
    # Ownership
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name='owned_laboratories'
    )
    technicians = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        through='FacilityStaff',
        related_name='employed_laboratories'
    )
    
    # Verification
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    verified_at = models.DateTimeField(null=True, blank=True)
    verified_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='laboratories_verified'
    )
    verification_documents = models.JSONField(default=list, blank=True)
    verification_notes = models.TextField(blank=True)
    
    # Facility Details
    description = models.TextField(blank=True)
    tests_offered = models.JSONField(
        default=list,
        blank=True,
        help_text="List of available tests (e.g., Blood Test, X-Ray, MRI)"
    )
    certifications = models.JSONField(default=list, blank=True)
    
    # Operating Hours
    operating_hours = models.JSONField(default=dict, blank=True)
    
    # Capabilities
    has_mobile_collection = models.BooleanField(default=False, help_text="Home sample collection")
    turnaround_time_hours = models.PositiveIntegerField(default=24)
    
    # Status
    is_active = models.BooleanField(default=True)
    is_accepting_tests = models.BooleanField(default=True)
    
    # Images
    logo = models.URLField(blank=True, null=True)
    images = models.JSONField(default=list, blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'laboratories'
        verbose_name = _('laboratory')
        verbose_name_plural = _('laboratories')
        ordering = ['-created_at']
    
    def __str__(self):
        return self.name


class FacilityStaff(models.Model):
    """Link between facilities and staff members"""
    
    ROLE_CHOICES = [
        ('admin', 'Administrator'),
        ('doctor', 'Doctor'),
        ('nurse', 'Nurse'),
        ('pharmacist', 'Pharmacist'),
        ('lab_technician', 'Lab Technician'),
        ('receptionist', 'Receptionist'),
        ('other', 'Other Staff'),
    ]
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    role = models.CharField(max_length=50, choices=ROLE_CHOICES)
    
    # Facility (one of these will be set)
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE, null=True, blank=True)
    pharmacy = models.ForeignKey(Pharmacy, on_delete=models.CASCADE, null=True, blank=True)
    laboratory = models.ForeignKey(Laboratory, on_delete=models.CASCADE, null=True, blank=True)
    
    # Employment details
    position_title = models.CharField(max_length=200)
    department = models.CharField(max_length=200, blank=True)
    employee_id = models.CharField(max_length=100, blank=True)
    
    # Status
    is_active = models.BooleanField(default=True)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    
    # Permissions
    can_manage_appointments = models.BooleanField(default=False)
    can_manage_inventory = models.BooleanField(default=False)
    can_view_records = models.BooleanField(default=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'facility_staff'
        verbose_name = _('facility staff')
        verbose_name_plural = _('facility staff')
        unique_together = ['user', 'hospital', 'pharmacy', 'laboratory', 'role']
    
    def __str__(self):
        facility = self.hospital or self.pharmacy or self.laboratory
        return f"{self.user.full_name} - {self.role} at {facility.name if facility else 'Unknown'}"
    
    @property
    def facility(self):
        return self.hospital or self.pharmacy or self.laboratory


class DoctorSchedule(models.Model):
    """Doctor's availability schedule"""
    
    DAY_CHOICES = [
        ('monday', 'Monday'),
        ('tuesday', 'Tuesday'),
        ('wednesday', 'Wednesday'),
        ('thursday', 'Thursday'),
        ('friday', 'Friday'),
        ('saturday', 'Saturday'),
        ('sunday', 'Sunday'),
    ]
    
    doctor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='schedules')
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE, related_name='doctor_schedules')
    
    # Schedule
    day_of_week = models.CharField(max_length=20, choices=DAY_CHOICES)
    start_time = models.TimeField()
    end_time = models.TimeField()
    
    # Appointment settings
    slot_duration_minutes = models.PositiveIntegerField(default=30)
    max_patients_per_slot = models.PositiveIntegerField(default=1)
    
    # Status
    is_active = models.BooleanField(default=True)
    
    # Date range (optional - for temporary schedules)
    effective_from = models.DateField(null=True, blank=True)
    effective_until = models.DateField(null=True, blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'doctor_schedules'
        verbose_name = _('doctor schedule')
        verbose_name_plural = _('doctor schedules')
        ordering = ['day_of_week', 'start_time']
    
    def __str__(self):
        return f"{self.doctor.full_name} - {self.get_day_of_week_display()} {self.start_time}-{self.end_time}"


class Appointment(models.Model):
    """Medical appointment booking"""
    
    STATUS_CHOICES = [
        ('scheduled', 'Scheduled'),
        ('confirmed', 'Confirmed'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
        ('no_show', 'No Show'),
        ('rescheduled', 'Rescheduled'),
    ]
    
    TYPE_CHOICES = [
        ('consultation', 'Consultation'),
        ('follow_up', 'Follow-up'),
        ('emergency', 'Emergency'),
        ('vaccination', 'Vaccination'),
        ('checkup', 'Check-up'),
        ('procedure', 'Procedure'),
        ('other', 'Other'),
    ]
    
    # Parties involved
    patient = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='appointments'
    )
    doctor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='doctor_appointments'
    )
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE, related_name='appointments')
    
    # Appointment details
    appointment_type = models.CharField(max_length=50, choices=TYPE_CHOICES)
    appointment_date = models.DateField()
    appointment_time = models.TimeField()
    duration_minutes = models.PositiveIntegerField(default=30)
    
    # Status tracking
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='scheduled')
    confirmation_code = models.CharField(max_length=20, unique=True, blank=True)
    
    # Details
    reason = models.TextField(help_text="Reason for appointment")
    symptoms = models.TextField(blank=True)
    notes = models.TextField(blank=True, help_text="Additional notes")
    
    # Follow-up tracking
    is_follow_up = models.BooleanField(default=False)
    previous_appointment = models.ForeignKey(
        'self',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='follow_ups'
    )
    
    # Cancellation
    cancelled_at = models.DateTimeField(null=True, blank=True)
    cancelled_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='cancelled_appointments'
    )
    cancellation_reason = models.TextField(blank=True)
    
    # Reminder & notifications
    reminder_sent = models.BooleanField(default=False)
    reminder_sent_at = models.DateTimeField(null=True, blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'appointments'
        verbose_name = _('appointment')
        verbose_name_plural = _('appointments')
        ordering = ['-appointment_date', '-appointment_time']
        indexes = [
            models.Index(fields=['patient', 'appointment_date']),
            models.Index(fields=['doctor', 'appointment_date']),
            models.Index(fields=['hospital', 'appointment_date']),
            models.Index(fields=['status']),
        ]
    
    def __str__(self):
        return f"{self.patient.full_name} with Dr. {self.doctor.full_name} on {self.appointment_date}"
    
    def save(self, *args, **kwargs):
        if not self.confirmation_code:
            import uuid
            self.confirmation_code = str(uuid.uuid4())[:8].upper()
        super().save(*args, **kwargs)
