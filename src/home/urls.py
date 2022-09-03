from django.urls import path

import home.views as views

urlpatterns = [
    path('', views.index),
    path('profile', views.profile),
    path('signin', views.signin),
    path('signout', views.signout),
    path('signup', views.signup),
]