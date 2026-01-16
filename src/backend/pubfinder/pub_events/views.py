"""Endpoints for /Pubevent"""

# pylint: disable=missing-function-docstring

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from django.contrib.gis.geos import Point
from django.contrib.gis.measure import D
from django.contrib.gis.db.models.functions import GeometryDistance

from pub_events.models import PubEvent
from pub_events.serializers import PubEventSerializer

from ..shared.custom_pagination import CustomPagination


class PubEventListView(APIView, CustomPagination):
    """[GET] Returns all pub events"""

    def get(self, request):
        params = request.GET

        event_id = params.get("event_id")
        pub_id = params.get("pub_id")
        latitude = params.get("latitude")
        longitude = params.get("longitude")
        distance = params.get("distance")

        queryset = PubEvent.objects.all()

        if event_id:
            queryset = queryset.filter(event_id=event_id)

        if pub_id:
            queryset = queryset.filter(pub_id=pub_id)

        if latitude and longitude and distance:
            location = Point(
                float(longitude),
                float(latitude),
                srid=4326,
            )
            queryset = (
                queryset.filter(
                    pub__location__distance_lte=(
                        location,
                        D(mi=float(distance)),
                    )
                )
                .annotate(
                    distance=GeometryDistance("pub__location", location)
                )
                .order_by("distance")
            )
        else:
            queryset = queryset.order_by('id')

        page = self.paginate_queryset(queryset, request, view=self)

        serializer = PubEventSerializer(page, many=True)

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
