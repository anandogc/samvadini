from django.contrib import admin
from django.urls import path, include

import paper.views as views

urlpatterns = [
    path('upload_image', views.upload_image, name="upload_image"),
    path('get_images', views.get_images, name="get_images"),
    path('save', views.save, name="save"),
    path('save_config', views.save_config, name="save_config"),
    path('edit', views.edit),
]
