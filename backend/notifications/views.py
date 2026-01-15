from rest_framework import generics, status, permissions, filters
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend
from django.utils import timezone
from drf_spectacular.utils import extend_schema

from .models import Notification, NotificationPreference
from .serializers import (
    NotificationSerializer, NotificationListSerializer,
    NotificationPreferenceSerializer, MarkAsReadSerializer
)


class NotificationListView(generics.ListAPIView):
    """
    List notifications for current user
    """
    serializer_class = NotificationListSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['notification_type', 'priority', 'is_read']
    ordering_fields = ['created_at', 'priority']
    ordering = ['-created_at']
    
    def get_queryset(self):
        return Notification.objects.filter(
            recipient=self.request.user
        ).select_related('sender')


class NotificationDetailView(generics.RetrieveDestroyAPIView):
    """
    Get or delete a notification
    """
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Notification.objects.filter(recipient=self.request.user)


class MarkAsReadView(APIView):
    """
    Mark notifications as read
    """
    permission_classes = [permissions.IsAuthenticated]
    
    @extend_schema(
        request=MarkAsReadSerializer,
        responses={200: {'description': 'Notifications marked as read'}}
    )
    def post(self, request):
        serializer = MarkAsReadSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        if serializer.validated_data.get('mark_all'):
            # Mark all unread notifications as read
            updated = Notification.objects.filter(
                recipient=request.user,
                is_read=False
            ).update(
                is_read=True,
                read_at=timezone.now()
            )
            return Response({
                'message': f'{updated} notifications marked as read',
                'count': updated
            })
        else:
            # Mark specific notifications as read
            notification_ids = serializer.validated_data.get('notification_ids', [])
            notifications = Notification.objects.filter(
                recipient=request.user,
                id__in=notification_ids,
                is_read=False
            )
            
            updated = 0
            for notification in notifications:
                notification.mark_as_read()
                updated += 1
            
            return Response({
                'message': f'{updated} notifications marked as read',
                'count': updated
            })


class UnreadCountView(APIView):
    """
    Get count of unread notifications
    """
    permission_classes = [permissions.IsAuthenticated]
    
    @extend_schema(
        summary="Get unread notification count",
        responses={200: {'type': 'object', 'properties': {'count': {'type': 'integer'}}}}
    )
    def get(self, request):
        count = Notification.objects.filter(
            recipient=request.user,
            is_read=False
        ).count()
        
        # Also get counts by priority
        urgent_count = Notification.objects.filter(
            recipient=request.user,
            is_read=False,
            priority='urgent'
        ).count()
        
        high_count = Notification.objects.filter(
            recipient=request.user,
            is_read=False,
            priority='high'
        ).count()
        
        return Response({
            'total': count,
            'urgent': urgent_count,
            'high': high_count,
            'normal': count - urgent_count - high_count
        })


class DeleteAllReadView(APIView):
    """
    Delete all read notifications
    """
    permission_classes = [permissions.IsAuthenticated]
    
    @extend_schema(
        summary="Delete all read notifications",
        responses={200: {'description': 'Read notifications deleted'}}
    )
    def delete(self, request):
        deleted, _ = Notification.objects.filter(
            recipient=request.user,
            is_read=True
        ).delete()
        
        return Response({
            'message': f'{deleted} read notifications deleted',
            'count': deleted
        })


class NotificationPreferenceView(APIView):
    """
    Get or update notification preferences
    """
    permission_classes = [permissions.IsAuthenticated]
    
    @extend_schema(
        summary="Get notification preferences",
        responses={200: NotificationPreferenceSerializer}
    )
    def get(self, request):
        prefs, created = NotificationPreference.objects.get_or_create(user=request.user)
        serializer = NotificationPreferenceSerializer(prefs)
        return Response(serializer.data)
    
    @extend_schema(
        summary="Update notification preferences",
        request=NotificationPreferenceSerializer,
        responses={200: NotificationPreferenceSerializer}
    )
    def patch(self, request):
        prefs, created = NotificationPreference.objects.get_or_create(user=request.user)
        serializer = NotificationPreferenceSerializer(prefs, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def notification_types(request):
    """
    Get available notification types
    """
    types = [
        {
            'value': choice[0],
            'label': choice[1],
            'category': choice[0].split('_')[0]  # Extract category from type
        }
        for choice in Notification.NOTIFICATION_TYPES
    ]
    
    # Group by category
    categories = {}
    for notif_type in types:
        category = notif_type['category']
        if category not in categories:
            categories[category] = []
        categories[category].append(notif_type)
    
    return Response({
        'types': types,
        'categories': categories
    })


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def send_test_notification(request):
    """
    Send a test notification (for testing purposes)
    """
    notification = Notification.objects.create(
        recipient=request.user,
        notification_type='system_maintenance',
        title='Test Notification',
        message='This is a test notification to verify the notification system is working correctly.',
        priority='normal',
        data={'test': True},
        action_url='/notifications/',
        action_label='View Notifications'
    )
    
    serializer = NotificationSerializer(notification)
    return Response(serializer.data, status=status.HTTP_201_CREATED)
