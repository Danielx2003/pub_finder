from django.urls import include, path
from rest_framework import routers

from accounts import views

urlpatterns = [
    path("api/v1/pub", include("accounts.urls")),
    path("api/v1/event", include("events.urls")),
    path("api/v1/pub-event", include("pub_events.urls")),
]