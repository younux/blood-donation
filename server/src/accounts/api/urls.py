from django.conf.urls import url, include
from django.contrib import admin


from .views import (
    ProfileCreateAPIView,
    ProfileLoginAPIView,
    ProfileActivateAPIView,
    PasswordResetRequestAPIView,
    PasswordResetVerifyAPIView,
    PasswordResetAPIView,
    PhoneCodeRequestAPIView,
    PhoneVerifyAPIView,
    )


urlpatterns = [
    url(r'^register/$', ProfileCreateAPIView.as_view(), name='register'),
    url(r'^login/$', ProfileLoginAPIView.as_view(), name='login'),
    #url(r'^activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
    #   ProfileActivateAPIView.as_view(), name='activate'),
    url(r'^activate/$', ProfileActivateAPIView.as_view(), name='activate'),
    url(r'^password-reset/request/$', PasswordResetRequestAPIView.as_view(), name='password-reset-request'),
    url(r'^password-reset/verify/$', PasswordResetVerifyAPIView.as_view(), name='password-reset-verify'),
    url(r'^password-reset/reset/$', PasswordResetAPIView.as_view(), name='password-reset-reset'),
    url(r'^phone/request-code/$', PhoneCodeRequestAPIView.as_view(), name='phone-request-code'),
    url(r'^phone/verify/$', PhoneVerifyAPIView.as_view(), name='phone-verify'),
]
