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


from ..models import Profile
from .utils import generate_token, JWT_AUTH_HEADER_PREFIX

from .serializers import (
    ProfileCreateSerialzer,
    ProfileLoginSerializer,
    )


class ProfileCreateAPIView(GenericAPIView):
    serializer_class = ProfileCreateSerialzer

    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        # Calling .save() will either create a new instance, or update an existing instance, depending on if an
        # existing instance was passed when instantiating the serializer class:
        profile_obj = serializer.save()
        # Generate Token and add it to response header
        token = generate_token(user=profile_obj)
        headers = {}
        headers['Authorization'] = JWT_AUTH_HEADER_PREFIX + " " + token
        return Response(data=serializer.data, status=HTTP_201_CREATED, headers=headers)


class ProfileLoginAPIView(GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = ProfileLoginSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = self.get_serializer(data = data)
        serializer.is_valid(raise_exception=True)
        # Generate Token and add it to response header
        username = serializer.validated_data.get("username")
        email = serializer.validated_data.get("email")
        token = generate_token(
                user = None,
                username = username,
                email = email,
                )
        headers = {}
        headers['Authorization'] = JWT_AUTH_HEADER_PREFIX + " " + token
        return Response(data=serializer.data, status=HTTP_200_OK, headers=headers)





