from rest_framework.pagination import PageNumberPagination
from django.conf import settings

class CommentPageNumberPagination(PageNumberPagination):
    page_size = settings.COMMENT_LIST_PAGE_SIZE
