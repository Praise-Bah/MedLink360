from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
import logging

logger = logging.getLogger(__name__)


def custom_exception_handler(exc, context):
    """
    Custom exception handler for consistent error responses
    """
    # Call REST framework's default exception handler first
    response = exception_handler(exc, context)
    
    if response is not None:
        # Customize the error response
        custom_response_data = {
            'error': True,
            'status_code': response.status_code,
            'message': str(exc),
            'details': response.data
        }
        
        # Add specific error types
        if response.status_code == 400:
            custom_response_data['error_type'] = 'ValidationError'
        elif response.status_code == 401:
            custom_response_data['error_type'] = 'AuthenticationError'
        elif response.status_code == 403:
            custom_response_data['error_type'] = 'PermissionError'
        elif response.status_code == 404:
            custom_response_data['error_type'] = 'NotFoundError'
        elif response.status_code == 429:
            custom_response_data['error_type'] = 'RateLimitError'
        elif response.status_code >= 500:
            custom_response_data['error_type'] = 'ServerError'
        
        # Log errors
        if response.status_code >= 500:
            logger.error(
                f"Server Error: {exc}",
                exc_info=True,
                extra={'context': context}
            )
        
        response.data = custom_response_data
    else:
        # Handle non-DRF exceptions
        logger.error(
            f"Unhandled Exception: {exc}",
            exc_info=True,
            extra={'context': context}
        )
        response = Response(
            {
                'error': True,
                'status_code': status.HTTP_500_INTERNAL_SERVER_ERROR,
                'error_type': 'ServerError',
                'message': 'An unexpected error occurred',
                'details': str(exc) if settings.DEBUG else 'Internal server error'
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    
    return response
