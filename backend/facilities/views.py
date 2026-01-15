from rest_framework import generics, status, permissions, filters
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend
from django.utils import timezone
from drf_spectacular.utils import extend_schema

from .models import (
    Hospital, Pharmacy, Laboratory, FacilityStaff,
    DoctorSchedule, Appointment
)
from .serializers import (
    HospitalSerializer, HospitalListSerializer,
    PharmacySerializer, PharmacyListSerializer,
    LaboratorySerializer, LaboratoryListSerializer,
    FacilityStaffSerializer, DoctorScheduleSerializer,
    AppointmentSerializer, AppointmentCreateSerializer,
    AppointmentListSerializer, AppointmentCancelSerializer
)


# Hospital Views

class HospitalListCreateView(generics.ListCreateAPIView):
    """
    List all hospitals or create a new hospital.
    """
    queryset = Hospital.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'city', 'state', 'is_active', 'emergency_services']
    search_fields = ['name', 'city', 'state', 'specialties']
    ordering_fields = ['name', 'created_at', 'city']
    ordering = ['-created_at']
    
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return HospitalListSerializer
        return HospitalSerializer
    
    def get_permissions(self):
        if self.request.method == 'POST':
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class HospitalDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a hospital.
    """
    queryset = Hospital.objects.all()
    serializer_class = HospitalSerializer
    
    def get_permissions(self):
        if self.request.method == 'GET':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]


# Pharmacy Views

class PharmacyListCreateView(generics.ListCreateAPIView):
    """
    List all pharmacies or create a new pharmacy.
    """
    queryset = Pharmacy.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'city', 'state', 'is_active', 'is_24_hours']
    search_fields = ['name', 'city', 'state']
    ordering_fields = ['name', 'created_at', 'city']
    ordering = ['-created_at']
    
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return PharmacyListSerializer
        return PharmacySerializer
    
    def get_permissions(self):
        if self.request.method == 'POST':
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class PharmacyDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a pharmacy.
    """
    queryset = Pharmacy.objects.all()
    serializer_class = PharmacySerializer
    
    def get_permissions(self):
        if self.request.method == 'GET':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]


# Laboratory Views

class LaboratoryListCreateView(generics.ListCreateAPIView):
    """
    List all laboratories or create a new laboratory.
    """
    queryset = Laboratory.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'city', 'state', 'is_active', 'has_mobile_collection']
    search_fields = ['name', 'city', 'state', 'tests_offered']
    ordering_fields = ['name', 'created_at', 'city']
    ordering = ['-created_at']
    
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return LaboratoryListSerializer
        return LaboratorySerializer
    
    def get_permissions(self):
        if self.request.method == 'POST':
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class LaboratoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a laboratory.
    """
    queryset = Laboratory.objects.all()
    serializer_class = LaboratorySerializer
    
    def get_permissions(self):
        if self.request.method == 'GET':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]


# Facility Staff Views

class FacilityStaffListCreateView(generics.ListCreateAPIView):
    """
    List all facility staff or add new staff member.
    """
    serializer_class = FacilityStaffSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['role', 'is_active', 'hospital', 'pharmacy', 'laboratory']
    search_fields = ['user__email', 'user__first_name', 'user__last_name', 'position_title']
    
    def get_queryset(self):
        return FacilityStaff.objects.select_related('user', 'hospital', 'pharmacy', 'laboratory')


class FacilityStaffDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete facility staff member.
    """
    queryset = FacilityStaff.objects.all()
    serializer_class = FacilityStaffSerializer
    permission_classes = [permissions.IsAuthenticated]


# Doctor Schedule Views

class DoctorScheduleListCreateView(generics.ListCreateAPIView):
    """
    List doctor schedules or create new schedule.
    """
    serializer_class = DoctorScheduleSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['doctor', 'hospital', 'day_of_week', 'is_active']
    
    def get_queryset(self):
        return DoctorSchedule.objects.select_related('doctor', 'hospital')


class DoctorScheduleDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete doctor schedule.
    """
    queryset = DoctorSchedule.objects.all()
    serializer_class = DoctorScheduleSerializer
    permission_classes = [permissions.IsAuthenticated]


# Appointment Views

class AppointmentListCreateView(generics.ListCreateAPIView):
    """
    List appointments or create new appointment.
    """
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['status', 'appointment_type', 'doctor', 'hospital', 'appointment_date']
    ordering_fields = ['appointment_date', 'appointment_time', 'created_at']
    ordering = ['-appointment_date', '-appointment_time']
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return AppointmentCreateSerializer
        return AppointmentListSerializer
    
    def get_queryset(self):
        user = self.request.user
        queryset = Appointment.objects.select_related('patient', 'doctor', 'hospital')
        
        # Filter based on user's role
        if hasattr(user, 'patient_profile'):
            # Patients see their own appointments
            return queryset.filter(patient=user)
        elif hasattr(user, 'doctor_profile'):
            # Doctors see their appointments
            return queryset.filter(doctor=user)
        elif hasattr(user, 'facility_admin_profile'):
            # Hospital admins see appointments at their facilities
            admin_hospitals = FacilityStaff.objects.filter(
                user=user,
                role='admin',
                is_active=True
            ).values_list('hospital_id', flat=True)
            return queryset.filter(hospital_id__in=admin_hospitals)
        
        return queryset.none()


class AppointmentDetailView(generics.RetrieveUpdateAPIView):
    """
    Retrieve or update appointment.
    """
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]


class AppointmentCancelView(APIView):
    """
    Cancel an appointment.
    """
    permission_classes = [permissions.IsAuthenticated]
    
    @extend_schema(
        request=AppointmentCancelSerializer,
        responses={200: AppointmentSerializer}
    )
    def post(self, request, pk):
        try:
            appointment = Appointment.objects.get(pk=pk)
        except Appointment.DoesNotExist:
            return Response(
                {'error': 'Appointment not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Check permissions
        if appointment.patient != request.user and appointment.doctor != request.user:
            return Response(
                {'error': 'You do not have permission to cancel this appointment'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        # Check if appointment can be cancelled
        if appointment.status in ['completed', 'cancelled', 'no_show']:
            return Response(
                {'error': f'Cannot cancel appointment with status: {appointment.status}'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Validate cancellation reason
        serializer = AppointmentCancelSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Cancel appointment
        appointment.status = 'cancelled'
        appointment.cancelled_at = timezone.now()
        appointment.cancelled_by = request.user
        appointment.cancellation_reason = serializer.validated_data['cancellation_reason']
        appointment.save()
        
        # Return updated appointment
        response_serializer = AppointmentSerializer(appointment)
        return Response(response_serializer.data)


@extend_schema(
    summary="Get available appointment slots",
    description="Retrieve available appointment slots for a doctor at a hospital on a specific date."
)
@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def available_slots(request):
    """
    Get available appointment slots for a doctor.
    Query params: doctor_id, hospital_id, date (YYYY-MM-DD)
    """
    doctor_id = request.query_params.get('doctor_id')
    hospital_id = request.query_params.get('hospital_id')
    date_str = request.query_params.get('date')
    
    if not all([doctor_id, hospital_id, date_str]):
        return Response(
            {'error': 'doctor_id, hospital_id, and date are required'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        from datetime import datetime, timedelta
        appointment_date = datetime.strptime(date_str, '%Y-%m-%d').date()
        day_of_week = appointment_date.strftime('%A').lower()
        
        # Get doctor's schedule for this day
        schedules = DoctorSchedule.objects.filter(
            doctor_id=doctor_id,
            hospital_id=hospital_id,
            day_of_week=day_of_week,
            is_active=True
        )
        
        if not schedules.exists():
            return Response({'slots': []})
        
        # Get existing appointments
        existing_appointments = Appointment.objects.filter(
            doctor_id=doctor_id,
            hospital_id=hospital_id,
            appointment_date=appointment_date,
            status__in=['scheduled', 'confirmed', 'in_progress']
        ).values_list('appointment_time', flat=True)
        
        # Generate available slots
        available = []
        for schedule in schedules:
            current_time = datetime.combine(appointment_date, schedule.start_time)
            end_time = datetime.combine(appointment_date, schedule.end_time)
            slot_duration = timedelta(minutes=schedule.slot_duration_minutes)
            
            while current_time < end_time:
                slot_time = current_time.time()
                if slot_time not in existing_appointments:
                    available.append({
                        'time': slot_time.strftime('%H:%M'),
                        'duration_minutes': schedule.slot_duration_minutes
                    })
                current_time += slot_duration
        
        return Response({'slots': available})
    
    except ValueError:
        return Response(
            {'error': 'Invalid date format. Use YYYY-MM-DD'},
            status=status.HTTP_400_BAD_REQUEST
        )
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@extend_schema(
    summary="Get user's facilities",
    description="Retrieve all facilities where the user is owner or staff member."
)
@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def my_facilities(request):
    """Get facilities where user is owner or staff"""
    user = request.user
    
    # Owned facilities
    hospitals_owned = Hospital.objects.filter(owner=user)
    pharmacies_owned = Pharmacy.objects.filter(owner=user)
    labs_owned = Laboratory.objects.filter(owner=user)
    
    # Staff facilities
    staff_relations = FacilityStaff.objects.filter(user=user, is_active=True)
    hospitals_staff = Hospital.objects.filter(
        id__in=staff_relations.filter(hospital__isnull=False).values_list('hospital_id', flat=True)
    )
    pharmacies_staff = Pharmacy.objects.filter(
        id__in=staff_relations.filter(pharmacy__isnull=False).values_list('pharmacy_id', flat=True)
    )
    labs_staff = Laboratory.objects.filter(
        id__in=staff_relations.filter(laboratory__isnull=False).values_list('laboratory_id', flat=True)
    )
    
    return Response({
        'owned': {
            'hospitals': HospitalListSerializer(hospitals_owned, many=True).data,
            'pharmacies': PharmacyListSerializer(pharmacies_owned, many=True).data,
            'laboratories': LaboratoryListSerializer(labs_owned, many=True).data,
        },
        'staff': {
            'hospitals': HospitalListSerializer(hospitals_staff, many=True).data,
            'pharmacies': PharmacyListSerializer(pharmacies_staff, many=True).data,
            'laboratories': LaboratoryListSerializer(labs_staff, many=True).data,
        }
    })
