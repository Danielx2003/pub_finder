"""Endpoints for Events"""

# pylint: disable=missing-function-docstring

from datetime import datetime

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import PageNumberPagination

from django.shortcuts import get_object_or_404

from events.models import Event
from events.serializers import EventSerializer

class EventPagination(PageNumberPagination):
    """Custom pagination for PubEvents"""
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 1000

    def get_paginated_response(self, data):
        return Response({
            '_metadata': {
                'current_page': self.get_page_number(self.request, self),
                'page_size': self.page_size,
                'total_count': self.page.paginator.count,
                'total_pages': self.page.paginator.num_pages,
            },
            'data': data
        })


class EventListView(APIView, EventPagination):
    """[GET] Returns all Events"""
    def get(self, request):
        name = request.GET.get('name', "")
        sport = request.GET.get('sport', "")
        sort_by = request.GET.get('sort_by', "")
        start = request.GET.get('start', "")

        queryset = Event.objects.all()

        if name:
            queryset = queryset.filter(name__contains=name)

        if sport:
            queryset = queryset.filter(sport=sport)

        if sort_by:
            queryset = queryset.order_by(sort_by)

        if start:
            try:
                date_time = datetime.strptime(start, '%Y-%m-%d %H:%M')
            except ValueError:
                return Response({
                    'message': 
                    'Invalid start date provided. Must be in the format YYYY-MM-DD HH:mm'}, 
                    status=status.HTTP_400_BAD_REQUEST)

            queryset = queryset.filter(date_time__gte=date_time)

        queryset = queryset.order_by('date_time')

        page = self.paginate_queryset(queryset, request, view=self)

        serializer = EventSerializer(page, many=True)

        return self.get_paginated_response(serializer.data)

class EventCreateView(APIView):
    """[POST] Create an Event"""
    def post(self, request):
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EventGetView(APIView):
    """[GET] Return single Event by ID"""
    def get(self, request, event_id):
        event = get_object_or_404(Event, id=event_id)
        serializer = EventSerializer(event)
        return Response(serializer.data, status=status.HTTP_200_OK)
