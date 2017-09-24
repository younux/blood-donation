from rest_framework.generics import (
    RetrieveAPIView,
    ListAPIView,
    CreateAPIView,
    RetrieveUpdateAPIView,
    DestroyAPIView,
    RetrieveUpdateDestroyAPIView
)
from rest_framework.permissions import (
    AllowAny,
    IsAdminUser,
    IsAuthenticated,
    IsAuthenticatedOrReadOnly,
    )
from rest_framework.filters import SearchFilter, OrderingFilter
from django.db.models import Q


from .serializers import (
    DonationSerializer,
)
from .permissions import (
    IsDonationOwnerOrReadOnly,
)
from ..models import Donation
from accounts.models import Profile

# Create your views here.

class DonationCreateAPIView(CreateAPIView):
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        applicant = Profile.objects.filter(username = self.request.user.username).first()
        serializer.save(applicant = applicant)

class DonationListAPIView(ListAPIView):
    # queryset = Donation.objects.all()
    serializer_class = DonationSerializer
    # General search : http://127.0.0.1:8000/api/donations/?search=alex&ordering=-city
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['applicant__username', 'applicant__email',
                     'applicant__first_name', 'applicant__last_name',
                     'applicant__blood_type', 'deadline', 'city',
                     ]
    permission_classes = []

    # Specific Search : http://127.0.0.1:6001/api/donations/?applicantUsername=user1
    #   http://127.0.0.1:6001/api/donations/?status=urg&bloodType=AB%2B&city=casablanca
    def get_queryset(self, *args, **kwargs):
        queryset_list = Donation.objects.all()
        applicant_username = self.request.query_params.get('applicantUsername', None)
        if applicant_username:
            queryset_list = queryset_list.filter(applicant__username = applicant_username).distinct()
        blood_type = self.request.query_params.get('bloodType', None)
        if blood_type:
            queryset_list = queryset_list.filter(applicant__blood_type = blood_type)
        city = self.request.query_params.get('city', None)
        if city:
            queryset_list = queryset_list.filter(city__contains = city)
        status = self.request.query_params.get('status', None)
        if status:
            queryset_list = queryset_list.filter(status__contains=status)
        # query = self.request.query_params.get('q', None)
        # if query:
        #     queryset_list = queryset_list.filter(
        #         Q(content__icontains = query)|
        #         Q(user__first_name__icontains = query)|
        #         Q(user__last_name__icontains = query)
        #     ).distinct()
        return queryset_list


class DonationDetailUpdateDeleteAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer
    permission_classes = [IsAuthenticated, IsDonationOwnerOrReadOnly]

