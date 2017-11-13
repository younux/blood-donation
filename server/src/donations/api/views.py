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

from .emails import notify_by_email
from .sms import notify_by_sms


# Create your views here.

class DonationCreateAPIView(CreateAPIView):
    """
        Donation Create API View

        Extends CreatdAPIView and overrides perform_create. This view handles the creation process
    """
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        """
            Overrides perform_create(self, serializer) called by CreateModelMixin when saving a new object instance.

            CreateAPIView extends CreateModelMixin so it calls perform_create.
        """
        applicant = Profile.objects.filter(username = self.request.user.username).first()
        donation_obj = serializer.save(applicant = applicant)
        # sending notifications emails.
        # sending email can throw exceptions :
        try:
            notify_by_email(donation_obj)
        except Exception as e:
            print("Exception on notify_by_email function \n"
                        " - str(e) : ==> " + str(e) +"\n"
                        " - Type(e) : ==> " + str(type(e))  +"\n"
                        " - repr(e) : ==> " + str(repr(e)) +"\n"
                        " - e.args : ==> " + str(e.args))
        # # sending notifications sms.
        # # sending sms can throw exceptions :
        # try:
        #     notify_by_sms(donation_obj)
        # except Exception as e:
        #     print("Exception on notify_by_sms function \n"
        #                 " - str(e) : ==> " + str(e) + "\n"
        #                 " - Type(e) : ==> " + str(type(e)) + "\n"
        #                 " - repr(e) : ==> " + str(repr(e)) + "\n"
        #                 " - e.args : ==> " + str(e.args))


class DonationListAPIView(ListAPIView):
    """
        Donation List API View

        Extends ListAPIView. This view handles donation listing process.
    """
    # queryset = Donation.objects.all()
    serializer_class = DonationSerializer
    # General search : http://127.0.0.1:8000/api/donations/?search=alex&ordering=-city
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['applicant__username', 'applicant__email',
                     'applicant__first_name', 'applicant__last_name',
                     'applicant__blood_type', 'deadline', 'city',
                     ]
    permission_classes = []

    def get_queryset(self, *args, **kwargs):
        """
            Overrides get_queryset to filter queryset using query params.

            The used query_params while filtering are donation city, donation status, applicant bloodtype,
             applicant username, keyword
            Example :   /api/donations/?city=Marrakech&keyWord=description&bloodTypes=APlus_AMinus_BPlus
                        /api/donations/?username=user1
                        /api/donations/?username=user1&city=marrakech&keyWord=sasas&bloodTypes=APlus_ABMinus_OPlus_OMinus
        """
        queryset_list = Donation.objects.all()
        # filter by donation city
        city = self.request.query_params.get('city', None)
        if city:
            queryset_list = queryset_list.filter(city__icontains = city)
        # filter by donation status
        status = self.request.query_params.get('status', None)
        if status:
            queryset_list = queryset_list.filter(status__icontains=status)
        # filter by applicant bloodtype
        blood_types_query_param = self.request.query_params.get('bloodTypes', None)
        if blood_types_query_param:
            blood_types = blood_types_query_param.replace('Plus', '+').replace('Minus', '-').split('_')
            queryset_list = queryset_list.filter(applicant__blood_type__in=blood_types)
        # filter by applicant username
        applicant_username = self.request.query_params.get('username', None)
        if applicant_username:
            queryset_list = queryset_list.filter(applicant__username = applicant_username)
        # filter by keyword
        keyWord = self.request.query_params.get('keyWord', None)
        if keyWord:
            queryset_list = queryset_list.filter(
                Q(description__icontains=keyWord) |
                Q(city__icontains=keyWord) |
                Q(status__icontains=keyWord) |
                Q(applicant__blood_type__icontains=keyWord) |
                Q(applicant__username__icontains = keyWord) |
                Q(applicant__first_name__icontains=keyWord) |
                Q(applicant__last_name__icontains=keyWord)
            ).distinct()
        return queryset_list


class DonationDetailUpdateDeleteAPIView(RetrieveUpdateDestroyAPIView):
    """
        Donation Detail Update Delete API View

        Extends RetrieveUpdateDestroyAPIView. This view handles getting details, updating
        and
    """
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer
    permission_classes = [IsAuthenticated, IsDonationOwnerOrReadOnly]





