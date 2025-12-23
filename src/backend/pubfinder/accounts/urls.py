from django.urls import path
from . import views

urlpatterns = [
    path("", views.PubListView.as_view(), name="Pub-view-list"),
    path("/create", views.PubCreateView.as_view(), name="Pub-view-create")
]