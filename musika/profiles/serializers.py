from rest_framework import serializers
from .models import Profile



class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = "__all__"

class ProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['first_name', 'last_name', 'phone_number', 'address', 'city', 'credentials', 'profile_picture']
    
    # def is_valid(self):
    #     data_keys = sorted(list(dict(self.initial_data).keys()))
    #     fields_keys = sorted(list(dict(self.fields).keys()))

    #     # print("\n",data_keys,"\n",fields_keys)

    #     if data_keys == fields_keys:
    #         return True
    #     else:
    #         return False
