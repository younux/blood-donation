import datetime, re
from rest_framework.serializers import (
        ModelSerializer,
        HyperlinkedIdentityField,
        SerializerMethodField,
        ValidationError,
        )
from ..models import Donation
from accounts.api.serializers import ProfileDetailSerializer


class DonationDetailSerializer(ModelSerializer):
    applicant = ProfileDetailSerializer()
    blood_type = SerializerMethodField()
    class Meta :
        model = Donation
        fields = [
            #'id',
            'created_on',
            'applicant',
            'blood_type',
            'deadline',
            'description',
            'city',
            'phone_number',
            'status',
        ]
    def get_blood_type(self, obj):
        return obj.get_blood_type()

class DonationListSerializer(ModelSerializer):
    applicant_first_name = SerializerMethodField()
    applicant_last_name = SerializerMethodField()
    blood_type = SerializerMethodField()
    url = HyperlinkedIdentityField(
        view_name="donations-api:detail",
        lookup_field="pk",
    )
    class Meta :
        model = Donation
        fields = [
            #'id',
            'url',
            'created_on',
            'applicant_first_name',
            'applicant_last_name',
            'blood_type',
            'deadline',
            'city',
            'status',
        ]
    def get_blood_type(self, obj):
        return obj.get_blood_type()

    def get_applicant_first_name(self, obj):
        return obj.applicant.user.first_name

    def get_applicant_last_name(self, obj):
        return obj.applicant.user.last_name

class DonationCreateSerializer(ModelSerializer):
    class Meta:
        model = Donation
        fields = [
            'deadline',
            'description',
            'city',
            'phone_number',
            'status',
        ]

    def validate_deadline(self, value):
            current_datetime = datetime.datetime.now()
            if value.timestamp() <= current_datetime.timestamp():
                raise ValidationError("This deadline is in the past, please enter a valid one")
            return value

    def validate_phone_number(self, value):
        phone_re = re.compile(r'0\d{9}$')
        if phone_re.match(value) is None:
            raise ValidationError("Please enter a valid phone number (10 digits begining by 0)")
        return value
