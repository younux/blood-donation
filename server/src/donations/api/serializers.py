import datetime, re
from rest_framework import serializers
from ..models import Donation
from accounts.api.serializers import ProfileDetailSerializer


class DonationSerializer(serializers.ModelSerializer):
    """
        Donation Serializer

        Extends ModelSerializer
    """
    applicant = ProfileDetailSerializer(read_only = True)
    blood_type = serializers.SerializerMethodField(read_only = True)
    url = serializers.HyperlinkedIdentityField(
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
        """
            Gets blood type from donation object instance
        """
        return obj.get_blood_type()

    def validate_deadline(self, value):
        """
            Custom deadline validation
        """
        current_datetime = datetime.datetime.now()
        if value.timestamp() <= current_datetime.timestamp():
            raise serializers.ValidationError("This deadline is in the past, please enter a valid one")
        return value

    def validate_phone_number(self, value):
        """
            Custom phone number validation
        """
        phone_re = re.compile(r'^(0|\+212|00212)[1-9][0-9]{8}$')
        if phone_re.match(value) is None:
            raise serializers.ValidationError("The phone number must be valid (0X-XX-XX-XX-XX or +212 X-XX-XX-XX-XX or 00212 X-XX-XX-XX-XX where X is a digit)")
        return value



