from django.urls import path
from . import views

urlpatterns = [
    path("pub/", views.PubCreate.as_view(), name="Pub-view-create")
]