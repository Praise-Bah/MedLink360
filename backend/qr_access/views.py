from rest_framework import generics, status, permissions, filters
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import extend_schema
from django.shortcuts import get_object_or_404
from django.db import models
from django.utils import timezone

from .models import QRToken, QRAccessLog
from .serializers import (
    QRTokenSerializer, QRTokenCreateSerializer, QRTokenListSerializer,
    QRTokenValidateSerializer, QRTokenRevokeSerializer,
    QRAccessLogSerializer, QRAccessLogListSerializer
)
from medical_records.models import MedicalBook


class QRTokenListCreateView(generics.ListCreateAPIView):
    """
    List user's QR tokens or create new token
    """
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['token_type', 'permission_level', 'is_active']
    ordering_fields = ['created_at', 'expires_at']
    ordering = ['-created_at']
    
    def get_queryset(self):
        user = self.request.user
        
        # Patients see tokens for their medical book
        if hasattr(user, 'patient_profile'):
            try:
                medical_book = MedicalBook.objects.get(patient=user)
                return QRToken.objects.filter(medical_book=medical_book)
            except MedicalBook.DoesNotExist:
                return QRToken.objects.none()
        
        # Staff can see all tokens
        if user.is_staff:
            return QRToken.objects.all()
        
        # Others see tokens they created
        return QRToken.objects.filter(created_by=user)
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return QRTokenCreateSerializer
        return QRTokenListSerializer
    
    @extend_schema(
        summary="Create QR access token",
        request=QRTokenCreateSerializer,
        responses={201: QRTokenSerializer}
    )
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        token = serializer.save()
        
        # Return full token details including raw token (only time it's shown)
        response_serializer = QRTokenSerializer(token)
        data = response_serializer.data
        
        # Add raw token to response (only shown once!)
        if hasattr(token, '_raw_token'):
            data['raw_token'] = token._raw_token
            data['qr_url'] = f"/qr/{token._raw_token}"
        
        return Response(data, status=status.HTTP_201_CREATED)


class QRTokenDetailView(generics.RetrieveDestroyAPIView):
    """
    Get or delete a QR token
    """
    serializer_class = QRTokenSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        
        if user.is_staff:
            return QRToken.objects.all()
        
        # Users can only access their own tokens
        return QRToken.objects.filter(created_by=user)


class QRTokenRevokeView(APIView):
    """
    Revoke a QR token
    """
    permission_classes = [permissions.IsAuthenticated]
    
    @extend_schema(
        summary="Revoke QR token",
        request=QRTokenRevokeSerializer,
        responses={200: {'description': 'Token revoked successfully'}}
    )
    def post(self, request, pk):
        token = get_object_or_404(QRToken, pk=pk)
        
        # Check permissions
        if token.created_by != request.user and not request.user.is_staff:
            return Response(
                {'error': 'You do not have permission to revoke this token'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        serializer = QRTokenRevokeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        reason = serializer.validated_data.get('reason', '')
        token.revoke(revoked_by=request.user, reason=reason)
        
        return Response({
            'message': 'Token revoked successfully',
            'token_id': token.id,
            'display_token': token.display_token
        })


class QRTokenValidateView(APIView):
    """
    Validate QR token and grant access
    """
    permission_classes = [permissions.AllowAny]  # Anyone can validate
    
    @extend_schema(
        summary="Validate QR token and access medical book",
        request=QRTokenValidateSerializer,
        responses={200: QRTokenSerializer}
    )
    def post(self, request):
        serializer = QRTokenValidateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        token = serializer.token_obj
        metadata = serializer.validated_data.get('metadata', {})
        
        # Check if token is valid
        is_valid, message = token.is_valid()
        if not is_valid:
            # Log failed access
            QRAccessLog.log_access(
                token=token,
                medical_book=token.medical_book,
                accessed_by=request.user if request.user.is_authenticated else None,
                access_result='denied',
                metadata={'reason': message, **metadata},
                request=request
            )
            
            return Response(
                {'error': message},
                status=status.HTTP_403_FORBIDDEN
            )
        
        # Use the token (records usage)
        success, msg = token.use_token(
            accessed_by=request.user if request.user.is_authenticated else None,
            metadata=metadata
        )
        
        if not success:
            return Response(
                {'error': msg},
                status=status.HTTP_403_FORBIDDEN
            )
        
        # Return token and medical book access info
        response_data = {
            'message': 'Access granted',
            'token': QRTokenSerializer(token).data,
            'medical_book_id': token.medical_book.id,
            'patient_name': token.medical_book.patient.full_name,
            'permission_level': token.permission_level,
            'access_granted': True
        }
        
        return Response(response_data)


class MyQRTokensView(generics.ListAPIView):
    """
    Get QR tokens for current user's medical book
    """
    serializer_class = QRTokenListSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        try:
            medical_book = MedicalBook.objects.get(patient=self.request.user)
            return QRToken.objects.filter(medical_book=medical_book)
        except MedicalBook.DoesNotExist:
            return QRToken.objects.none()


class QRAccessLogListView(generics.ListAPIView):
    """
    List QR access logs
    """
    serializer_class = QRAccessLogListSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['access_result', 'access_type', 'permission_level']
    ordering_fields = ['accessed_at']
    ordering = ['-accessed_at']
    
    def get_queryset(self):
        user = self.request.user
        
        # Staff can see all logs
        if user.is_staff:
            return QRAccessLog.objects.all()
        
        # Patients see logs for their medical book
        if hasattr(user, 'patient_profile'):
            try:
                medical_book = MedicalBook.objects.get(patient=user)
                return QRAccessLog.objects.filter(medical_book=medical_book)
            except MedicalBook.DoesNotExist:
                return QRAccessLog.objects.none()
        
        # Others see logs where they accessed
        return QRAccessLog.objects.filter(accessed_by=user)


class QRAccessLogDetailView(generics.RetrieveAPIView):
    """
    Get detailed access log
    """
    serializer_class = QRAccessLogSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        
        if user.is_staff:
            return QRAccessLog.objects.all()
        
        # Users can see logs for their medical book or where they accessed
        return QRAccessLog.objects.filter(
            models.Q(medical_book__patient=user) | models.Q(accessed_by=user)
        )


class MyAccessLogsView(generics.ListAPIView):
    """
    Get access logs for current user's medical book
    """
    serializer_class = QRAccessLogListSerializer
    permission_classes = [permissions.IsAuthenticated]
    ordering = ['-accessed_at']
    
    def get_queryset(self):
        try:
            medical_book = MedicalBook.objects.get(patient=self.request.user)
            return QRAccessLog.objects.filter(medical_book=medical_book)
        except MedicalBook.DoesNotExist:
            return QRAccessLog.objects.none()


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def token_statistics(request):
    """
    Get statistics about user's QR tokens
    """
    user = request.user
    
    try:
        medical_book = MedicalBook.objects.get(patient=user)
        tokens = QRToken.objects.filter(medical_book=medical_book)
    except MedicalBook.DoesNotExist:
        tokens = QRToken.objects.filter(created_by=user)
    
    stats = {
        'total_tokens': tokens.count(),
        'active_tokens': tokens.filter(is_active=True).count(),
        'expired_tokens': tokens.filter(is_active=True, expires_at__lt=timezone.now()).count(),
        'revoked_tokens': tokens.filter(revoked_at__isnull=False).count(),
        'total_accesses': QRAccessLog.objects.filter(token__in=tokens).count(),
        'by_type': {
            token_type[0]: tokens.filter(token_type=token_type[0]).count()
            for token_type in QRToken.TOKEN_TYPES
        },
        'by_permission': {
            perm[0]: tokens.filter(permission_level=perm[0]).count()
            for perm in QRToken.PERMISSION_LEVELS
        }
    }
    
    return Response(stats)


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def token_info(request, display_token):
    """
    Get public info about a token (without granting access)
    """
    try:
        token = QRToken.objects.get(display_token=display_token.upper())
    except QRToken.DoesNotExist:
        return Response(
            {'error': 'Token not found'},
            status=status.HTTP_404_NOT_FOUND
        )
    
    # Return public info only
    is_valid, message = token.is_valid()
    
    return Response({
        'display_token': token.display_token,
        'token_type': token.token_type,
        'permission_level': token.permission_level,
        'is_active': token.is_active,
        'is_valid': is_valid,
        'validation_message': message,
        'expires_at': token.expires_at,
        'is_expired': token.is_expired,
        'description': token.description,
        'patient_name': token.medical_book.patient.full_name,
        'created_at': token.created_at
    })
