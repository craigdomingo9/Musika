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
        depth = 1



class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ["id","name","catalog","category","images","inventory_quantity"]
        depth = 1

class ProductAnalyticsForBusinessSerializer(serializers.ModelSerializer):
    product_details = serializers.SerializerMethodField()
    
    class Meta:
        model = ProductAnalytics
        fields = ["product", "product_details", "product_views", "product_bag_adds"]
        depth = 1
    
    def get_product_details(self,obj):
        return ProductSerializer(obj.product_details).data


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
