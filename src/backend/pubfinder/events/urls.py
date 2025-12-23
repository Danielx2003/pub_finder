from django.urls import path
from . import views

urlpatterns = [
    path("", views.EventListView.as_view(), name="Event-view-list"),
    path("/create", views.EventCreateView.as_view(), name="Event-view-create")
]