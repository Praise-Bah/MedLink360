from django.urls import path
from .views import (
    NotificationListView, NotificationDetailView,
    MarkAsReadView, UnreadCountView, DeleteAllReadView,
    NotificationPreferenceView, notification_types, send_test_notification
)

app_name = 'notifications'

urlpatterns = [
    # Notifications
    path('', NotificationListView.as_view(), name='notification-list'),
    path('<int:pk>/', NotificationDetailView.as_view(), name='notification-detail'),
    
    # Actions
    path('mark-as-read/', MarkAsReadView.as_view(), name='mark-as-read'),
    path('unread-count/', UnreadCountView.as_view(), name='unread-count'),
    path('delete-read/', DeleteAllReadView.as_view(), name='delete-read'),
    
    # Preferences
    path('preferences/', NotificationPreferenceView.as_view(), name='preferences'),
    
    # Utility
    path('types/', notification_types, name='types'),
    path('test/', send_test_notification, name='test'),
]
