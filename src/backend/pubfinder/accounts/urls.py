"""File for url endpoint patterns"""

from django.urls import path
from . import views


urlpatterns = [
    path("", views.PubListView.as_view(), name="get-pubs"),
    path("create", views.PubCreateView.as_view(), name="create-pub"),
    path("<int:pub_id>", views.PubGetByIdView.as_view(), name="get-pub-by-id")
]
