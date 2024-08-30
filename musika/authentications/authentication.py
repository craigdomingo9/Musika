from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.authtoken.models import Token

class TokenAuthentication(BaseAuthentication):
    def authenticate(self, request):
        token_key = request.META.get('HTTP_AUTHORIZATION')
        if not token_key:
            return None
        
        try:
            token = Token.objects.get(key=token_key)
            return (token.user, token)
        except Token.DoesNotExist:
            raise AuthenticationFailed('Invalid token')