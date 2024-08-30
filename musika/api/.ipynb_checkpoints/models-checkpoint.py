# Create your models here.
from django.db.models import Func, FloatField
from django.db import models
import random
import string
from django.utils import timezone
from phonenumber_field.modelfields import PhoneNumberField
from datetime import datetime



# Create your models here.
def generate_unique_code():
    length = 8

    while True:
        code = "".join(random.choices(string.ascii_uppercase, k=length))
        if not Business.objects.filter(code=code).exists():
            break

    return code

class SQLiteRandom(Func):
    function = 'RAND'
    output_field = FloatField()

class ShuffleModelManager(models.Manager):
    def shuffled(self):
        return self.annotate(random_order=SQLiteRandom()).order_by('random_order')


"""   Business Entity   """
class Business(models.Model):
    code = models.CharField(max_length=8,primary_key=True,default=generate_unique_code,unique=True)
    name = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    categories = models.CharField(max_length=100)
    logo = models.ImageField(upload_to='./images/logo_images',blank=True)
    cover_photo = models.ImageField(upload_to='./images/cover_images',blank=True)
    phone_number = PhoneNumberField(null=True, blank=True, unique=True)
    email = models.EmailField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    class Meta:
        ordering = ['name']
        verbose_name_plural = "Businesses"
        unique_together = (('email','phone_number'),)
    
    def __str__(self) -> str:
        return self.name





class Location(models.Model):
    business = models.ForeignKey(Business,on_delete=models.DO_NOTHING,related_name="location")
    name = models.CharField(max_length=50,blank=False,default="")
    address = models.CharField(max_length=255)
    latitude = models.FloatField()
    longitude = models.FloatField()
    city = models.CharField(max_length=30)
    country = models.CharField(default="Zimbabwe",max_length=30)

    def __str__(self) -> str:
        return f"{self.address}, {self.city}"



class Subscription(models.Model):
    business = models.ForeignKey(Business, on_delete=models.CASCADE)
    plan = models.ForeignKey("SubscriptionPlan", on_delete=models.CASCADE, related_name='subscriptions')
    interval = models.CharField(max_length=20, choices=[
        ('monthly', 'Monthly'),
        ('quarterly', 'Quarterly'),
        ('yearly', 'Yearly'),
    ])
    start_date = models.DateField(auto_now_add=True)
    end_date = models.DateField(blank=True,null=True)
    is_active = models.BooleanField(default=True)
    payment_amount = models.DecimalField(max_digits=10, decimal_places=2,blank=True,null=True)
    payment_method = models.CharField(max_length=50,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if self.interval == 'monthly':
            self.end_date = self.start_date + timezone.timedelta(days=30)
            self.payment_amount = self.plan.price
        elif self.interval == 'quarterly':
            self.end_date = self.start_date + timezone.timedelta(days=90)
            self.payment_amount = self.plan.price * 3 
        elif self.interval == 'yearly':
            print("yeah")
            self.end_date = datetime.now().date() + timezone.timedelta(days=365)
            self.payment_amount = self.plan.price * 12 
        super().save(*args, **kwargs)

    @property
    def is_active(self):
        return self.start_date <= timezone.now().date() <= self.end_date
    
    def __str__(self):
        return f"{self.business.name} - {self.plan.name} - {self.is_active} - {self.interval} subscription"



class Feature(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name



class SubscriptionPlan(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    features = models.ManyToManyField(Feature, related_name='plans')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name




"""   Category   """
class Category(models.Model):
    name = models.CharField(max_length=50,blank=False)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='./images/categories',blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    class Meta:
        ordering = ['name']
        verbose_name_plural = "Categories"
    
    def __str__(self) -> str:
        return self.name

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
