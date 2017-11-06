from django.conf.urls import url, include
from django.contrib import admin


from .views import (
    ProfileCreateAPIView,
    ProfileLoginAPIView,
    )


urlpatterns = [
    url(r'^register/$', ProfileCreateAPIView.as_view(), name='register'),
    url(r'^login/$', ProfileLoginAPIView.as_view(), name='login'),
    # url(r'^activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$', name='activate'),
]
