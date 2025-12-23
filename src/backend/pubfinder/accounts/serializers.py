from rest_framework import serializers

from accounts.models import Pub

class PubSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pub
        fields = ["id", "name", "longitude", "latitude"]