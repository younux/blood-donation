from django.conf.urls import url, include
from django.contrib import admin


from .views import (
    CommentCreateAPIView,
    CommentListAPIView,
    CommentDetailUpdateDeleteAPIView,
)


urlpatterns = [
    url(r'^$', CommentListAPIView.as_view(), name='list'),
    url(r'^create/$', CommentCreateAPIView.as_view(), name='create'),
    url(r'^(?P<pk>\d+)/$', CommentDetailUpdateDeleteAPIView.as_view(), name='detail-update-delete'),
]
