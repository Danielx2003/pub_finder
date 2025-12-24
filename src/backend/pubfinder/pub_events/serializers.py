"""PubEvent Serializers"""
from rest_framework import serializers

from pub_events.models import PubEvent

class PubEventSerializer(serializers.ModelSerializer):
    """Serializer for PubEvent"""
    class Meta:
        model = PubEvent
        fields = "__all__"
