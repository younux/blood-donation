from rest_framework.pagination import PageNumberPagination
from django.conf import settings

class PostPageNumberPagination(PageNumberPagination):
    page_size = settings.POST_LIST_PAGE_SIZE
