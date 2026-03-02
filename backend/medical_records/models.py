from django.db import models
from django.conf import settings
from django.utils.translation import gettext_lazy as _
from django.core.validators import MinValueValidator, MaxValueValidator


class MedicalBook(models.Model):
    """
    Main medical record container for a patient.
    One per patient.
    """
    
    patient = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='medical_book'
    )
    
    # Emergency Information
    blood_type = models.CharField(
        max_length=10,
        choices=[
            ('A+', 'A+'), ('A-', 'A-'),
            ('B+', 'B+'), ('B-', 'B-'),
            ('AB+', 'AB+'), ('AB-', 'AB-'),
            ('O+', 'O+'), ('O-', 'O-'),
            ('Unknown', 'Unknown'),
        ],
        default='Unknown'
    )
    allergies = models.TextField(blank=True, help_text="Known allergies")
    chronic_conditions = models.TextField(blank=True, help_text="Chronic medical conditions")
    current_medications = models.TextField(blank=True, help_text="Current medications")
    
    # Medical History Summary
    past_surgeries = models.TextField(blank=True)
    family_medical_history = models.TextField(blank=True)
    
    # Access Control
    shared_with = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        through='MedicalBookAccess',
        through_fields=('medical_book', 'user'),
        related_name='accessible_medical_books'
    )
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'medical_books'
        verbose_name = _('medical book')
        verbose_name_plural = _('medical books')
    
    def __str__(self):
        return f"Medical Book - {self.patient.full_name}"


class MedicalBookAccess(models.Model):
    """Track who has access to a patient's medical book"""
    
    ACCESS_LEVEL_CHOICES = [
        ('view', 'View Only'),
        ('edit', 'View and Edit'),
        ('full', 'Full Access'),
    ]
    
    medical_book = models.ForeignKey(MedicalBook, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    access_level = models.CharField(max_length=10, choices=ACCESS_LEVEL_CHOICES, default='view')
    
    granted_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name='granted_accesses'
    )
    granted_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField(null=True, blank=True, help_text="Optional expiration")
    
    reason = models.TextField(blank=True, help_text="Reason for access")
    is_active = models.BooleanField(default=True)
    
    class Meta:
        db_table = 'medical_book_access'
        unique_together = ['medical_book', 'user']
        verbose_name = _('medical book access')
        verbose_name_plural = _('medical book accesses')
    
    def __str__(self):
        return f"{self.user.email} -> {self.medical_book.patient.email} ({self.access_level})"


class Visit(models.Model):
    """Clinical visit record"""
    
    STATUS_CHOICES = [
        ('scheduled', 'Scheduled'),
        ('checked_in', 'Checked In'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
        ('no_show', 'No Show'),
    ]
    
    TYPE_CHOICES = [
        ('outpatient', 'Outpatient'),
        ('emergency', 'Emergency'),
        ('inpatient', 'Inpatient'),
        ('followup', 'Follow-up'),
        ('teleconsultation', 'Teleconsultation'),
    ]
    
    medical_book = models.ForeignKey(MedicalBook, on_delete=models.CASCADE, related_name='visits')
    appointment = models.OneToOneField(
        'facilities.Appointment',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='visit'
    )
    
    # Visit Details
    visit_date = models.DateField()
    visit_time = models.TimeField()
    visit_type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='scheduled')
    
    # Parties Involved
    patient = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='patient_visits'
    )
    doctor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='doctor_visits'
    )
    facility = models.ForeignKey('facilities.Hospital', on_delete=models.CASCADE, related_name='visits')
    
    # Visit Information
    chief_complaint = models.TextField(help_text="Main reason for visit")
    visit_summary = models.TextField(blank=True)
    
    # Follow-up
    follow_up_required = models.BooleanField(default=False)
    follow_up_date = models.DateField(null=True, blank=True)
    follow_up_notes = models.TextField(blank=True)
    
    # Timestamps
    checked_in_at = models.DateTimeField(null=True, blank=True)
    started_at = models.DateTimeField(null=True, blank=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'visits'
        verbose_name = _('visit')
        verbose_name_plural = _('visits')
        ordering = ['-visit_date', '-visit_time']
        indexes = [
            models.Index(fields=['patient', 'visit_date']),
            models.Index(fields=['doctor', 'visit_date']),
            models.Index(fields=['facility', 'visit_date']),
        ]
    
    def __str__(self):
        return f"{self.patient.full_name} - {self.visit_date} ({self.visit_type})"


class VitalSigns(models.Model):
    """Vital signs measurements"""
    
    visit = models.ForeignKey(Visit, on_delete=models.CASCADE, related_name='vital_signs')
    
    # Basic Vitals
    temperature = models.DecimalField(
        max_digits=4,
        decimal_places=1,
        null=True,
        blank=True,
        help_text="Temperature in Celsius"
    )
    pulse_rate = models.PositiveIntegerField(
        null=True,
        blank=True,
        help_text="Beats per minute"
    )
    respiratory_rate = models.PositiveIntegerField(
        null=True,
        blank=True,
        help_text="Breaths per minute"
    )
    
    # Blood Pressure
    systolic_bp = models.PositiveIntegerField(
        null=True,
        blank=True,
        help_text="Systolic blood pressure (mmHg)"
    )
    diastolic_bp = models.PositiveIntegerField(
        null=True,
        blank=True,
        help_text="Diastolic blood pressure (mmHg)"
    )
    
    # Oxygen
    oxygen_saturation = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        null=True,
        blank=True,
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        help_text="SpO2 percentage"
    )
    
    # Physical Measurements
    height = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        null=True,
        blank=True,
        help_text="Height in cm"
    )
    weight = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        null=True,
        blank=True,
        help_text="Weight in kg"
    )
    bmi = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        null=True,
        blank=True,
        help_text="Body Mass Index (calculated)"
    )
    
    # Additional
    blood_glucose = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        null=True,
        blank=True,
        help_text="Blood glucose in mmol/L"
    )
    
    notes = models.TextField(blank=True)
    recorded_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    recorded_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'vital_signs'
        verbose_name = _('vital signs')
        verbose_name_plural = _('vital signs')
        ordering = ['-recorded_at']
    
    def __str__(self):
        return f"Vitals - {self.visit.patient.full_name} on {self.recorded_at.date()}"
    
    def save(self, *args, **kwargs):
        # Calculate BMI if height and weight are provided
        if self.height and self.weight and self.height > 0:
            height_m = float(self.height) / 100  # Convert cm to meters
            self.bmi = float(self.weight) / (height_m ** 2)
        super().save(*args, **kwargs)


class ClinicalNote(models.Model):
    """Doctor's clinical notes"""
    
    visit = models.ForeignKey(Visit, on_delete=models.CASCADE, related_name='clinical_notes')
    
    # SOAP Format
    subjective = models.TextField(help_text="Patient's symptoms and complaints")
    objective = models.TextField(help_text="Physical examination findings")
    assessment = models.TextField(help_text="Clinical assessment and diagnosis")
    plan = models.TextField(help_text="Treatment plan")
    
    # Additional
    history_of_present_illness = models.TextField(blank=True, help_text="HPI")
    review_of_systems = models.TextField(blank=True, help_text="ROS")
    physical_examination = models.TextField(blank=True)
    
    # Metadata
    note_type = models.CharField(
        max_length=50,
        choices=[
            ('progress', 'Progress Note'),
            ('admission', 'Admission Note'),
            ('discharge', 'Discharge Summary'),
            ('consultation', 'Consultation Note'),
            ('procedure', 'Procedure Note'),
        ],
        default='progress'
    )
    
    doctor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='clinical_notes')
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    signed_at = models.DateTimeField(null=True, blank=True, help_text="When note was finalized")
    is_signed = models.BooleanField(default=False)
    
    class Meta:
        db_table = 'clinical_notes'
        verbose_name = _('clinical note')
        verbose_name_plural = _('clinical notes')
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Clinical Note - {self.visit.patient.full_name} on {self.created_at.date()}"


class Diagnosis(models.Model):
    """Medical diagnoses"""
    
    visit = models.ForeignKey(Visit, on_delete=models.CASCADE, related_name='diagnoses')
    
    # Diagnosis Information
    diagnosis_code = models.CharField(max_length=20, blank=True, help_text="ICD-10 code")
    diagnosis_name = models.CharField(max_length=500)
    diagnosis_type = models.CharField(
        max_length=20,
        choices=[
            ('primary', 'Primary'),
            ('secondary', 'Secondary'),
            ('differential', 'Differential'),
        ],
        default='primary'
    )
    
    # Details
    description = models.TextField(blank=True)
    severity = models.CharField(
        max_length=20,
        choices=[
            ('mild', 'Mild'),
            ('moderate', 'Moderate'),
            ('severe', 'Severe'),
        ],
        default='moderate'
    )
    
    # Status
    status = models.CharField(
        max_length=20,
        choices=[
            ('active', 'Active'),
            ('resolved', 'Resolved'),
            ('chronic', 'Chronic'),
        ],
        default='active'
    )
    
    diagnosed_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    diagnosed_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'diagnoses'
        verbose_name = _('diagnosis')
        verbose_name_plural = _('diagnoses')
        ordering = ['-diagnosed_at']
    
    def __str__(self):
        return f"{self.diagnosis_name} ({self.diagnosis_type})"


class Prescription(models.Model):
    """Medication prescriptions"""
    
    visit = models.ForeignKey(Visit, on_delete=models.CASCADE, related_name='prescriptions')
    
    # Medication Details
    medication_name = models.CharField(max_length=255)
    generic_name = models.CharField(max_length=255, blank=True)
    dosage = models.CharField(max_length=100, help_text="e.g., 500mg")
    form = models.CharField(
        max_length=50,
        choices=[
            ('tablet', 'Tablet'),
            ('capsule', 'Capsule'),
            ('syrup', 'Syrup'),
            ('injection', 'Injection'),
            ('cream', 'Cream'),
            ('drops', 'Drops'),
            ('inhaler', 'Inhaler'),
            ('other', 'Other'),
        ],
        default='tablet'
    )
    
    # Dosing Instructions
    frequency = models.CharField(max_length=100, help_text="e.g., twice daily")
    route = models.CharField(
        max_length=50,
        choices=[
            ('oral', 'Oral'),
            ('topical', 'Topical'),
            ('intravenous', 'Intravenous'),
            ('intramuscular', 'Intramuscular'),
            ('subcutaneous', 'Subcutaneous'),
            ('inhalation', 'Inhalation'),
            ('other', 'Other'),
        ],
        default='oral'
    )
    duration_days = models.PositiveIntegerField(help_text="Treatment duration in days")
    quantity = models.PositiveIntegerField(help_text="Total quantity prescribed")
    refills = models.PositiveIntegerField(default=0)
    
    # Instructions
    instructions = models.TextField(help_text="Special instructions for patient")
    indication = models.CharField(max_length=500, help_text="Reason for prescription")
    
    # Status
    status = models.CharField(
        max_length=20,
        choices=[
            ('active', 'Active'),
            ('dispensed', 'Dispensed'),
            ('completed', 'Completed'),
            ('cancelled', 'Cancelled'),
        ],
        default='active'
    )
    
    # Metadata
    prescribed_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='prescriptions')
    prescribed_at = models.DateTimeField(auto_now_add=True)
    
    # Dispensing
    dispensed_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='dispensed_prescriptions'
    )
    dispensed_at = models.DateTimeField(null=True, blank=True)
    pharmacy = models.ForeignKey(
        'facilities.Pharmacy',
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )
    
    class Meta:
        db_table = 'prescriptions'
        verbose_name = _('prescription')
        verbose_name_plural = _('prescriptions')
        ordering = ['-prescribed_at']
    
    def __str__(self):
        return f"{self.medication_name} - {self.dosage} ({self.frequency})"


class LabOrder(models.Model):
    """Laboratory test orders"""
    
    visit = models.ForeignKey(Visit, on_delete=models.CASCADE, related_name='lab_orders')
    
    # Test Information
    test_name = models.CharField(max_length=255)
    test_code = models.CharField(max_length=50, blank=True, help_text="Lab test code")
    test_category = models.CharField(
        max_length=100,
        choices=[
            ('hematology', 'Hematology'),
            ('biochemistry', 'Biochemistry'),
            ('microbiology', 'Microbiology'),
            ('immunology', 'Immunology'),
            ('radiology', 'Radiology'),
            ('pathology', 'Pathology'),
            ('other', 'Other'),
        ],
        default='biochemistry'
    )
    
    # Order Details
    priority = models.CharField(
        max_length=20,
        choices=[
            ('routine', 'Routine'),
            ('urgent', 'Urgent'),
            ('stat', 'STAT (Immediate)'),
        ],
        default='routine'
    )
    clinical_indication = models.TextField(help_text="Reason for test")
    special_instructions = models.TextField(blank=True)
    
    # Status Tracking
    status = models.CharField(
        max_length=20,
        choices=[
            ('ordered', 'Ordered'),
            ('sample_collected', 'Sample Collected'),
            ('in_progress', 'In Progress'),
            ('completed', 'Completed'),
            ('cancelled', 'Cancelled'),
        ],
        default='ordered'
    )
    
    # Parties
    ordered_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='lab_orders'
    )
    laboratory = models.ForeignKey(
        'facilities.Laboratory',
        on_delete=models.CASCADE,
        related_name='lab_orders'
    )
    
    # Timestamps
    ordered_at = models.DateTimeField(auto_now_add=True)
    sample_collected_at = models.DateTimeField(null=True, blank=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        db_table = 'lab_orders'
        verbose_name = _('lab order')
        verbose_name_plural = _('lab orders')
        ordering = ['-ordered_at']
    
    def __str__(self):
        return f"{self.test_name} - {self.priority} ({self.status})"


class LabResult(models.Model):
    """Laboratory test results"""
    
    lab_order = models.OneToOneField(LabOrder, on_delete=models.CASCADE, related_name='result')
    
    # Results
    result_value = models.TextField(help_text="Test result value(s)")
    result_unit = models.CharField(max_length=50, blank=True)
    reference_range = models.CharField(max_length=255, blank=True)
    
    # Interpretation
    is_abnormal = models.BooleanField(default=False)
    abnormal_flag = models.CharField(
        max_length=10,
        choices=[
            ('normal', 'Normal'),
            ('high', 'High'),
            ('low', 'Low'),
            ('critical', 'Critical'),
        ],
        default='normal'
    )
    interpretation = models.TextField(blank=True)
    
    # Narrative
    narrative_report = models.TextField(blank=True, help_text="Full text report")
    
    # Attachments
    attachments = models.JSONField(
        default=list,
        blank=True,
        help_text="List of Supabase Storage URLs for result documents"
    )
    
    # Metadata
    performed_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name='lab_results_performed'
    )
    reviewed_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='lab_results_reviewed'
    )
    
    performed_at = models.DateTimeField(auto_now_add=True)
    reviewed_at = models.DateTimeField(null=True, blank=True)
    
    is_released = models.BooleanField(default=False)
    released_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        db_table = 'lab_results'
        verbose_name = _('lab result')
        verbose_name_plural = _('lab results')
        ordering = ['-performed_at']
    
    def __str__(self):
        return f"Result for {self.lab_order.test_name} - {self.abnormal_flag}"


class Admission(models.Model):
    """Hospital admission records"""
    
    visit = models.OneToOneField(Visit, on_delete=models.CASCADE, related_name='admission')
    medical_book = models.ForeignKey(MedicalBook, on_delete=models.CASCADE, related_name='admissions')
    
    # Admission Details
    admission_date = models.DateTimeField()
    admission_type = models.CharField(
        max_length=50,
        choices=[
            ('emergency', 'Emergency'),
            ('elective', 'Elective'),
            ('observation', 'Observation'),
            ('day_surgery', 'Day Surgery'),
        ]
    )
    admission_source = models.CharField(
        max_length=50,
        choices=[
            ('emergency', 'Emergency Department'),
            ('outpatient', 'Outpatient'),
            ('transfer', 'Transfer'),
            ('referral', 'Referral'),
        ]
    )
    
    # Ward Assignment
    ward_name = models.CharField(max_length=255)
    room_number = models.CharField(max_length=50, blank=True)
    bed_number = models.CharField(max_length=50)
    
    # Medical Team
    admitting_doctor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='admissions_admitted'
    )
    attending_doctor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='admissions_attending'
    )
    
    # Admission Diagnosis
    chief_complaint = models.TextField()
    admitting_diagnosis = models.TextField()
    
    # Discharge
    discharge_date = models.DateTimeField(null=True, blank=True)
    discharge_type = models.CharField(
        max_length=50,
        choices=[
            ('routine', 'Routine'),
            ('against_advice', 'Against Medical Advice'),
            ('transfer', 'Transfer'),
            ('deceased', 'Deceased'),
        ],
        blank=True
    )
    discharge_disposition = models.CharField(
        max_length=50,
        choices=[
            ('home', 'Home'),
            ('home_health', 'Home with Health Services'),
            ('rehab', 'Rehabilitation Facility'),
            ('nursing', 'Nursing Home'),
            ('other', 'Other'),
        ],
        blank=True
    )
    discharge_summary = models.TextField(blank=True)
    discharge_instructions = models.TextField(blank=True)
    
    # Status
    status = models.CharField(
        max_length=20,
        choices=[
            ('active', 'Active'),
            ('discharged', 'Discharged'),
        ],
        default='active'
    )
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'admissions'
        verbose_name = _('admission')
        verbose_name_plural = _('admissions')
        ordering = ['-admission_date']
    
    def __str__(self):
        return f"Admission - {self.visit.patient.full_name} on {self.admission_date.date()}"


class Document(models.Model):
    """Medical documents and attachments"""
    
    medical_book = models.ForeignKey(MedicalBook, on_delete=models.CASCADE, related_name='documents')
    visit = models.ForeignKey(Visit, on_delete=models.CASCADE, null=True, blank=True, related_name='documents')
    
    # Document Information
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    document_type = models.CharField(
        max_length=50,
        choices=[
            ('lab_report', 'Lab Report'),
            ('radiology', 'Radiology Image'),
            ('prescription', 'Prescription'),
            ('discharge_summary', 'Discharge Summary'),
            ('consent_form', 'Consent Form'),
            ('insurance', 'Insurance Document'),
            ('other', 'Other'),
        ]
    )
    
    # File Information
    file_url = models.URLField(help_text="Supabase Storage URL")
    file_name = models.CharField(max_length=255)
    file_size = models.PositiveIntegerField(help_text="File size in bytes")
    mime_type = models.CharField(max_length=100)
    
    # Metadata
    uploaded_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name='uploaded_documents'
    )
    uploaded_at = models.DateTimeField(auto_now_add=True)
    
    # Access Control
    is_patient_visible = models.BooleanField(default=True)
    is_confidential = models.BooleanField(default=False)
    
    class Meta:
        db_table = 'medical_documents'
        verbose_name = _('document')
        verbose_name_plural = _('documents')
        ordering = ['-uploaded_at']
    
    def __str__(self):
        return f"{self.title} ({self.document_type})"
