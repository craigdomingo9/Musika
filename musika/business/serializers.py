import rest_framework.serializers as serializers
from .models import *

class BusinessSerializer(serializers.ModelSerializer):

    class Meta:
        model = Business
        fields = ["code","name","description","catalog","categories","logo","cover_photo","products","phone_number","email","created_at","location"]
        depth = 1


class BusinessCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Business
        fields = ["name","description","categories","logo","phone_number","email"]
    
    def is_valid(self):
        data_keys = sorted(list(dict(self.initial_data).keys()))
        fields_keys = sorted(list(dict(self.fields).keys()))

        print("\n",data_keys,"\n",fields_keys)

        if data_keys == fields_keys:
            return True
        else:
            return False

class SubscriptionsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Subscription
        fields = ['id', 'plan', 'interval', 'payment_amount', 'status']
        depth = 2

    def get_is_active(self, obj):
        return obj.status

class LocationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Location
        fields = ('id','name', 'address', 'latitude', 'longitude','city','country')

class LocationCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Location
        fields = ('business','name', 'address', 'city')

