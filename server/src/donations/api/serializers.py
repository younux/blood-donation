import datetime, re
from rest_framework.serializers import (
        ModelSerializer,
        HyperlinkedIdentityField,
        SerializerMethodField,
        ValidationError,
        )
from ..models import Donation
from accounts.api.serializers import ProfileDetailSerializer


class DonationSerializer(ModelSerializer):
    applicant = ProfileDetailSerializer(read_only = True)
    blood_type = SerializerMethodField(read_only = True)
    url = HyperlinkedIdentityField(
        view_name="donations-api:detail-update-delete",
        lookup_field="pk",
    )
    class Meta :
        model = Donation
        fields = [
            'id',
            'url',
            'created_on',
            'applicant',
            'blood_type',
            'deadline',
            'description',
            'city',
            'phone_number',
            'status',
        ]
        extra_kwargs = {
            "id": {"read_only": True},
            "created_on": {"read_only": True},
        }

    def get_blood_type(self, obj):
        return obj.get_blood_type()

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



