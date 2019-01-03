from django.conf.urls import url, include
from django.contrib import admin


from .views import (
    BloodCenterListAPIView,
    BloodCenterCreateAPIView,
    BloodCenterRetrieveUpdateDeleteAPIView,
    )


urlpatterns = [
    url(r'^$', BloodCenterListAPIView.as_view(), name='list'),
    url(r'^create/$', BloodCenterCreateAPIView.as_view(), name='create'),
    url(r'^(?P<pk>[\w-]+)/$', BloodCenterRetrieveUpdateDeleteAPIView.as_view(), name='detail-update-delete'),
]
