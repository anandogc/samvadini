from django.contrib import admin

from .models import Project
from .models import Image

# Register your models here.
@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('pk', 'title')

@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    list_display = ('image',)

