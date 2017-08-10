from django.conf.urls import url, include
from django.contrib import admin


from .views import (
    ProfileCreateAPIView,
    ProfileLoginAPIView,
    )


urlpatterns = [
    url(r'^register/$', ProfileCreateAPIView.as_view(), name='register'),
    url(r'^login/$', ProfileLoginAPIView.as_view(), name='login'),

]
