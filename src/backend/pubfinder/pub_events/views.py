"""Endpoints for /Pubevent"""

# pylint: disable=missing-function-docstring

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from django.contrib.gis.geos import Point
from django.contrib.gis.measure import D

from pub_events.models import PubEvent
from pub_events.serializers import PubEventSerializer

class PubEventPagination(PageNumberPagination):
    """Custom pagination for PubEvents"""
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 1000

class PubEventListView(APIView, PubEventPagination):
    """[GET] Returns all Pubs"""
    def get(self, request):
        event_id = request.GET.get('event_id', "")
        pub_id = request.GET.get('pub_id', "")
        latitude = request.GET.get('latitude', "")
        longitude = request.GET.get('longitude', "")
        distance = request.GET.get('distance', "")

        pub_events = PubEvent.objects.all()

        if event_id:
            pub_events = pub_events.filter(event_id=event_id)

        if pub_id:
            pub_events = pub_events.filter(pub_id=pub_id)

        if latitude and longitude and distance:
            pub_events = pub_events.filter(
                pub__location__distance_lte=(
                    Point(float(longitude),float(latitude), srid=4326),
                    D(mi=float(distance))))

        pub_events = self.paginate_queryset(pub_events, request, view=self)

        serializer = PubEventSerializer(pub_events, many=True)

        return self.get_paginated_response(serializer.data)

class PubEventCreateView(APIView):
    """[POST] Creates a Pub"""
    def post(self, request):
        serializer = PubEventSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)

        if PubEvent.objects.filter(pub_id=request.data['pub_id'],
                                   event_id=request.data['event_id']):
            return Response({"Message": "Pub already registered for this event"},
                            status=status.HTTP_409_CONFLICT)

        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)
