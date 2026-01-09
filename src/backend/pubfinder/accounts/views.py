"""File for API Endpoints"""

# pylint: disable=missing-function-docstring

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from django.shortcuts import get_object_or_404

from accounts.models import Pub
from accounts.serializers import PubSerializer

class PubListView(APIView):
    """[GET] - Returns all Pub objects"""
    def get(self, request):
        pubs = Pub.objects.all()
        serializer = PubSerializer(pubs, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

class PubCreateView(APIView):
    """[POST] - Creates a new Pub"""
    def post(self, request):
        serializer = PubSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class PubGetByIdView(APIView):
    """[GET] Return single Pub by ID"""
    def get(self, request, pub_id):
        event = get_object_or_404(Pub, id=pub_id)
        serializer = PubSerializer(event)
        return Response(serializer.data, status=status.HTTP_200_OK)
