from .models import *
from rest_framework import serializers





class BusinessAnalyticsSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessAnalytics
        fields = ["business", "business_page_views"]
        depth = 2


class ProductAnalyticsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductAnalytics
        fields = ["product", "product_views", "product_bag_adds"]
        depth = 2


class ProductAnalyticsForBusinessSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductAnalytics
        fields = ["product", "product_views", "product_bag_adds"]
        depth = 1


class ProductViewsAddSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductViews
        fields = ["product", "profile", "view_date"]

class BusinessPageViewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessPageViews
        fields = ["business", "profile", "view_date"]



class ProductBagAddSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductBagAdds
        fields = ["product", "profile", "bag_add_date"]
