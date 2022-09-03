from django.contrib import admin

from .models import Affiliation
from .models import User

# Register your models here.
@admin.register(Affiliation)
class AffiliationAdmin(admin.ModelAdmin):
    list_display = ('pk', 'name')

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('pk', 'first_name', 'last_name', 'affiliation')

