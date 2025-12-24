"""Serializers for Events app"""

from rest_framework import serializers

from events.models import Event

class EventSerializer(serializers.ModelSerializer):
    """Events Serializer"""
    class Meta:
        model = Event
        fields = ["id", "name", "date_time", "sport"]
