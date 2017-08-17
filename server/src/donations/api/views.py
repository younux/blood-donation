from rest_framework.generics import (
    RetrieveAPIView,
    ListAPIView,
    CreateAPIView,
    RetrieveUpdateAPIView,
    DestroyAPIView,
)
from rest_framework.permissions import (
    AllowAny,
    IsAdminUser,
    IsAuthenticated,
    IsAuthenticatedOrReadOnly,
    )
from rest_framework.filters import SearchFilter, OrderingFilter


from .serializers import (
    DonationDetailSerializer,
    DonationListSerializer,
    DonationCreateSerializer,
)
from .permissions import (
    HasProfile,
    IsDonationOwnerOrReadOnly,
)
from ..models import Donation
from accounts.models import Profile

# Create your views here.

class DonationDetailAPIView(RetrieveAPIView):
    queryset = Donation.objects.all()
    serializer_class = DonationDetailSerializer
    permission_classes = [IsAuthenticated]

class DonationListAPIView(ListAPIView):
    queryset = Donation.objects.all()
    serializer_class = DonationListSerializer
    # search example : http://127.0.0.1:8000/api/donations/?search=alex&ordering=-city
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['applicant__user__username', 'applicant__user__email',
                     'applicant__user__first_name', 'applicant__user__last_name',
                     'applicant__blood_type', 'deadline', 'city',
                     ]
    permission_classes = []



class DonationCreateAPIView(CreateAPIView):
    queryset = Donation.objects.all()
    serializer_class = DonationCreateSerializer
    permission_classes = [HasProfile]

    def perform_create(self, serializer):
        applicant = Profile.objects.filter(user = self.request.user).first()
        serializer.save(applicant = applicant)

class DonationUpdateAPIView(RetrieveUpdateAPIView):
    queryset = Donation.objects.all()
    serializer_class = DonationCreateSerializer
    permission_classes = [IsDonationOwnerOrReadOnly]

class DonationDeleteAPIView(DestroyAPIView):
    queryset = Donation.objects.all()
    serializer_class = DonationDetailSerializer()
    permission_classes = [IsDonationOwnerOrReadOnly]

