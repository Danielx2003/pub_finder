"""File for serializers"""

from rest_framework import serializers
from django.contrib.gis.geos import Point
from accounts.models import Pub

class PubSerializer(serializers.ModelSerializer):
    """Serializer for Pub object"""

    latitude = serializers.FloatField(write_only=True)
    longitude = serializers.FloatField(write_only=True)
    latitude_read = serializers.SerializerMethodField()
    longitude_read = serializers.SerializerMethodField()

    class Meta:
        model = Pub
        fields = ['id', 'name', 'latitude', 'longitude', 'latitude_read', 'longitude_read']

    def create(self, validated_data):
        lat = validated_data.pop('latitude')
        lon = validated_data.pop('longitude')
        validated_data['location'] = Point(lon, lat)
        return super().create(validated_data)

    def get_latitude_read(self, obj):
        return obj.location.y

    def get_longitude_read(self, obj):
        return obj.location.x
