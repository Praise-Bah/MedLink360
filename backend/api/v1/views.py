from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import permissions, status
from django.db import connection
from django.conf import settings
from django.core.cache import cache
import time


@api_view(["GET"])
@permission_classes([AllowAny])
def health(request):
    """Basic health check endpoint"""
    return Response({
        'status': 'ok',
        'message': 'MedLink360 API is running',
        'version': '1.0.0'
    })


@api_view(['GET'])
@permission_classes([permissions.IsAdminUser])
def health_detailed(request):
    """
    Detailed health check with database and system status
    Only accessible by admin users
    """
    health_status = {
        'status': 'healthy',
        'timestamp': time.time(),
        'version': '1.0.0',
        'checks': {}
    }
    
    # Database check
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
            cursor.fetchone()
        health_status['checks']['database'] = {
            'status': 'healthy',
            'message': 'Database connection successful'
        }
    except Exception as e:
        health_status['status'] = 'unhealthy'
        health_status['checks']['database'] = {
            'status': 'unhealthy',
            'message': str(e)
        }
    
    # Cache check (if configured)
    try:
        cache_key = 'health_check_test'
        cache.set(cache_key, 'test', 10)
        cache_value = cache.get(cache_key)
        if cache_value == 'test':
            health_status['checks']['cache'] = {
                'status': 'healthy',
                'message': 'Cache is working'
            }
        else:
            health_status['checks']['cache'] = {
                'status': 'degraded',
                'message': 'Cache not working properly'
            }
    except Exception as e:
        health_status['checks']['cache'] = {
            'status': 'unavailable',
            'message': f'Cache error: {str(e)}'
        }
    
    # Settings check
    health_status['checks']['settings'] = {
        'debug': settings.DEBUG,
        'allowed_hosts': settings.ALLOWED_HOSTS,
        'cors_enabled': bool(settings.CORS_ALLOWED_ORIGINS),
    }
    
    # Determine overall status
    if health_status['status'] == 'unhealthy':
        return Response(health_status, status=status.HTTP_503_SERVICE_UNAVAILABLE)
    
    return Response(health_status)
