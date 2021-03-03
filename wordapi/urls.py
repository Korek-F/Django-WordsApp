from django.contrib import admin
from django.urls import path
from . import views


urlpatterns = [
    path('overview', views.apiOverview, name="overview"),
    path('get-word', views.getWord, name="get-word"),
    path('update-status/<int:pk>', views.updateStatus, name="update-status"),
    path('', views.mainPage, name="main"),
    path('register', views.RegisterView.as_view(), name="register"),
]

