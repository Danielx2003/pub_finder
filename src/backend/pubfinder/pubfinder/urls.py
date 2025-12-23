from django.urls import include, path
from rest_framework import routers

from accounts import views

urlpatterns = [
    path("", include("accounts.urls")),
]