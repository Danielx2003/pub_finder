# from django.contrib.auth.models import Group, User
from rest_framework import permissions, viewsets, generics

from accounts.models import Pub
from accounts.serializers import PubSerializer

class PubCreate(generics.ListCreateAPIView):
    queryset = Pub.objects.all()
    serializer_class = PubSerializer