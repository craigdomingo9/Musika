# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Credentials,Token
from .serializers import SignUpSerializer,TokenSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import AllowAny,IsAuthenticated
from django.contrib.auth.hashers import make_password
from business.models import Business
from rest_framework import generics


class SignUpView(generics.CreateAPIView):
    def post(self, request,**kwargs):
        data = {
            "email": request.data["email"],
            "password": request.data["password"]
        }
        
        if request.data['password'] != request.data['confirm_password']:
            return Response({"detail": "Passwords do not match."}, status=status.HTTP_400_BAD_REQUEST)
        
        if Credentials.objects.filter(email=data["email"]).exists():
            return Response({"detail": "User already exists."}, status=status.HTTP_400_BAD_REQUEST)
        
        if kwargs["is_business"] == 1:
            Credentials.objects.create(email=data["email"],password=make_password(data["password"]),account_type="business")
        else:
            Credentials.objects.create(email=data["email"],password=make_password(data["password"]))
        
        return Response({"detail": "User registered successfully."}, status=status.HTTP_201_CREATED)
        



class VerifyTokenView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # The token is automatically verified by DRF's authentication system

        user = request.user.email
        account_type = Credentials.objects.get(email=user).account_type

        code = ""
        if account_type == "business":
            code = Business.objects.get(email=user).code

        data = {"code": code,"account_type": account_type}
        
        return Response(data)


class LoginView(ObtainAuthToken):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        
        try:
            user = Credentials.objects.get(email=email)
            
            if user.check_password(password):
                key,_ = Token.objects.get_or_create(user=user)
                return Response({'key':TokenSerializer(key).data,'email':email}, status=status.HTTP_200_OK)
            else:
                return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        except Credentials.DoesNotExist:
            return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)



class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        token_key = request.data.get('token')
        try:
            token = Token.objects.get(key=token_key)
            token.delete()  # Revoke the token
            return Response({'detail': 'Logged out successfully'}, status=status.HTTP_200_OK)
        except Token.DoesNotExist:
            return Response({'detail': 'Invalid token'}, status=status.HTTP_404_NOT_FOUND)