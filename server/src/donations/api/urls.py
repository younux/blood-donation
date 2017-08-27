from django.conf.urls import url, include
from django.contrib import admin


from .views import (
    DonationListAPIView,
    DonationCreateAPIView,
    DonationDetailUpdateDeleteAPIView
    )


urlpatterns = [
    url(r'^$', DonationListAPIView.as_view(), name='list'),
    url(r'^create/$', DonationCreateAPIView.as_view(), name='create'),
    url(r'^(?P<pk>[\w-]+)/$', DonationDetailUpdateDeleteAPIView.as_view(), name='detail-update-delete'),
]
