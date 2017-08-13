from django.conf.urls import url, include
from django.contrib import admin


from .views import (
    DonationDetailAPIView,
    DonationListAPIView,
    DonationCreateAPIView,
    DonationUpdateAPIView,
    DonationDeleteAPIView,
    )


urlpatterns = [
    url(r'^$', DonationListAPIView.as_view(), name='list'),
    url(r'^create/$', DonationCreateAPIView.as_view(), name='create'),
    url(r'^(?P<pk>[\w-]+)/$', DonationDetailAPIView.as_view(), name='detail'),
    url(r'^(?P<pk>[\w-]+)/update/$', DonationUpdateAPIView.as_view(), name='update'),
    url(r'^(?P<pk>[\w-]+)/delete/$', DonationDeleteAPIView.as_view(), name='delete'),
]
