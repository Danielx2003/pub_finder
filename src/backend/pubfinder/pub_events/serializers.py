from rest_framework import serializers

from pub_events.models import PubEvent

class PubEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = PubEvent
        fields = "__all__"