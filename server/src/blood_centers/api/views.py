from django.db.models import Q
from rest_framework.generics import (
    CreateAPIView,
    ListAPIView,
    RetrieveUpdateDestroyAPIView,
)
from ..models import BloodCenter
from .serializers import BloodCenterSerializer
from rest_framework.response import Response
from rest_framework.status import (
        HTTP_201_CREATED,
        )
from posts.api.permissions import IsModerator, IsModeratorOrReadOnly
from .paginations import BloodCenterPageNumberPagination


class BloodCenterCreateAPIView(CreateAPIView):
    """
        API View for creating a new blood center
    """
    queryset = BloodCenter.objects.all()
    serializer_class = BloodCenterSerializer
    permission_classes = [IsModerator]

    def post(self, request, *args, **kwargs):
        """
            Post Method

            Implements Post method that saves blood center in database
        """
        data = request.data
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        # Calling .save() will either create a new instance, or update an existing instance, depending on if an
        # existing instance was passed when instantiating the serializer class:
        blood_center_obj = serializer.save()
        return Response(data=serializer.data, status=HTTP_201_CREATED)

class BloodCenterListAPIView(ListAPIView):
    """
        API View for listing blood centers
    """
    queryset = BloodCenter.objects.all()
    serializer_class = BloodCenterSerializer
    #permission_classes = [IsModerator]
    pagination_class = BloodCenterPageNumberPagination

    def get_queryset(self, *args, **kwargs):
        """
            Overrides get_queryset to filter queryset using query params.

            The used query_params while filtering are blood center name, city, country and zip code

            Example :   /api/blood_centers/?name=centre&city=Marrakech&country=Maroc&zipCode=40000
        """
        queryset_list = BloodCenter.objects.all()
        # filter by blood center name
        name = self.request.query_params.get('name', None)
        if name:
            queryset_list = queryset_list.filter(name__icontains=name)
        # filter by blood center city
        city = self.request.query_params.get('city', None)
        if city:
            queryset_list = queryset_list.filter(address__city__icontains=city)
        # filter by blood center country
        country = self.request.query_params.get('country', None)
        if country:
            queryset_list = queryset_list.filter(address__country__icontains=country)
        # filter by blood center zip code
        zip_code = self.request.query_params.get('zipCode', None)
        if zip_code:
            queryset_list = queryset_list.filter(address__zip_code__exact=zip_code)
        # filter by blood center min latitude
        min_lat = self.request.query_params.get('minLat', None)
        if min_lat:
            queryset_list = queryset_list.filter(latitude__gte=float(min_lat))
        # filter by blood center max latitude
        max_lat = self.request.query_params.get('maxLat', None)
        if max_lat:
            queryset_list = queryset_list.filter(latitude__lte=float(max_lat))
        # filter by blood center min longitude
        min_lng = self.request.query_params.get('minLng', None)
        if min_lng:
            queryset_list = queryset_list.filter(longitude__gte=float(min_lng))
        # filter by blood center max longitude
        max_lng = self.request.query_params.get('maxLng', None)
        if max_lng:
            queryset_list = queryset_list.filter(longitude__lte=float(max_lng))

        return queryset_list.distinct()

    def paginate_queryset(self, *args, **kwargs):
        """
            Overrides paginate_queryset to disable pagination dynamically

            If noPage is present as a query parameter, the pagination is disabled
        """

        if('noPage' in self.request.query_params):
            return None
        else:
            return super(BloodCenterListAPIView, self).paginate_queryset(*args, **kwargs)




class BloodCenterRetrieveUpdateDeleteAPIView(RetrieveUpdateDestroyAPIView):
    """
        API View for retrieving, updating or deleting a blood center
    """
    queryset = BloodCenter.objects.all()
    serializer_class = BloodCenterSerializer
    permission_classes = [IsModeratorOrReadOnly]

