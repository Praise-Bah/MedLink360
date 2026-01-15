from rest_framework import generics, status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from drf_spectacular.utils import extend_schema

from .serializers import (
    UserSerializer, UserRegistrationSerializer, RoleSwitchSerializer,
    UserDetailSerializer, RoleSerializer, PatientProfileSerializer,
    DoctorProfileSerializer, NurseProfileSerializer, PharmacistProfileSerializer,
    LabTechnicianProfileSerializer, FacilityAdminProfileSerializer
)
from .models import Role, PatientProfile, DoctorProfile, NurseProfile, PharmacistProfile, LabTechnicianProfile, FacilityAdminProfile

User = get_user_model()


class RegisterView(generics.CreateAPIView):
    """
    User registration endpoint with role selection.
    
    Patients are auto-verified, professional roles require verification.
    """
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = UserRegistrationSerializer
    
    @extend_schema(
        summary="Register new user",
        description="Register a new user with a role. Patients are auto-verified, while professional roles (doctor, nurse, etc.) require admin verification.",
        responses={201: UserDetailSerializer}
    )
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        # Return detailed user info
        detail_serializer = UserDetailSerializer(user)
        return Response(detail_serializer.data, status=status.HTTP_201_CREATED)


@extend_schema(
    summary="Get current user info",
    description="Retrieve detailed information about the currently authenticated user including all roles and profiles.",
    responses={200: UserDetailSerializer}
)
@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def whoami(request):
    """Get current user information"""
    serializer = UserDetailSerializer(request.user)
    return Response(serializer.data)


class RoleSwitchView(APIView):
    """Switch active role for multi-role users"""
    
    permission_classes = [permissions.IsAuthenticated]
    
    @extend_schema(
        summary="Switch active role",
        description="Switch the active role for users with multiple roles. The user must have the specified role and it must be active.",
        request=RoleSwitchSerializer,
        responses={200: UserSerializer}
    )
    def post(self, request):
        serializer = RoleSwitchSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        
        # Update active role
        request.user.active_role = serializer.validated_data['role_type']
        request.user.save()
        
        # Return updated user info
        user_serializer = UserSerializer(request.user)
        return Response(user_serializer.data)


class UserProfileView(generics.RetrieveUpdateAPIView):
    """Get and update user profile"""
    
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer
    
    def get_object(self):
        return self.request.user
    
    @extend_schema(
        summary="Get user profile",
        description="Retrieve the authenticated user's profile information.",
        responses={200: UserSerializer}
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)
    
    @extend_schema(
        summary="Update user profile",
        description="Update the authenticated user's profile information.",
        responses={200: UserSerializer}
    )
    def patch(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)


class UserRolesView(generics.ListAPIView):
    """List all roles for the authenticated user"""
    
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = RoleSerializer
    
    def get_queryset(self):
        return Role.objects.filter(user=self.request.user)
    
    @extend_schema(
        summary="List user roles",
        description="Retrieve all roles associated with the authenticated user.",
        responses={200: RoleSerializer(many=True)}
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)


# Profile-specific views

class PatientProfileView(generics.RetrieveUpdateAPIView):
    """Get and update patient profile"""
    
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PatientProfileSerializer
    
    def get_object(self):
        return PatientProfile.objects.get(user=self.request.user)
    
    @extend_schema(
        summary="Get patient profile",
        description="Retrieve the authenticated user's patient profile.",
        responses={200: PatientProfileSerializer}
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)
    
    @extend_schema(
        summary="Update patient profile",
        description="Update the authenticated user's patient profile.",
        responses={200: PatientProfileSerializer}
    )
    def patch(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)


class DoctorProfileView(generics.RetrieveUpdateAPIView):
    """Get and update doctor profile"""
    
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = DoctorProfileSerializer
    
    def get_object(self):
        return DoctorProfile.objects.get(user=self.request.user)
    
    @extend_schema(
        summary="Get doctor profile",
        description="Retrieve the authenticated user's doctor profile.",
        responses={200: DoctorProfileSerializer}
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)
    
    @extend_schema(
        summary="Update doctor profile",
        description="Update the authenticated user's doctor profile.",
        responses={200: DoctorProfileSerializer}
    )
    def patch(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)


class NurseProfileView(generics.RetrieveUpdateAPIView):
    """Get and update nurse profile"""
    
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = NurseProfileSerializer
    
    def get_object(self):
        return NurseProfile.objects.get(user=self.request.user)
    
    @extend_schema(
        summary="Get nurse profile",
        description="Retrieve the authenticated user's nurse profile.",
        responses={200: NurseProfileSerializer}
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)
    
    @extend_schema(
        summary="Update nurse profile",
        description="Update the authenticated user's nurse profile.",
        responses={200: NurseProfileSerializer}
    )
    def patch(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)


class PharmacistProfileView(generics.RetrieveUpdateAPIView):
    """Get and update pharmacist profile"""
    
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PharmacistProfileSerializer
    
    def get_object(self):
        return PharmacistProfile.objects.get(user=self.request.user)
    
    @extend_schema(
        summary="Get pharmacist profile",
        description="Retrieve the authenticated user's pharmacist profile.",
        responses={200: PharmacistProfileSerializer}
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)
    
    @extend_schema(
        summary="Update pharmacist profile",
        description="Update the authenticated user's pharmacist profile.",
        responses={200: PharmacistProfileSerializer}
    )
    def patch(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)


class LabTechnicianProfileView(generics.RetrieveUpdateAPIView):
    """Get and update lab technician profile"""
    
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = LabTechnicianProfileSerializer
    
    def get_object(self):
        return LabTechnicianProfile.objects.get(user=self.request.user)
    
    @extend_schema(
        summary="Get lab technician profile",
        description="Retrieve the authenticated user's lab technician profile.",
        responses={200: LabTechnicianProfileSerializer}
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)
    
    @extend_schema(
        summary="Update lab technician profile",
        description="Update the authenticated user's lab technician profile.",
        responses={200: LabTechnicianProfileSerializer}
    )
    def patch(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)


class FacilityAdminProfileView(generics.RetrieveUpdateAPIView):
    """Get and update facility admin profile"""
    
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = FacilityAdminProfileSerializer
    
    def get_object(self):
        return FacilityAdminProfile.objects.get(user=self.request.user)
    
    @extend_schema(
        summary="Get facility admin profile",
        description="Retrieve the authenticated user's facility administrator profile.",
        responses={200: FacilityAdminProfileSerializer}
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)
    
    @extend_schema(
        summary="Update facility admin profile",
        description="Update the authenticated user's facility administrator profile.",
        responses={200: FacilityAdminProfileSerializer}
    )
    def patch(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)
