from rest_framework.generics import (
    GenericAPIView,
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
from rest_framework.response import Response
from rest_framework.status import (
        HTTP_200_OK,
        HTTP_400_BAD_REQUEST,
        HTTP_201_CREATED,
        )
from django.db.models import Q


from .serializers import (
    DonationSerializer,
)
from .permissions import (
    IsDonationOwnerOrReadOnly,
)
from ..models import Donation
from accounts.models import User

from .emails import notify_by_email
from .sms import notify_by_sms
from .paginations import DonationPageNumberPagination

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
        applicant = User.objects.filter(username = self.request.user.username).first()
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
        # sending notifications sms.
        # sending sms can throw exceptions :
        try:
            notify_by_sms(donation_obj)
        except Exception as e:
            print("Exception on notify_by_sms function \n"
                        " - str(e) : ==> " + str(e) + "\n"
                        " - Type(e) : ==> " + str(type(e)) + "\n"
                        " - repr(e) : ==> " + str(repr(e)) + "\n"
                        " - e.args : ==> " + str(e.args))


class DonationListAPIView(ListAPIView):
    """
        Donation List API View

        Extends ListAPIView. This view handles donation listing process.
    """
    serializer_class = DonationSerializer
    pagination_class = DonationPageNumberPagination
    # For filtering (search, order, ...) see : http://www.django-rest-framework.org/api-guide/filtering/
    # General search : http://127.0.0.1:8000/api/donations/?search=alex&ordering=-city
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['applicant__username', 'applicant__email',
                     'applicant__first_name', 'applicant__last_name',
                     'applicant__blood_type', 'deadline', 'city',
                     ]
    ordering_fields = ['deadline', 'created_on']
    ordering = ['deadline'] # This is the defaul ordering. It also prevents from having the warning :
    # /Users/younes/Projects/blood-donation-platform/server/lib/python3.6/site-packages/rest_framework/pagin
    # ation.py:208: UnorderedObjectListWarning: Pagination may yield inconsistent results with an unordered
    # object_list: <class 'donations.models.Donation'> QuerySet.paginator =
    # self.django_paginator_class(queryset, page_size)
    permission_classes = [AllowAny]

    def list(self, request, *args, **kwargs):
        """
            Override list(self, request, *args, **kwargs) to add blood type count to returned data
        """
        response = super(DonationListAPIView, self).list(request, *args, **kwargs)
        queryset_list = self.get_queryset(*args, **kwargs)
        # Counting donations by blood type
        blood_type_count = {}
        blood_type_count['A_plus'] = queryset_list.filter(applicant__blood_type='A+').count()
        blood_type_count['A_minus'] = queryset_list.filter(applicant__blood_type='A-').count()
        blood_type_count['B_plus'] = queryset_list.filter(applicant__blood_type='B+').count()
        blood_type_count['B_minus'] = queryset_list.filter(applicant__blood_type='B-').count()
        blood_type_count['AB_plus'] = queryset_list.filter(applicant__blood_type='AB+').count()
        blood_type_count['AB_minus'] = queryset_list.filter(applicant__blood_type='AB-').count()
        blood_type_count['O_plus'] = queryset_list.filter(applicant__blood_type='O+').count()
        blood_type_count['O_minus'] = queryset_list.filter(applicant__blood_type='O-').count()
        # add the count to the returned response data
        response.data['blood_type_count'] = blood_type_count
        return response


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
        blood_types_query_param = self.request.query_params.get('bloodType', None)
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

