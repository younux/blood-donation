from django.conf.urls import url, include
from django.contrib import admin


from .views import (
    PostCreateAPIView,
    PostListAPIView,
    PostDetailUpdateDeleteAPIView,
    )


urlpatterns = [
    url(r'^$', PostListAPIView.as_view(), name='list'),
    url(r'^create/$', PostCreateAPIView.as_view(), name='create'),
    url(r'^(?P<slug>[\w-]+)/$', PostDetailUpdateDeleteAPIView.as_view(), name='detail-update-delete'),
]
