from django.contrib import admin
from .models import Credentials,Token
from django.contrib.auth.admin import UserAdmin
from .models import Credentials


# Register your models here.
admin.site.register(Credentials)
admin.site.register(Token)