from rest_framework.generics import (
        CreateAPIView,
        )
from rest_framework.permissions import (
    AllowAny,
    IsAdminUser,
    IsAuthenticated,
    IsAuthenticatedOrReadOnly,
    )
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework.views import APIView

from ..models import Profile
from django.contrib.auth.models import User


from .serializers import (
    ProfileCreateSerialzer,
    ProfileLoginSerializer,
    )


class ProfileCreateAPIView(CreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileCreateSerialzer




class ProfileLoginAPIView(APIView):
    permission_classes = [AllowAny]
    serializer_class = ProfileLoginSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = ProfileLoginSerializer(data = data)
        if serializer.is_valid(raise_exception=True):
            new_data = serializer.data
            return Response(data=new_data, status=HTTP_200_OK)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)





