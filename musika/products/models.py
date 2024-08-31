from django.db import models
from business.models import *
from django.db.models import Func, FloatField
from category.models import Category
# Create your models here.




class SQLiteRandom(Func):
    function = 'RAND'
    output_field = FloatField()

class ShuffleModelManager(models.Manager):
    def shuffled(self):
        return self.annotate(random_order=SQLiteRandom()).order_by('random_order')


"""   Catalog   """
class Catalog(models.Model):
    business = models.ForeignKey(Business,related_name="catalog", on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.name



"""   Product   """
class Product(models.Model):
    name = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    catalog = models.ForeignKey(Catalog, on_delete=models.CASCADE)
    business = models.ForeignKey(Business,related_name="products", on_delete=models.CASCADE)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    on_sale = models.BooleanField(default=False,blank=True)
    sale_price = models.DecimalField(max_digits=10, decimal_places=2,blank=True,null=True)
    inventory_quantity = models.PositiveIntegerField(default=1,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = ShuffleModelManager()

    def __str__(self) -> str:
        return self.name


"""   Product Image   """
class ProductImage(models.Model):
    product = models.ForeignKey(Product,related_name="images", on_delete=models.CASCADE)
    image = models.ImageField(upload_to='./images/product_images')
    alt_text = models.CharField(max_length=100,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.product.name
    


class ProductVariant(models.Model):
    product = models.ForeignKey(Product,related_name="variant", on_delete=models.CASCADE)
    image = models.ImageField(upload_to='./images/product_images/variants')
    description = models.CharField(max_length=200,default="",blank="True")
    attribute_name = models.CharField(max_length=100)
    attribute_value = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock_quantity = models.PositiveIntegerField()

    def __str__(self) -> str:
        return self.product.name
