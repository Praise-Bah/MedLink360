from django.urls import path
from .views import (
    QRTokenListCreateView, QRTokenDetailView, QRTokenRevokeView,
    QRTokenValidateView, MyQRTokensView, QRAccessLogListView,
    QRAccessLogDetailView, MyAccessLogsView, token_statistics, token_info
)

app_name = 'qr_access'

urlpatterns = [
    # QR Tokens
    path('tokens/', QRTokenListCreateView.as_view(), name='token-list-create'),
    path('tokens/<int:pk>/', QRTokenDetailView.as_view(), name='token-detail'),
    path('tokens/<int:pk>/revoke/', QRTokenRevokeView.as_view(), name='token-revoke'),
    path('tokens/my-tokens/', MyQRTokensView.as_view(), name='my-tokens'),
    path('tokens/statistics/', token_statistics, name='token-statistics'),
    
    # Token validation (public)
    path('validate/', QRTokenValidateView.as_view(), name='validate-token'),
    path('info/<str:display_token>/', token_info, name='token-info'),
    
    # Access Logs
    path('logs/', QRAccessLogListView.as_view(), name='access-log-list'),
    path('logs/<int:pk>/', QRAccessLogDetailView.as_view(), name='access-log-detail'),
    path('logs/my-access/', MyAccessLogsView.as_view(), name='my-access-logs'),
]
