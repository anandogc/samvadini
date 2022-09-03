from django.contrib import admin

from .models import Project
from .models import Part

# Register your models here.
@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('pk', 'title', 'category', 'owner')

@admin.register(Part)
class PartAdmin(admin.ModelAdmin):
    list_display = ('pk', 'label', 'category', 'of', 'owner')

