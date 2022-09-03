from django.contrib import admin
from django.urls import path, include
from django.views.decorators.csrf import csrf_exempt

import scientific.views as views

urlpatterns = [
    # path('upload_image', views.upload_image, name="upload_image"),
    # path('get_images', views.get_images, name="get_images"),
    path('save', views.save, name="save"),
    path('save_config', views.save_config, name="save_config"),
    path('edit', views.edit),

    # REST API
    path('get_projects/<str:category>', views.get_projects),
    path('get_project/<int:id>', views.get_project),
    path('get_part/<int:id>', views.get_part),
    path('put_part', csrf_exempt(views.put_part))
]
