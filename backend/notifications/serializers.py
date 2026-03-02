from rest_framework import serializers
from .models import Notification, NotificationPreference


class NotificationSerializer(serializers.ModelSerializer):
    """Serializer for Notification"""
    
    recipient_name = serializers.CharField(source='recipient.full_name', read_only=True)
    sender_name = serializers.CharField(source='sender.full_name', read_only=True, allow_null=True)
    is_expired = serializers.ReadOnlyField()
    
    class Meta:
        model = Notification
        fields = '__all__'
        read_only_fields = [
            'recipient', 'created_at', 'read_at', 'sent_push',
            'sent_email', 'sent_sms', 'sender'
        ]


class NotificationListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for listing notifications"""
    
    class Meta:
        model = Notification
        fields = [
            'id', 'notification_type', 'title', 'message', 'priority',
            'is_read', 'action_url', 'action_label', 'created_at', 'is_expired'
        ]


class NotificationPreferenceSerializer(serializers.ModelSerializer):
    """Serializer for NotificationPreference"""
    
    class Meta:
        model = NotificationPreference
        fields = '__all__'
        read_only_fields = ['user', 'created_at', 'updated_at']


class MarkAsReadSerializer(serializers.Serializer):
    """Serializer for marking notifications as read"""
    
    notification_ids = serializers.ListField(
        child=serializers.IntegerField(),
        required=False,
        help_text="List of notification IDs to mark as read"
    )
    mark_all = serializers.BooleanField(
        default=False,
        help_text="Mark all unread notifications as read"
    )
    
    def validate(self, attrs):
        if not attrs.get('mark_all') and not attrs.get('notification_ids'):
            raise serializers.ValidationError(
                "Either 'notification_ids' or 'mark_all' must be provided"
            )
        return attrs
