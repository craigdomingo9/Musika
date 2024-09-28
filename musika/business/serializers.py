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

class BusinessUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Business
        fields = ["name","description","logo"]
    


class FeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feature
        fields = ['id', 'name', 'description']


class SubscriptionPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubscriptionPlan
        fields = ['id', 'name', 'features']

class SubscriptionsSerializer(serializers.ModelSerializer):
    missing_features = serializers.SerializerMethodField()
    next_plan = serializers.SerializerMethodField()

    class Meta:
        model = Subscription
        fields = ['id', 'plan', 'interval', 'payment_amount', 'status','missing_features','next_plan']
        depth = 2

    def get_is_active(self, obj):
        return obj.status
    
    def get_missing_features(self, obj):
        next_plan = obj.next_plan
        if next_plan:
            current_features = obj.plan.features.all()
            missing = next_plan.features.exclude(id__in=current_features)
            return FeatureSerializer(missing, many=True).data
        return []
    
    def get_next_plan(self, obj):
        next_plan = obj.next_plan
        if next_plan:
            return SubscriptionPlanSerializer(next_plan).data
        return None


class LocationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Location
        fields = ('id','name', 'address', 'latitude', 'longitude','city','country')

class LocationCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Location
        fields = ('business','name', 'address', 'city')

