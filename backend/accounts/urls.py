from django.urls import path
from .views import (
    RegisterView, whoami, RoleSwitchView, UserProfileView, UserRolesView,
    PatientProfileView, DoctorProfileView, NurseProfileView,
    PharmacistProfileView, LabTechnicianProfileView, FacilityAdminProfileView,
    AdminInvitationListCreateView, AdminInvitationDetailView,
    AdminInvitationRevokeView, AdminInvitationVerifyView,
    AdminInvitationAcceptView, AdminInvitationResendView
)

app_name = 'accounts'

urlpatterns = [
    # Authentication & user management
    path('register/', RegisterView.as_view(), name='register'),
    path('whoami/', whoami, name='whoami'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('roles/', UserRolesView.as_view(), name='user-roles'),
    path('switch-role/', RoleSwitchView.as_view(), name='switch-role'),
    
    # Role-specific profiles
    path('profiles/patient/', PatientProfileView.as_view(), name='patient-profile'),
    path('profiles/doctor/', DoctorProfileView.as_view(), name='doctor-profile'),
    path('profiles/nurse/', NurseProfileView.as_view(), name='nurse-profile'),
    path('profiles/pharmacist/', PharmacistProfileView.as_view(), name='pharmacist-profile'),
    path('profiles/lab-tech/', LabTechnicianProfileView.as_view(), name='lab-tech-profile'),
    path('profiles/facility-admin/', FacilityAdminProfileView.as_view(), name='facility-admin-profile'),
    
    # Admin Invitations (MoH admin access)
    path('invitations/', AdminInvitationListCreateView.as_view(), name='invitation-list-create'),
    path('invitations/<int:pk>/', AdminInvitationDetailView.as_view(), name='invitation-detail'),
    path('invitations/revoke/', AdminInvitationRevokeView.as_view(), name='invitation-revoke'),
    path('invitations/<int:pk>/resend/', AdminInvitationResendView.as_view(), name='invitation-resend'),
    
    # Public invitation endpoints (for invitees)
    path('invitations/verify/', AdminInvitationVerifyView.as_view(), name='invitation-verify'),
    path('invitations/accept/', AdminInvitationAcceptView.as_view(), name='invitation-accept'),
]
