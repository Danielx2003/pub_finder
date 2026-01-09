"""URLs for API"""

from django.urls import include, path

urlpatterns = [
    path("api/v1/pub/", include("accounts.urls")),
    path("api/v1/event/", include("events.urls")),
    path("api/v1/pub-event/", include("pub_events.urls")),
]
