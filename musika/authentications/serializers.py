# serializers.py
from rest_framework import serializers
from .models import Credentials,Token



class TokenSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Token
        fields = ["key"]



class SignUpSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = Credentials
        fields = ['email', 'password', 'confirm_password']

    def is_valid(self, attrs):
        print("hello")
        
        return attrs

    def create(self, validated_data):
        user = Credentials(
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])  # Hash the password
        user.save()
        return user