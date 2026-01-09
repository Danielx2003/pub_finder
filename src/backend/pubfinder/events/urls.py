"""Endpoint URLs for /api/v_/events"""

from django.urls import path
from . import views

urlpatterns = [
    path("", views.EventListView.as_view(), name="get-all-events"),
    path("create", views.EventCreateView.as_view(), name="create-event"),
    path("<int:event_id>", views.EventGetView.as_view(), name="get-event-by-id")
]
