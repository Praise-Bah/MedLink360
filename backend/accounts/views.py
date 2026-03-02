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
    LabTechnicianProfileSerializer, FacilityAdminProfileSerializer,
    AdminInvitationSerializer, AdminInvitationCreateSerializer,
    AdminInvitationVerifySerializer, AdminInvitationAcceptSerializer,
    AdminInvitationRevokeSerializer
)
from .models import (
    Role, PatientProfile, DoctorProfile, NurseProfile, 
    PharmacistProfile, LabTechnicianProfile, FacilityAdminProfile,
    AdminInvitation
)

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


# ============================================================================
# Admin Invitation Views
# ============================================================================

class IsMoHAdmin(permissions.BasePermission):
    """Permission class for Ministry of Health admins only"""
    
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        return request.user.active_role == 'moh_admin' or request.user.is_superuser


class AdminInvitationListCreateView(generics.ListCreateAPIView):
    """
    List all admin invitations or create a new one.
    Only accessible by Ministry of Health admins.
    """
    
    permission_classes = [IsMoHAdmin]
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return AdminInvitationCreateSerializer
        return AdminInvitationSerializer
    
    def get_queryset(self):
        queryset = AdminInvitation.objects.select_related(
            'hospital', 'invited_by', 'revoked_by'
        ).order_by('-created_at')
        
        # Filter by status
        status_filter = self.request.query_params.get('status')
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        
        # Filter by role
        role_filter = self.request.query_params.get('role')
        if role_filter:
            queryset = queryset.filter(role=role_filter)
        
        # Filter by hospital
        hospital_filter = self.request.query_params.get('hospital')
        if hospital_filter:
            queryset = queryset.filter(hospital_id=hospital_filter)
        
        return queryset
    
    @extend_schema(
        summary="List admin invitations",
        description="List all admin invitations. Filterable by status, role, and hospital. MoH admin access only.",
        responses={200: AdminInvitationSerializer(many=True)}
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)
    
    @extend_schema(
        summary="Create admin invitation",
        description="Create a new admin invitation and send email to the invitee. MoH admin access only.",
        request=AdminInvitationCreateSerializer,
        responses={201: AdminInvitationSerializer}
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


class AdminInvitationDetailView(generics.RetrieveAPIView):
    """
    Retrieve a specific admin invitation.
    Only accessible by Ministry of Health admins.
    """
    
    permission_classes = [IsMoHAdmin]
    serializer_class = AdminInvitationSerializer
    queryset = AdminInvitation.objects.select_related('hospital', 'invited_by', 'revoked_by')
    
    @extend_schema(
        summary="Get admin invitation details",
        description="Retrieve details of a specific admin invitation. MoH admin access only.",
        responses={200: AdminInvitationSerializer}
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)


class AdminInvitationRevokeView(APIView):
    """
    Revoke a pending admin invitation.
    Only accessible by Ministry of Health admins.
    """
    
    permission_classes = [IsMoHAdmin]
    
    @extend_schema(
        summary="Revoke admin invitation",
        description="Revoke a pending admin invitation. Cannot revoke already accepted or expired invitations.",
        request=AdminInvitationRevokeSerializer,
        responses={200: AdminInvitationSerializer}
    )
    def post(self, request):
        serializer = AdminInvitationRevokeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        invitation = AdminInvitation.objects.get(id=serializer.validated_data['invitation_id'])
        invitation.revoke(request.user)
        
        return Response(
            AdminInvitationSerializer(invitation).data,
            status=status.HTTP_200_OK
        )


class AdminInvitationVerifyView(APIView):
    """
    Verify an invitation token (public endpoint).
    Used when a user clicks the invitation link.
    """
    
    permission_classes = [permissions.AllowAny]
    
    @extend_schema(
        summary="Verify invitation token",
        description="Verify if an invitation token is valid. Returns invitation details if valid.",
        request=AdminInvitationVerifySerializer,
        responses={200: AdminInvitationSerializer}
    )
    def post(self, request):
        serializer = AdminInvitationVerifySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        invitation = AdminInvitation.objects.select_related('hospital').get(
            token=serializer.validated_data['token']
        )
        
        return Response(
            AdminInvitationSerializer(invitation).data,
            status=status.HTTP_200_OK
        )


class AdminInvitationAcceptView(APIView):
    """
    Accept an invitation and create admin account (public endpoint).
    Used when a user sets their password after clicking the invitation link.
    """
    
    permission_classes = [permissions.AllowAny]
    
    @extend_schema(
        summary="Accept invitation and create account",
        description="Accept an admin invitation by setting password and creating the account.",
        request=AdminInvitationAcceptSerializer,
        responses={201: UserDetailSerializer}
    )
    def post(self, request):
        serializer = AdminInvitationAcceptSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        return Response(
            UserDetailSerializer(user).data,
            status=status.HTTP_201_CREATED
        )


class AdminInvitationResendView(APIView):
    """
    Resend an invitation email.
    Only accessible by Ministry of Health admins.
    """
    
    permission_classes = [IsMoHAdmin]
    
    @extend_schema(
        summary="Resend invitation email",
        description="Resend the invitation email to the invitee. Only works for pending invitations.",
        responses={200: {"description": "Email resent successfully"}}
    )
    def post(self, request, pk):
        try:
            invitation = AdminInvitation.objects.get(pk=pk)
        except AdminInvitation.DoesNotExist:
            return Response(
                {"error": "Invitation not found."},
                status=status.HTTP_404_NOT_FOUND
            )
        
        if invitation.status != 'pending':
            return Response(
                {"error": f"Cannot resend invitation that has been {invitation.status}."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if invitation.is_expired:
            return Response(
                {"error": "Invitation has expired. Please create a new invitation."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # TODO: Implement email sending logic here
        # send_invitation_email(invitation)
        
        return Response(
            {"message": "Invitation email resent successfully."},
            status=status.HTTP_200_OK
        )
