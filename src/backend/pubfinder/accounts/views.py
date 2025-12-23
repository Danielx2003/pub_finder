from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from accounts.models import Pub
from accounts.serializers import PubSerializer

# class PubCreate(generics.ListCreateAPIView):
#     queryset = Pub.objects.all()
#     serializer_class = PubSerializer

class PubListView(APIView):
    def get(self, request):
        pubs = Pub.objects.all()
        serializer = PubSerializer(pubs, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
    
class PubCreateView(APIView):
    def post(self, request):
        serializer = PubSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
