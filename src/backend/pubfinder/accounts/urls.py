from django.urls import path
from . import views

urlpatterns = [
    path("pub/", views.PubListView.as_view(), name="Pub-view-list"),
    path("pub/create/", views.PubCreateView.as_view(), name="Pub-view-create")
]