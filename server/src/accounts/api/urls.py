from django.conf.urls import url, include
from django.contrib import admin


from .views import (
    UserCreateAPIView,
    UserLoginAPIView,
    UserActivateAPIView,
    PasswordResetRequestAPIView,
    PasswordResetVerifyAPIView,
    PasswordResetAPIView,
    PhoneCodeRequestAPIView,
    PhoneVerifyAPIView,
    )


urlpatterns = [
    url(r'^register/$', UserCreateAPIView.as_view(), name='register'),
    url(r'^login/$', UserLoginAPIView.as_view(), name='login'),
    #url(r'^activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
    #   UserActivateAPIView.as_view(), name='activate'),
    url(r'^activate/$', UserActivateAPIView.as_view(), name='activate'),
    url(r'^reset-password/request/$', PasswordResetRequestAPIView.as_view(), name='reset-password-request'),
    url(r'^reset-password/verify/$', PasswordResetVerifyAPIView.as_view(), name='reset-password-verify'),
    url(r'^reset-password/reset/$', PasswordResetAPIView.as_view(), name='reset-password-reset'),
    url(r'^phone/request-code/$', PhoneCodeRequestAPIView.as_view(), name='phone-request-code'),
    url(r'^phone/verify/$', PhoneVerifyAPIView.as_view(), name='phone-verify'),
]
