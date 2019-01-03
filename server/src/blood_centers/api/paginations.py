from rest_framework.pagination import PageNumberPagination
from django.conf import settings

class BloodCenterPageNumberPagination(PageNumberPagination):
    page_size = settings.BLOOD_CENTER_LIST_PAGE_SIZE