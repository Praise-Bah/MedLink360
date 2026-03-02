from rest_framework import serializers
from .models import QRToken, QRAccessLog
from medical_records.models import MedicalBook


class QRTokenSerializer(serializers.ModelSerializer):
    """Serializer for QRToken"""
    
    patient_name = serializers.CharField(source='medical_book.patient.full_name', read_only=True)
    patient_email = serializers.CharField(source='medical_book.patient.email', read_only=True)
    created_by_name = serializers.CharField(source='created_by.full_name', read_only=True)
    revoked_by_name = serializers.CharField(source='revoked_by.full_name', read_only=True, allow_null=True)
    is_valid_status = serializers.SerializerMethodField()
    time_remaining = serializers.SerializerMethodField()
    is_expired = serializers.ReadOnlyField()
    
    class Meta:
        model = QRToken
        fields = '__all__'
        read_only_fields = [
            'token', 'display_token', 'created_by', 'use_count',
            'last_used_at', 'revoked_at', 'revoked_by', 'created_at'
        ]
    
    def get_is_valid_status(self, obj):
        """Get token validation status"""
        is_valid, message = obj.is_valid()
        return {'is_valid': is_valid, 'message': message}
    
    def get_time_remaining(self, obj):
        """Get time remaining until expiration"""
        remaining = obj.time_remaining
        if remaining is None:
            return None
        return str(remaining)


class QRTokenCreateSerializer(serializers.Serializer):
    """Serializer for creating QR tokens"""
    
    medical_book_id = serializers.IntegerField(required=True)
    token_type = serializers.ChoiceField(
        choices=QRToken.TOKEN_TYPES,
        default='time_limited'
    )
    permission_level = serializers.ChoiceField(
        choices=QRToken.PERMISSION_LEVELS,
        default='view_only'
    )
    expires_in_hours = serializers.IntegerField(
        default=24,
        min_value=1,
        max_value=8760,
        help_text="Hours until expiration (max 1 year)"
    )
    max_uses = serializers.IntegerField(
        required=False,
        allow_null=True,
        min_value=1,
        help_text="Maximum number of uses"
    )
    description = serializers.CharField(
        required=False,
        allow_blank=True,
        max_length=255
    )
    
    def validate_medical_book_id(self, value):
        """Validate medical book exists and user has access"""
        try:
            medical_book = MedicalBook.objects.get(id=value)
        except MedicalBook.DoesNotExist:
            raise serializers.ValidationError("Medical book not found")
        
        # Check if user is the patient or has access
        user = self.context['request'].user
        if medical_book.patient != user and not user.is_staff:
            raise serializers.ValidationError("You don't have permission to create tokens for this medical book")
        
        return value
    
    def create(self, validated_data):
        """Create QR token"""
        medical_book_id = validated_data.pop('medical_book_id')
        medical_book = MedicalBook.objects.get(id=medical_book_id)
        created_by = self.context['request'].user
        
        token = QRToken.generate_token(
            medical_book=medical_book,
            created_by=created_by,
            **validated_data
        )
        
        return token


class QRTokenListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for listing tokens"""
    
    patient_name = serializers.CharField(source='medical_book.patient.full_name', read_only=True)
    is_expired = serializers.ReadOnlyField()
    
    class Meta:
        model = QRToken
        fields = [
            'id', 'display_token', 'token_type', 'permission_level',
            'patient_name', 'is_active', 'is_expired', 'use_count',
            'max_uses', 'created_at', 'expires_at', 'description'
        ]


class QRTokenValidateSerializer(serializers.Serializer):
    """Serializer for validating QR tokens"""
    
    token = serializers.CharField(required=True)
    metadata = serializers.JSONField(required=False, default=dict)
    
    def validate_token(self, value):
        """Validate token exists and hash it"""
        import hashlib
        hashed_token = hashlib.sha256(value.encode()).hexdigest()
        
        try:
            token = QRToken.objects.get(token=hashed_token)
        except QRToken.DoesNotExist:
            raise serializers.ValidationError("Invalid token")
        
        # Store token object for later use
        self.token_obj = token
        return value


class QRTokenRevokeSerializer(serializers.Serializer):
    """Serializer for revoking tokens"""
    
    reason = serializers.CharField(required=False, allow_blank=True)


class QRAccessLogSerializer(serializers.ModelSerializer):
    """Serializer for QR access logs"""
    
    token_display = serializers.CharField(source='token.display_token', read_only=True, allow_null=True)
    patient_name = serializers.CharField(source='medical_book.patient.full_name', read_only=True)
    accessed_by_name = serializers.CharField(source='accessed_by.full_name', read_only=True, allow_null=True)
    
    class Meta:
        model = QRAccessLog
        fields = '__all__'
        read_only_fields = ['accessed_at']


class QRAccessLogListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for listing access logs"""
    
    token_display = serializers.CharField(source='token.display_token', read_only=True, allow_null=True)
    accessed_by_name = serializers.CharField(source='accessed_by.full_name', read_only=True, allow_null=True)
    
    class Meta:
        model = QRAccessLog
        fields = [
            'id', 'token_display', 'accessed_by_name', 'accessed_by_email',
            'permission_level', 'access_result', 'access_type',
            'ip_address', 'accessed_at'
        ]
