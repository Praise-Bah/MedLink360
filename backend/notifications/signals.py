from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from django.utils import timezone
from .models import Notification, NotificationPreference
from facilities.models import Appointment
from medical_records.models import Prescription, LabOrder, LabResult, Admission


def create_notification(recipient, notification_type, title, message, **kwargs):
    """Helper function to create notifications"""
    # Get or create user preferences
    prefs, _ = NotificationPreference.objects.get_or_create(user=recipient)
    
    # Check if user has this notification type enabled
    if not prefs.is_type_enabled(notification_type):
        return None
    
    # Check quiet hours
    if prefs.is_in_quiet_hours() and kwargs.get('priority', 'normal') not in ['high', 'urgent']:
        return None
    
    # Create notification
    notification = Notification.objects.create(
        recipient=recipient,
        notification_type=notification_type,
        title=title,
        message=message,
        **kwargs
    )
    
    return notification


# Appointment notifications
@receiver(post_save, sender=Appointment)
def appointment_notification(sender, instance, created, **kwargs):
    """Send notifications for appointment events"""
    
    if created:
        # Notify patient
        create_notification(
            recipient=instance.patient,
            notification_type='appointment_created',
            title='Appointment Scheduled',
            message=f'Your appointment with Dr. {instance.doctor.full_name} on {instance.appointment_date} at {instance.appointment_time} has been scheduled.',
            priority='normal',
            related_object_type='Appointment',
            related_object_id=instance.id,
            data={
                'appointment_id': instance.id,
                'doctor_name': instance.doctor.full_name,
                'date': str(instance.appointment_date),
                'time': str(instance.appointment_time),
                'hospital': instance.hospital.name,
            },
            action_url=f'/appointments/{instance.id}/',
            action_label='View Appointment'
        )
        
        # Notify doctor
        create_notification(
            recipient=instance.doctor,
            notification_type='appointment_created',
            title='New Appointment',
            message=f'New appointment with {instance.patient.full_name} on {instance.appointment_date} at {instance.appointment_time}.',
            priority='normal',
            related_object_type='Appointment',
            related_object_id=instance.id,
            data={
                'appointment_id': instance.id,
                'patient_name': instance.patient.full_name,
                'date': str(instance.appointment_date),
                'time': str(instance.appointment_time),
            },
            action_url=f'/appointments/{instance.id}/',
            action_label='View Appointment'
        )
    else:
        # Check if status changed
        try:
            old_instance = Appointment.objects.get(pk=instance.pk)
        except Appointment.DoesNotExist:
            return
        
        if hasattr(old_instance, '_state') and old_instance.status != instance.status:
            if instance.status == 'confirmed':
                create_notification(
                    recipient=instance.patient,
                    notification_type='appointment_confirmed',
                    title='Appointment Confirmed',
                    message=f'Your appointment with Dr. {instance.doctor.full_name} on {instance.appointment_date} has been confirmed.',
                    priority='normal',
                    related_object_type='Appointment',
                    related_object_id=instance.id,
                    data={'appointment_id': instance.id},
                    action_url=f'/appointments/{instance.id}/',
                    action_label='View Details'
                )
            
            elif instance.status == 'cancelled':
                create_notification(
                    recipient=instance.patient,
                    notification_type='appointment_cancelled',
                    title='Appointment Cancelled',
                    message=f'Your appointment with Dr. {instance.doctor.full_name} on {instance.appointment_date} has been cancelled.',
                    priority='high',
                    related_object_type='Appointment',
                    related_object_id=instance.id,
                    data={'appointment_id': instance.id, 'reason': instance.cancellation_reason},
                    action_url='/appointments/',
                    action_label='View Appointments'
                )


# Prescription notifications
@receiver(post_save, sender=Prescription)
def prescription_notification(sender, instance, created, **kwargs):
    """Send notifications for prescription events"""
    
    if created:
        # Notify patient
        create_notification(
            recipient=instance.visit.patient,
            notification_type='prescription_created',
            title='New Prescription',
            message=f'Dr. {instance.prescribed_by.full_name} prescribed {instance.medication_name} {instance.dosage}.',
            priority='normal',
            related_object_type='Prescription',
            related_object_id=instance.id,
            data={
                'prescription_id': instance.id,
                'medication': instance.medication_name,
                'dosage': instance.dosage,
                'instructions': instance.instructions,
            },
            action_url=f'/prescriptions/{instance.id}/',
            action_label='View Prescription'
        )
    else:
        # Check if dispensed
        try:
            old_instance = Prescription.objects.get(pk=instance.pk)
        except Prescription.DoesNotExist:
            return
        
        if old_instance.status != 'dispensed' and instance.status == 'dispensed':
            create_notification(
                recipient=instance.visit.patient,
                notification_type='prescription_dispensed',
                title='Prescription Dispensed',
                message=f'Your prescription for {instance.medication_name} has been dispensed at {instance.pharmacy.name if instance.pharmacy else "pharmacy"}.',
                priority='normal',
                related_object_type='Prescription',
                related_object_id=instance.id,
                data={
                    'prescription_id': instance.id,
                    'medication': instance.medication_name,
                    'pharmacy': instance.pharmacy.name if instance.pharmacy else None,
                },
                action_url=f'/prescriptions/{instance.id}/',
                action_label='View Details'
            )


# Lab order and result notifications
@receiver(post_save, sender=LabOrder)
def lab_order_notification(sender, instance, created, **kwargs):
    """Send notifications for lab order events"""
    
    if created:
        # Notify patient
        create_notification(
            recipient=instance.visit.patient,
            notification_type='lab_order_created',
            title='Lab Test Ordered',
            message=f'Dr. {instance.ordered_by.full_name} ordered {instance.test_name} test.',
            priority='normal',
            related_object_type='LabOrder',
            related_object_id=instance.id,
            data={
                'order_id': instance.id,
                'test_name': instance.test_name,
                'laboratory': instance.laboratory.name,
                'priority': instance.priority,
            },
            action_url=f'/lab-orders/{instance.id}/',
            action_label='View Order'
        )


@receiver(post_save, sender=LabResult)
def lab_result_notification(sender, instance, created, **kwargs):
    """Send notifications for lab result events"""
    
    if instance.is_released:
        patient = instance.lab_order.visit.patient
        doctor = instance.lab_order.ordered_by
        
        # Determine notification type and priority based on result
        if instance.is_abnormal and instance.abnormal_flag == 'critical':
            notif_type = 'lab_result_abnormal'
            priority = 'urgent'
            title = 'Critical Lab Result'
            message = f'URGENT: Your {instance.lab_order.test_name} result is critical. Please contact your doctor immediately.'
        elif instance.is_abnormal:
            notif_type = 'lab_result_abnormal'
            priority = 'high'
            title = 'Abnormal Lab Result'
            message = f'Your {instance.lab_order.test_name} result is abnormal. Please review with your doctor.'
        else:
            notif_type = 'lab_result_ready'
            priority = 'normal'
            title = 'Lab Result Ready'
            message = f'Your {instance.lab_order.test_name} result is now available.'
        
        # Notify patient
        create_notification(
            recipient=patient,
            notification_type=notif_type,
            title=title,
            message=message,
            priority=priority,
            related_object_type='LabResult',
            related_object_id=instance.id,
            data={
                'result_id': instance.id,
                'order_id': instance.lab_order.id,
                'test_name': instance.lab_order.test_name,
                'abnormal_flag': instance.abnormal_flag,
            },
            action_url=f'/lab-results/{instance.id}/',
            action_label='View Result'
        )
        
        # Notify ordering doctor
        create_notification(
            recipient=doctor,
            notification_type=notif_type,
            title=f'Lab Result: {instance.lab_order.test_name}',
            message=f'Result for {patient.full_name} - {instance.lab_order.test_name} is ready. Status: {instance.abnormal_flag}',
            priority=priority,
            related_object_type='LabResult',
            related_object_id=instance.id,
            data={
                'result_id': instance.id,
                'patient_name': patient.full_name,
                'test_name': instance.lab_order.test_name,
            },
            action_url=f'/lab-results/{instance.id}/',
            action_label='Review Result'
        )


# Admission notifications
@receiver(post_save, sender=Admission)
def admission_notification(sender, instance, created, **kwargs):
    """Send notifications for admission events"""
    
    if created:
        # Notify patient
        create_notification(
            recipient=instance.visit.patient,
            notification_type='admission_created',
            title='Hospital Admission',
            message=f'You have been admitted to {instance.ward_name}, Bed {instance.bed_number}.',
            priority='high',
            related_object_type='Admission',
            related_object_id=instance.id,
            data={
                'admission_id': instance.id,
                'ward': instance.ward_name,
                'bed': instance.bed_number,
                'admitting_doctor': instance.admitting_doctor.full_name,
            },
            action_url=f'/admissions/{instance.id}/',
            action_label='View Details'
        )
    else:
        # Check if discharged
        try:
            old_instance = Admission.objects.get(pk=instance.pk)
        except Admission.DoesNotExist:
            return
        
        if old_instance.status == 'active' and instance.status == 'discharged':
            create_notification(
                recipient=instance.visit.patient,
                notification_type='discharge_ready',
                title='Discharge Instructions',
                message='You have been discharged. Please review your discharge instructions and follow-up appointments.',
                priority='high',
                related_object_type='Admission',
                related_object_id=instance.id,
                data={
                    'admission_id': instance.id,
                    'discharge_summary': instance.discharge_summary,
                },
                action_url=f'/admissions/{instance.id}/',
                action_label='View Instructions'
            )


# User registration - create default preferences
@receiver(post_save, sender='accounts.User')
def create_notification_preferences(sender, instance, created, **kwargs):
    """Create default notification preferences for new users"""
    if created:
        NotificationPreference.objects.get_or_create(user=instance)
