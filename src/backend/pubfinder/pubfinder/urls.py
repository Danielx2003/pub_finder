from django.urls import include, path
from rest_framework import routers

from accounts import views

urlpatterns = [
    path("api/v1/", include("accounts.urls")),
]