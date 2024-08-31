import rest_framework.serializers as serializers
from .models import *

class BusinessSerializer(serializers.ModelSerializer):

    class Meta:
        model = Business
        fields = ["code","name","description","catalog","categories","logo","cover_photo","products","phone_number","email","created_at","location"]
        depth = 1

class SubscriptionsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Subscription
        fields = '__all__'

class LocationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Location
        fields = ('id','name', 'address', 'latitude', 'longitude','city','country')

