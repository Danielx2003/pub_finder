"""CustomPagination file"""

from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

# pylint: disable=too-few-public-methods

class CustomPagination(PageNumberPagination):
    """Custom pagination for APIs"""
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 1000

    def get_paginated_response(self, data):
        """Overrides the PageNumberPagination default response"""
        return Response({
            '_metadata': {
                'current_page': self.get_page_number(self.request, self),
                'page_size': self.page_size,
                'total_count': self.page.paginator.count,
                'total_pages': self.page.paginator.num_pages,
            },
            'data': data
        })
