from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from .views import health, health_detailed

urlpatterns = [
    path("health/", health, name="health"),
    path("health/detailed/", health_detailed, name="health-detailed"),
    
    # JWT Authentication
    path("auth/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("auth/token/verify/", TokenVerifyView.as_view(), name="token_verify"),
    
    # Accounts (registration, profiles, role management)
    path("accounts/", include('accounts.urls')),
    
    # Facilities (hospitals, pharmacies, labs, appointments)
    path("facilities/", include('facilities.urls')),
    
    # Medical Records (visits, prescriptions, lab orders, etc.)
    path("medical-records/", include('medical_records.urls')),
    
    # Notifications (realtime notifications and preferences)
    path("notifications/", include('notifications.urls')),
    
    # QR Code Access (secure medical record sharing)
    path("qr/", include('qr_access.urls')),
]
