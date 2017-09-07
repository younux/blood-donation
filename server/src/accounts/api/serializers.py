import re
from rest_framework.serializers import (
        EmailField,
        CharField,
        ModelSerializer,
        ValidationError,
        )
from django.db.models import Q

from ..models import Address, Profile


class AddressSerializer(ModelSerializer):
    class Meta:
        model = Address
        fields = [
            'street',
            'city',
            'country',
            'zip_code',
        ]


class ProfileDetailSerializer(ModelSerializer):
    address = AddressSerializer(read_only = True)
    class Meta:
        model = Profile
        fields = [
            'username',
            'email',
            'first_name',
            'last_name',
            'phone_number',
            'address',
            'birth_date',
            'blood_type',
            'email_notification',
            'sms_notification',
        ]

class ProfileCreateSerialzer(ModelSerializer):
    email = EmailField(label="Email address")
    address = AddressSerializer()
    class Meta:
        model = Profile
        fields = [
            'username',
            'email',
            'password',
            'first_name',
            'last_name',
            'phone_number',
            'address',
            'birth_date',
            'blood_type',
            'email_notification',
            'sms_notification',
        ]
        extra_kwargs = {
            "password": {"write_only": True},

        }

    def validate_email(self, value):
        profile_qs = Profile.objects.filter(email=value)
        if profile_qs.exists():
            raise ValidationError("A profile with that email address already exists.")
        return value

    def validate_first_name(self, value):
        if not value :
            raise ValidationError("This field may not be blank.")
        if len(value) < 3 :
            raise ValidationError("This name is too short to be valid")
        return value

    def validate_last_name(self, value):
        if not value :
            raise ValidationError("This field may not be blank.")
        if len(value) < 3 :
            raise ValidationError("This name is too short to be valid")
        return value

    def validate_phone_number(self, value):
        phone_re = re.compile(r'0\d{9}$')
        if phone_re.match(value) is None:
            raise ValidationError("Please enter a valid phone number (10 digits begining by 0)")
        return value

    def validate_birth_date(self, value):
        if not value:
            raise ValidationError("This field may not be blank.")
        return value

    def create(self, validated_data):
        username = validated_data.get("username")
        email = validated_data.get("email")
        password = validated_data.get("password")
        first_name = validated_data.get("first_name")
        last_name = validated_data.get("last_name")
        phone_number = validated_data.get("phone_number")
        address = validated_data.get("address")
        birth_date = validated_data.get("birth_date")
        blood_type = validated_data.get("blood_type")
        email_notification = validated_data.get("email_notification")
        sms_notification = validated_data.get("sms_notification")

        address_obj = Address.objects.create(**address)
        profile_obj = Profile.objects.create(username = username,
                                            email = email,
                                            first_name = first_name,
                                            last_name = last_name,
                                            phone_number = phone_number,
                                            address = address_obj,
                                            birth_date = birth_date,
                                            blood_type = blood_type,
                                            email_notification = email_notification,
                                            sms_notification = sms_notification,
                                         )
        profile_obj.set_password(password)
        profile_obj.save()
        return profile_obj

class ProfileLoginSerializer(ModelSerializer):
    username = CharField(allow_blank=True, required=False)
    email = EmailField(label="Email address", allow_blank=True, required=False)
    password = CharField(style={'input_type': 'password'}, write_only=True)
    address = AddressSerializer(read_only=True)
    class Meta :
        model = Profile
        fields = [
            'username',
            'email',
            'password',
            'first_name',
            'last_name',
            'phone_number',
            'address',
            'birth_date',
            'blood_type',
            'email_notification',
            'sms_notification',
        ]
        extra_kwargs = {
            "first_name": {"read_only": True},
            "last_name": {"read_only": True},
            "phone_number": {"read_only": True},
            "birth_date": {"read_only": True},
            "blood_type": {"read_only": True},
            "email_notification": {"read_only": True},
            "sms_notification": {"read_only": True},

        }


    def validate(self, data):
        profile_obj = None
        username = data.get("username", None)
        email = data.get("email", None)
        password = data.get("password")
        if not email and not username:
            raise ValidationError("A username or an email is required to login.")
        profile_qs = Profile.objects.filter(
                Q(username = username)|
                Q(email = email)
            ).distinct()
        profile_qs = profile_qs.exclude(email__isnull = True).exclude(email__iexact='')
        if profile_qs.exists() and profile_qs.count() == 1:
            profile_obj = profile_qs.first()
        else:
            raise ValidationError("This username / email is not valid.")
        if profile_obj:
            if not profile_obj.check_password(password):
                raise ValidationError("Incorrect credentials, please try again.")
            data = ProfileDetailSerializer(profile_obj).data

        return data
