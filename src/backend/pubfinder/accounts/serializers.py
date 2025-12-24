"""File for serializers"""

from rest_framework import serializers
from accounts.models import Pub

class PubSerializer(serializers.ModelSerializer):
    """Serializer for Pub object"""
    class Meta:
        model = Pub
        fields = ["id", "name", "longitude", "latitude"]
