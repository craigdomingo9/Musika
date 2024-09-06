from django.db import models
from authentications.models import Credentials
# Create your models here.


class Profile(models.Model):
    credentials = models.OneToOneField(Credentials,on_delete=models.CASCADE,primary_key=True,related_name="profile")
    first_name = models.CharField(null=True,max_length=30)
    last_name = models.CharField(null=True,max_length=30)
    gender = models.CharField(null=True,max_length=30)
    age = models.CharField(default=18,null=True,max_length=30)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    profile_picture = models.ImageField(upload_to="./images/profiles")
    address = models.CharField(max_length=255,blank=True,null=True)
    city = models.CharField(max_length=30)
    country = models.CharField(default="Zimbabwe",max_length=30,blank=True)
    date_of_birth = models.DateField(blank=True, null=True)


    def __str__(self) -> str:
        return f"{self.first_name}, {self.last_name}"
