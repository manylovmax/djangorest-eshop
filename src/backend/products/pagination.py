from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

class CustomPagination(PageNumberPagination):
    def get_paginated_response(self, data):
        return Response({
            'count': self.page.paginator.count,
            # 'page': self.get_page_number(),
            'pages': self.page.paginator.num_pages,
            'pageNumber': self.page.number,
            'hasPrevious': self.page.has_previous(),
            'hasNext': self.page.has_next(),
            'results': data
        })