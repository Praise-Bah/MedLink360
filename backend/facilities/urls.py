from django.urls import path
from .views import (
    # Hospitals
    HospitalListCreateView, HospitalDetailView,
    # Pharmacies
    PharmacyListCreateView, PharmacyDetailView,
    # Laboratories
    LaboratoryListCreateView, LaboratoryDetailView,
    # Facility Staff
    FacilityStaffListCreateView, FacilityStaffDetailView,
    # Doctor Schedules
    DoctorScheduleListCreateView, DoctorScheduleDetailView,
    # Appointments
    AppointmentListCreateView, AppointmentDetailView, AppointmentCancelView,
    # Utility endpoints
    available_slots, my_facilities
)

app_name = 'facilities'

urlpatterns = [
    # Hospitals
    path('hospitals/', HospitalListCreateView.as_view(), name='hospital-list'),
    path('hospitals/<int:pk>/', HospitalDetailView.as_view(), name='hospital-detail'),
    
    # Pharmacies
    path('pharmacies/', PharmacyListCreateView.as_view(), name='pharmacy-list'),
    path('pharmacies/<int:pk>/', PharmacyDetailView.as_view(), name='pharmacy-detail'),
    
    # Laboratories
    path('laboratories/', LaboratoryListCreateView.as_view(), name='laboratory-list'),
    path('laboratories/<int:pk>/', LaboratoryDetailView.as_view(), name='laboratory-detail'),
    
    # Facility Staff
    path('staff/', FacilityStaffListCreateView.as_view(), name='staff-list'),
    path('staff/<int:pk>/', FacilityStaffDetailView.as_view(), name='staff-detail'),
    
    # Doctor Schedules
    path('schedules/', DoctorScheduleListCreateView.as_view(), name='schedule-list'),
    path('schedules/<int:pk>/', DoctorScheduleDetailView.as_view(), name='schedule-detail'),
    
    # Appointments
    path('appointments/', AppointmentListCreateView.as_view(), name='appointment-list'),
    path('appointments/<int:pk>/', AppointmentDetailView.as_view(), name='appointment-detail'),
    path('appointments/<int:pk>/cancel/', AppointmentCancelView.as_view(), name='appointment-cancel'),
    path('appointments/available-slots/', available_slots, name='available-slots'),
    
    # Utility
    path('my-facilities/', my_facilities, name='my-facilities'),
]
