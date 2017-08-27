"""blood_donation_platform URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from rest_framework_jwt.views import (
        obtain_jwt_token,
        refresh_jwt_token,
        verify_jwt_token,
        )
from rest_framework.documentation import include_docs_urls
from rest_framework_swagger.views import get_swagger_view



urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    # url(r'^api/auth/token/', obtain_jwt_token),
    # url(r'^api/auth/token-refresh/', refresh_jwt_token),
    # url(r'^api/auth/token-verify/', verify_jwt_token),
    url(r'^api/accounts/', include('accounts.api.urls', namespace='accounts-api')),
    url(r'^api/donations/', include('donations.api.urls', namespace='donations-api')),

    # DRF docs
    url(r'^docs/', include_docs_urls(title='My API title')),
    # Swagger docs
    url(r'^swagger/$', get_swagger_view(title='My API title')),
]
