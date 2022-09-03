from django.contrib.auth.models import AbstractUser

from django.db import models

# Create your models here.
class Affiliation(models.Model):
    name = models.CharField(max_length=128)
    city = models.CharField(max_length=128, blank=True, null=True)
    state = models.CharField(max_length=128, blank=True, null=True)
    country = models.CharField(max_length=128, blank=True, null=True)
    pincode = models.CharField(max_length=128, blank=True, null=True)

    class Meta:
        ordering = ('name', )

    def __str__(self):
        return self.name

class User(AbstractUser):
    username = models.CharField(max_length=128, blank=True, null=True)
    email = models.EmailField(unique=True)
    official_email = models.EmailField(null=True, blank=True)
    affiliation = models.ForeignKey(Affiliation, on_delete=models.DO_NOTHING, null=True, blank=True)

    profile_photo = models.ImageField(null=True, blank=True)


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name']

    class Meta:
        ordering = ('first_name',)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
