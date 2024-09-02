# models.py
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager
from django.db import models
import uuid

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        """Create and return a user with an email, password, and other fields."""
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, password=password, **extra_fields)
        user.save(using=self._db)
        return user


class Credentials(AbstractBaseUser):
    email = models.EmailField(unique=True)
    account_type = models.CharField(max_length=20,default="basic", choices=[
        ('basic', 'basic'),
        ('business', 'Business'),
    ])

    objects = CustomUserManager()
    

    USERNAME_FIELD = 'email'


class Token(models.Model):
    key = models.CharField(max_length=40, primary_key=True, default=uuid.uuid4)
    user = models.ForeignKey(Credentials, related_name='auth_tokens', on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['user']
        verbose_name_plural = "Tokens"

    def __str__(self):
        return self.key
