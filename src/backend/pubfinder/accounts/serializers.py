"""File for serializers"""

from rest_framework import serializers
from django.contrib.gis.geos import Point
from accounts.models import Pub

class PubSerializer(serializers.ModelSerializer):
    """Serializer for Pub"""

    latitude = serializers.FloatField(write_only=True, required=True)
    longitude = serializers.FloatField(write_only=True, required=True)

    class Meta:
        model = Pub
        fields = ['id', 'name', 'latitude', 'longitude']

    def create(self, validated_data):
        lat = validated_data.pop('latitude')
        lon = validated_data.pop('longitude')
        validated_data['location'] = Point(lon, lat)
        return super().create(validated_data)

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['latitude'] = instance.location.y
        data['longitude'] = instance.location.x
        return data
