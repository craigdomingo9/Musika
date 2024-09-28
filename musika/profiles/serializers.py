from rest_framework import serializers
from .models import Profile



class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = "__all__"

class ProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['first_name', 'last_name', 
                  'age', 'gender',
                  'phone_number', 'address', 'city', 'credentials', 'profile_picture']
