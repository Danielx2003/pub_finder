from django.urls import path
from . import views

urlpatterns = [
    path("", views.PubEventListView.as_view(), name="Pub-Event-view-list"),
    path("/create", views.PubEventCreateView.as_view(), name="Pub-Event-view-create"),
]