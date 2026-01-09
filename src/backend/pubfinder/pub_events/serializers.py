"""PubEvent Serializers"""
from rest_framework import serializers

from pub_events.models import PubEvent
from accounts.models import Pub
from events.models import Event
from accounts.serializers import PubSerializer
from events.serializers import EventSerializer

class PubEventSerializer(serializers.ModelSerializer):
    """Serializer for PubEvent"""

    pub = PubSerializer(read_only=True)
    event = EventSerializer(read_only=True)

    pub_id = serializers.PrimaryKeyRelatedField(
        queryset=Pub.objects.all(),
        source="pub",
        write_only=True
    )
    event_id = serializers.PrimaryKeyRelatedField(
        queryset=Event.objects.all(),
        source="event",
        write_only=True
    )

    class Meta:
        model = PubEvent
        fields = [
            "id",
            "pub",
            "event",
            "pub_id",
            "event_id",
        ]
