from django.conf.urls import url, include
from django.contrib import admin


from .views import (
    CommentDetailAPIView,
    CommentCreateAPIView,
    CommentListAPIView,
    )


urlpatterns = [
    url(r'^$', CommentListAPIView.as_view(), name='list'),
    url(r'^create/$', CommentCreateAPIView.as_view(), name='create'),
    url(r'^(?P<pk>\d+)/$', CommentDetailAPIView.as_view(), name='detail'),
    # url(r'^(?P<pk>\d+)/edit/$', CommentEditAPIView.as_view(), name='edit')

]
