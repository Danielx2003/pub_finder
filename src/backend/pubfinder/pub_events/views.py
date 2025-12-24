from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from django.shortcuts import get_object_or_404

from pub_events.models import PubEvent
from pub_events.serializers import PubEventSerializer

class PubEventListView(APIView):
    def get(self, request):
        pub_events = PubEvent.objects.all()

        serializer = PubEventSerializer(pub_events, many=True)
        print("")

        return Response(serializer.data, status=status.HTTP_200_OK)
    

class PubEventCreateView(APIView):
    def post(self, request):
        serializer = PubEventSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        if PubEvent.objects.filter(pub_id=request.data['pub_id'], event_id=request.data['event_id']):
            return Response({"Message": "Pub already registered for this event"}, status=status.HTTP_409_CONFLICT)

        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)