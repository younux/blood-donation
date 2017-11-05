from rest_framework.generics import (
        CreateAPIView,
        GenericAPIView,
        )
from rest_framework.permissions import (
    AllowAny,
    IsAdminUser,
    IsAuthenticated,
    IsAuthenticatedOrReadOnly,
    )
from rest_framework.response import Response
from rest_framework.status import (
        HTTP_200_OK,
        HTTP_400_BAD_REQUEST,
        HTTP_201_CREATED,
        )
from rest_framework.views import APIView
from django.db.models import Q

from ..models import Profile
from .tokens_jwt import generate_token, JWT_AUTH_HEADER_PREFIX

from .serializers import (
    ProfileCreateSerialzer,
    ProfileLoginSerializer,
    )


class ProfileCreateAPIView(GenericAPIView):
    """
        Profile Create API VIEW.

        Extends GenericAPIView and defines post method.
    """
    serializer_class = ProfileCreateSerialzer

    def post(self, request, *args, **kwargs):
        """
            Post Method

            Implements Post method that saves profile in database
            and sends a token in the response header
        """
        data = request.data
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        # Calling .save() will either create a new instance, or update an existing instance, depending on if an
        # existing instance was passed when instantiating the serializer class:
        profile_obj = serializer.save()
        # update last login date
        profile_obj.update_last_login()
        # Generate Token and add it to response header
        token = generate_token(user=profile_obj)
        headers = {}
        headers['Authorization'] = JWT_AUTH_HEADER_PREFIX + " " + token
        return Response(data=serializer.data, status=HTTP_201_CREATED, headers=headers)


class ProfileLoginAPIView(GenericAPIView):
    """
        Profile Create API VIEW.

        Extends GenericAPIView and defines post method.
    """
    permission_classes = [AllowAny]
    serializer_class = ProfileLoginSerializer

    def post(self, request, *args, **kwargs):
        """
            Post Method

            Implements Post method and sends a generated token in the the response header
        """
        data = request.data
        serializer = self.get_serializer(data = data)
        serializer.is_valid(raise_exception=True)
        # update last login and Generate Token
        username = serializer.validated_data.get("username")
        email = serializer.validated_data.get("email")
        profile_obj = Profile.objects.filter(
                        Q(username=username) |
                        Q(email=email)
                    ).distinct().exclude(email__isnull=True).exclude(email__iexact='').first()
        # update last login date
        profile_obj.update_last_login()
        # Generate Token and add it to response header
        token = generate_token(user = profile_obj)
        headers = {}
        headers['Authorization'] = JWT_AUTH_HEADER_PREFIX + " " + token
        return Response(data=serializer.data, status=HTTP_200_OK, headers=headers)





