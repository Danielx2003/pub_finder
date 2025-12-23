from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from events.models import Event
from events.serializers import EventSerializer

class EventListView(APIView):
    def get(self, request):
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
    

class EventCreateView(APIView):
    def post(self, request):
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)