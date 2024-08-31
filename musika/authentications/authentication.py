from rest_framework.authentication import BaseAuthentication,TokenAuthentication
from rest_framework.exceptions import AuthenticationFailed
from .models import Token

class CustomBearerTokenAuthentication(TokenAuthentication):
    def authenticate(self, request):
        # Get the Authorization header
        auth_header = request.META.get('HTTP_AUTHORIZATION')

        if not auth_header:
            return None  # No Authorization header, skip authentication

        # Check if the header starts with "Bearer "
        if not auth_header.startswith('Bearer '):
            raise AuthenticationFailed('Authorization header must start with Bearer')

        # Extract the token
        token = auth_header.split(' ')[1]

        try:
            # Validate the token and retrieve the user
            token_obj = Token.objects.get(key=token)
            user = token_obj.user
        except Token.DoesNotExist:
            raise AuthenticationFailed('Invalid token')

        return (user, token_obj)