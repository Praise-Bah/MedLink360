from django.urls import path
from .views import (
    # Medical Book
    MyMedicalBookView, MedicalBookAccessListView,
    # Visits
    VisitListCreateView, VisitDetailView,
    # Vital Signs
    VitalSignsListCreateView, VitalSignsDetailView,
    # Clinical Notes
    ClinicalNoteListCreateView, ClinicalNoteDetailView,
    # Diagnoses
    DiagnosisListCreateView, DiagnosisDetailView,
    # Prescriptions
    PrescriptionListCreateView, PrescriptionDetailView, dispense_prescription,
    # Lab Orders & Results
    LabOrderListCreateView, LabOrderDetailView,
    LabResultListCreateView, LabResultDetailView,
    # Admissions
    AdmissionListCreateView, AdmissionDetailView,
    # Documents
    DocumentListCreateView, DocumentDetailView,
    # Utility
    medical_summary
)

app_name = 'medical_records'

urlpatterns = [
    # Medical Book
    path('my-medical-book/', MyMedicalBookView.as_view(), name='my-medical-book'),
    path('medical-book-access/', MedicalBookAccessListView.as_view(), name='medical-book-access'),
    
    # Visits
    path('visits/', VisitListCreateView.as_view(), name='visit-list'),
    path('visits/<int:pk>/', VisitDetailView.as_view(), name='visit-detail'),
    
    # Vital Signs
    path('vital-signs/', VitalSignsListCreateView.as_view(), name='vital-signs-list'),
    path('vital-signs/<int:pk>/', VitalSignsDetailView.as_view(), name='vital-signs-detail'),
    
    # Clinical Notes
    path('clinical-notes/', ClinicalNoteListCreateView.as_view(), name='clinical-note-list'),
    path('clinical-notes/<int:pk>/', ClinicalNoteDetailView.as_view(), name='clinical-note-detail'),
    
    # Diagnoses
    path('diagnoses/', DiagnosisListCreateView.as_view(), name='diagnosis-list'),
    path('diagnoses/<int:pk>/', DiagnosisDetailView.as_view(), name='diagnosis-detail'),
    
    # Prescriptions
    path('prescriptions/', PrescriptionListCreateView.as_view(), name='prescription-list'),
    path('prescriptions/<int:pk>/', PrescriptionDetailView.as_view(), name='prescription-detail'),
    path('prescriptions/<int:pk>/dispense/', dispense_prescription, name='dispense-prescription'),
    
    # Lab Orders
    path('lab-orders/', LabOrderListCreateView.as_view(), name='lab-order-list'),
    path('lab-orders/<int:pk>/', LabOrderDetailView.as_view(), name='lab-order-detail'),
    
    # Lab Results
    path('lab-results/', LabResultListCreateView.as_view(), name='lab-result-list'),
    path('lab-results/<int:pk>/', LabResultDetailView.as_view(), name='lab-result-detail'),
    
    # Admissions
    path('admissions/', AdmissionListCreateView.as_view(), name='admission-list'),
    path('admissions/<int:pk>/', AdmissionDetailView.as_view(), name='admission-detail'),
    
    # Documents
    path('documents/', DocumentListCreateView.as_view(), name='document-list'),
    path('documents/<int:pk>/', DocumentDetailView.as_view(), name='document-detail'),
    
    # Utility
    path('medical-summary/', medical_summary, name='medical-summary'),
]
