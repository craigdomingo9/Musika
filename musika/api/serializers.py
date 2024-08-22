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

class CatalogSerializer(serializers.ModelSerializer):

    class Meta:
        model = Catalog
        fields = ["id","name","description","created_at","updated_at","category"]
        depth = 1

class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = "__all__"


class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = "__all__"

class ProductImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductImage
        fields = ['id','image']
    

class ProductsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ["id","name","catalog","business","images","variant","description","price","on_sale","sale_price","inventory_quantity","created_at"]
        depth = 1

class BusinessProductsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ["id","name","images","description","price","on_sale","sale_price","inventory_quantity","created_at"]
        depth = 1


class ProductVariantSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductVariant
        fields = "__all__"



