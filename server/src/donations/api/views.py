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
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer
    # search example : http://127.0.0.1:8000/api/donations/?search=alex&ordering=-city
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['applicant__username', 'applicant__email',
                     'applicant__first_name', 'applicant__last_name',
                     'applicant__blood_type', 'deadline', 'city',
                     ]
    permission_classes = []


class DonationDetailUpdateDeleteAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer
    permission_classes = [IsAuthenticated, IsDonationOwnerOrReadOnly]

