from rest_framework.pagination import LimitOffsetPagination, PageNumberPagination


class PostLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10
    max_limit = 100


class PostPageNumberPagination(PageNumberPagination):
    page_size = 10
    #page_size_query_param = "page_size"