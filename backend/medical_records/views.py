from rest_framework import generics, status, permissions, filters
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend
from django.utils import timezone
from drf_spectacular.utils import extend_schema

from .models import (
    MedicalBook, MedicalBookAccess, Visit, VitalSigns,
    ClinicalNote, Diagnosis, Prescription, LabOrder,
    LabResult, Admission, Document
)
from .serializers import (
    MedicalBookSerializer, MedicalBookDetailSerializer,
    MedicalBookAccessSerializer, VisitSerializer, VisitDetailSerializer,
    VisitCreateSerializer, VitalSignsSerializer, ClinicalNoteSerializer,
    DiagnosisSerializer, PrescriptionSerializer, LabOrderSerializer,
    LabResultSerializer, AdmissionSerializer, DocumentSerializer
)


# Medical Book Views

class MyMedicalBookView(APIView):
    """Get or create current user's medical book"""
    
    permission_classes = [permissions.IsAuthenticated]
    
    @extend_schema(
        summary="Get my medical book",
        description="Retrieve the authenticated user's medical book with recent visits and prescriptions.",
        responses={200: MedicalBookDetailSerializer}
    )
    def get(self, request):
        medical_book, created = MedicalBook.objects.get_or_create(patient=request.user)
        serializer = MedicalBookDetailSerializer(medical_book)
        return Response(serializer.data)
    
    @extend_schema(
        summary="Update my medical book",
        description="Update medical book information like allergies, chronic conditions, etc.",
        request=MedicalBookSerializer,
        responses={200: MedicalBookDetailSerializer}
    )
    def patch(self, request):
        medical_book, created = MedicalBook.objects.get_or_create(patient=request.user)
        serializer = MedicalBookSerializer(medical_book, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        detail_serializer = MedicalBookDetailSerializer(medical_book)
        return Response(detail_serializer.data)


class MedicalBookAccessListView(generics.ListCreateAPIView):
    """Manage access to medical books"""
    
    serializer_class = MedicalBookAccessSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['access_level', 'is_active']
    
    def get_queryset(self):
        # Get access records for current user's medical book
        medical_book = MedicalBook.objects.filter(patient=self.request.user).first()
        if medical_book:
            return MedicalBookAccess.objects.filter(medical_book=medical_book)
        return MedicalBookAccess.objects.none()
    
    def perform_create(self, serializer):
        medical_book, _ = MedicalBook.objects.get_or_create(patient=self.request.user)
        serializer.save(medical_book=medical_book, granted_by=self.request.user)


# Visit Views

class VisitListCreateView(generics.ListCreateAPIView):
    """List visits or create new visit"""
    
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['status', 'visit_type', 'doctor', 'facility', 'visit_date']
    ordering_fields = ['visit_date', 'visit_time', 'created_at']
    ordering = ['-visit_date', '-visit_time']
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return VisitCreateSerializer
        return VisitSerializer
    
    def get_queryset(self):
        user = self.request.user
        
        # Patients see their own visits
        if hasattr(user, 'patient_profile'):
            return Visit.objects.filter(patient=user).select_related('doctor', 'facility')
        
        # Doctors see their appointments
        elif hasattr(user, 'doctor_profile'):
            return Visit.objects.filter(doctor=user).select_related('patient', 'facility')
        
        # Admin can see all visits at their facilities
        elif hasattr(user, 'facility_admin_profile'):
            from facilities.models import FacilityStaff
            admin_hospitals = FacilityStaff.objects.filter(
                user=user,
                role='admin',
                is_active=True
            ).values_list('hospital_id', flat=True)
            return Visit.objects.filter(facility_id__in=admin_hospitals).select_related('patient', 'doctor', 'facility')
        
        return Visit.objects.none()


class VisitDetailView(generics.RetrieveUpdateAPIView):
    """Get or update visit details"""
    
    queryset = Visit.objects.all()
    serializer_class = VisitDetailSerializer
    permission_classes = [permissions.IsAuthenticated]


# Vital Signs Views

class VitalSignsListCreateView(generics.ListCreateAPIView):
    """List or create vital signs"""
    
    serializer_class = VitalSignsSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['visit']
    ordering = ['-recorded_at']
    
    def get_queryset(self):
        user = self.request.user
        # Filter by visits user has access to
        return VitalSigns.objects.filter(
            visit__patient=user
        ).select_related('visit', 'recorded_by')
    
    def perform_create(self, serializer):
        serializer.save(recorded_by=self.request.user)


class VitalSignsDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Get, update or delete vital signs"""
    
    queryset = VitalSigns.objects.all()
    serializer_class = VitalSignsSerializer
    permission_classes = [permissions.IsAuthenticated]


# Clinical Note Views

class ClinicalNoteListCreateView(generics.ListCreateAPIView):
    """List or create clinical notes"""
    
    serializer_class = ClinicalNoteSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['visit', 'note_type', 'is_signed']
    ordering = ['-created_at']
    
    def get_queryset(self):
        user = self.request.user
        # Patients and doctors can see relevant notes
        return ClinicalNote.objects.filter(
            visit__patient=user
        ) | ClinicalNote.objects.filter(doctor=user)
    
    def perform_create(self, serializer):
        serializer.save(doctor=self.request.user)


class ClinicalNoteDetailView(generics.RetrieveUpdateAPIView):
    """Get or update clinical note"""
    
    queryset = ClinicalNote.objects.all()
    serializer_class = ClinicalNoteSerializer
    permission_classes = [permissions.IsAuthenticated]


# Diagnosis Views

class DiagnosisListCreateView(generics.ListCreateAPIView):
    """List or create diagnoses"""
    
    serializer_class = DiagnosisSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['visit', 'diagnosis_type', 'status', 'severity']
    ordering = ['-diagnosed_at']
    
    def get_queryset(self):
        user = self.request.user
        return Diagnosis.objects.filter(visit__patient=user)
    
    def perform_create(self, serializer):
        serializer.save(diagnosed_by=self.request.user)


class DiagnosisDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Get, update or delete diagnosis"""
    
    queryset = Diagnosis.objects.all()
    serializer_class = DiagnosisSerializer
    permission_classes = [permissions.IsAuthenticated]


# Prescription Views

class PrescriptionListCreateView(generics.ListCreateAPIView):
    """List or create prescriptions"""
    
    serializer_class = PrescriptionSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['visit', 'status']
    ordering = ['-prescribed_at']
    
    def get_queryset(self):
        user = self.request.user
        # Patients see their prescriptions
        if hasattr(user, 'patient_profile'):
            return Prescription.objects.filter(visit__patient=user)
        # Doctors see prescriptions they wrote
        elif hasattr(user, 'doctor_profile'):
            return Prescription.objects.filter(prescribed_by=user)
        # Pharmacists see all active prescriptions
        elif hasattr(user, 'pharmacist_profile'):
            return Prescription.objects.filter(status='active')
        return Prescription.objects.none()
    
    def perform_create(self, serializer):
        serializer.save(prescribed_by=self.request.user)


class PrescriptionDetailView(generics.RetrieveUpdateAPIView):
    """Get or update prescription"""
    
    queryset = Prescription.objects.all()
    serializer_class = PrescriptionSerializer
    permission_classes = [permissions.IsAuthenticated]


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def dispense_prescription(request, pk):
    """Mark prescription as dispensed"""
    try:
        prescription = Prescription.objects.get(pk=pk)
    except Prescription.DoesNotExist:
        return Response({'error': 'Prescription not found'}, status=status.HTTP_404_NOT_FOUND)
    
    if prescription.status != 'active':
        return Response(
            {'error': f'Cannot dispense prescription with status: {prescription.status}'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    prescription.status = 'dispensed'
    prescription.dispensed_by = request.user
    prescription.dispensed_at = timezone.now()
    prescription.save()
    
    serializer = PrescriptionSerializer(prescription)
    return Response(serializer.data)


# Lab Order Views

class LabOrderListCreateView(generics.ListCreateAPIView):
    """List or create lab orders"""
    
    serializer_class = LabOrderSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['visit', 'status', 'priority', 'test_category', 'laboratory']
    ordering = ['-ordered_at']
    
    def get_queryset(self):
        user = self.request.user
        # Patients see their orders
        if hasattr(user, 'patient_profile'):
            return LabOrder.objects.filter(visit__patient=user)
        # Doctors see orders they made
        elif hasattr(user, 'doctor_profile'):
            return LabOrder.objects.filter(ordered_by=user)
        # Lab techs see orders for their lab
        elif hasattr(user, 'lab_tech_profile'):
            from facilities.models import FacilityStaff
            user_labs = FacilityStaff.objects.filter(
                user=user,
                role='lab_technician',
                is_active=True
            ).values_list('laboratory_id', flat=True)
            return LabOrder.objects.filter(laboratory_id__in=user_labs)
        return LabOrder.objects.none()
    
    def perform_create(self, serializer):
        serializer.save(ordered_by=self.request.user)


class LabOrderDetailView(generics.RetrieveUpdateAPIView):
    """Get or update lab order"""
    
    queryset = LabOrder.objects.all()
    serializer_class = LabOrderSerializer
    permission_classes = [permissions.IsAuthenticated]


# Lab Result Views

class LabResultListCreateView(generics.ListCreateAPIView):
    """List or create lab results"""
    
    serializer_class = LabResultSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['abnormal_flag', 'is_released']
    ordering = ['-performed_at']
    
    def get_queryset(self):
        user = self.request.user
        # Patients see their results (if released)
        if hasattr(user, 'patient_profile'):
            return LabResult.objects.filter(
                lab_order__visit__patient=user,
                is_released=True
            )
        # Doctors see results for their patients
        elif hasattr(user, 'doctor_profile'):
            return LabResult.objects.filter(lab_order__ordered_by=user)
        # Lab techs see all results from their lab
        elif hasattr(user, 'lab_tech_profile'):
            from facilities.models import FacilityStaff
            user_labs = FacilityStaff.objects.filter(
                user=user,
                role='lab_technician',
                is_active=True
            ).values_list('laboratory_id', flat=True)
            return LabResult.objects.filter(lab_order__laboratory_id__in=user_labs)
        return LabResult.objects.none()
    
    def perform_create(self, serializer):
        serializer.save(performed_by=self.request.user)


class LabResultDetailView(generics.RetrieveUpdateAPIView):
    """Get or update lab result"""
    
    queryset = LabResult.objects.all()
    serializer_class = LabResultSerializer
    permission_classes = [permissions.IsAuthenticated]


# Admission Views

class AdmissionListCreateView(generics.ListCreateAPIView):
    """List or create admissions"""
    
    serializer_class = AdmissionSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['status', 'admission_type']
    ordering = ['-admission_date']
    
    def get_queryset(self):
        user = self.request.user
        # Patients see their admissions
        if hasattr(user, 'patient_profile'):
            return Admission.objects.filter(visit__patient=user)
        # Doctors see admissions they manage
        elif hasattr(user, 'doctor_profile'):
            return Admission.objects.filter(admitting_doctor=user) | Admission.objects.filter(attending_doctor=user)
        return Admission.objects.none()


class AdmissionDetailView(generics.RetrieveUpdateAPIView):
    """Get or update admission"""
    
    queryset = Admission.objects.all()
    serializer_class = AdmissionSerializer
    permission_classes = [permissions.IsAuthenticated]


# Document Views

class DocumentListCreateView(generics.ListCreateAPIView):
    """List or create medical documents"""
    
    serializer_class = DocumentSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['document_type', 'visit', 'is_patient_visible']
    ordering = ['-uploaded_at']
    
    def get_queryset(self):
        user = self.request.user
        medical_book = MedicalBook.objects.filter(patient=user).first()
        if medical_book:
            return Document.objects.filter(
                medical_book=medical_book,
                is_patient_visible=True
            )
        return Document.objects.none()
    
    def perform_create(self, serializer):
        medical_book, _ = MedicalBook.objects.get_or_create(patient=self.request.user)
        serializer.save(medical_book=medical_book, uploaded_by=self.request.user)


class DocumentDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Get, update or delete document"""
    
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    permission_classes = [permissions.IsAuthenticated]


# Utility Views

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def medical_summary(request):
    """Get complete medical summary for patient"""
    
    medical_book = MedicalBook.objects.filter(patient=request.user).first()
    if not medical_book:
        return Response({'error': 'Medical book not found'}, status=status.HTTP_404_NOT_FOUND)
    
    # Get recent data
    recent_visits = Visit.objects.filter(medical_book=medical_book).order_by('-visit_date')[:10]
    active_prescriptions = Prescription.objects.filter(
        visit__medical_book=medical_book,
        status='active'
    )
    active_diagnoses = Diagnosis.objects.filter(
        visit__medical_book=medical_book,
        status='active'
    )
    pending_lab_orders = LabOrder.objects.filter(
        visit__medical_book=medical_book,
        status__in=['ordered', 'sample_collected', 'in_progress']
    )
    
    return Response({
        'medical_book': MedicalBookSerializer(medical_book).data,
        'recent_visits': VisitSerializer(recent_visits, many=True).data,
        'active_prescriptions': PrescriptionSerializer(active_prescriptions, many=True).data,
        'active_diagnoses': DiagnosisSerializer(active_diagnoses, many=True).data,
        'pending_lab_orders': LabOrderSerializer(pending_lab_orders, many=True).data,
    })
