from rest_framework.pagination import PageNumberPagination
from django.conf import settings


class DonationPageNumberPagination(PageNumberPagination):
    page_size = settings.DONATION_LIST_PAGE_SIZE
