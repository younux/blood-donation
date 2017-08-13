import re
from rest_framework.serializers import (
        EmailField,
        CharField,
        ModelSerializer,
        ValidationError,
        )
from django.db.models import Q
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User

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

class UserDetailSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'first_name',
            'last_name',
        ]

class UserCreateSerializer(ModelSerializer):
    email = EmailField(label="Email address")
    email2 = EmailField(label="Confirm email", write_only=True)
    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'email2',
            'password',
            'first_name',
            'last_name',
        ]
        extra_kwargs = {
            "password": {"write_only": True},
        }

    def validate(self, data):
        email1 = data.get("email")
        email2 = data.get("email2")
        if email1 != email2 :
            raise ValidationError("Emails must match : email confirmation is not correct.")
        user_qs = User.objects.filter(email=email2)
        if user_qs.exists():
            raise ValidationError("A user with that email address already exists.")
        return data

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

class ProfileDetailSerializer(ModelSerializer):
    address = AddressSerializer(read_only = True)
    user = UserDetailSerializer(read_only = True)
    class Meta:
        model = Profile
        fields = [
            'user',
            'phone_number',
            'address',
            'birth_date',
            'blood_type',
            'email_notification',
            'sms_notification',
        ]

class ProfileCreateSerialzer(ModelSerializer):
    user = UserCreateSerializer()
    address = AddressSerializer()
    class Meta:
        model = Profile
        fields = [
            'user',
            'phone_number',
            'address',
            'birth_date',
            'blood_type',
            'email_notification',
            'sms_notification',
        ]

    def validate_phone_number(self, value):
        phone_re = re.compile(r'0\d{9}$')
        if phone_re.match(value) is None:
            raise ValidationError("Please enter a valid phone number (10 digits begining by 0)")
        return value

    def create(self, validated_data):
        username = validated_data.get("user").get("username")
        email = validated_data.get("user").get("email")
        password = validated_data.get("user").get("password")
        first_name = validated_data.get("user").get("first_name")
        last_name = validated_data.get("user").get("last_name")
        phone_number = validated_data.get("phone_number")
        address = validated_data.get("address")
        birth_date = validated_data.get("birth_date")
        blood_type = validated_data.get("blood_type")
        email_notification = validated_data.get("email_notification")
        sms_notification = validated_data.get("sms_notification")


        user_obj = User.objects.create(username = username,
                                       email = email,
                                       first_name = first_name,
                                       last_name = last_name,
                                       )
        user_obj.set_password(password)
        user_obj.save()
        address_obj = Address.objects.create(**address)
        profile_obj = Profile.objects.create(user = user_obj,
                                         phone_number = phone_number,
                                         address = address_obj,
                                         birth_date = birth_date,
                                         blood_type = blood_type,
                                         email_notification = email_notification,
                                         sms_notification = sms_notification,
                                         )
        return profile_obj

class ProfileLoginSerializer(ModelSerializer):
    username = CharField(allow_blank=True, required=False, write_only=True)
    email = EmailField(label="Email address", allow_blank=True, required=False, write_only=True)
    password = CharField(style={'input_type': 'password'}, write_only=True)
    token = CharField(allow_blank=True, read_only= True)
    class Meta :
        model = Profile
        fields = [
            'username',
            'email',
            'password',
            'token',
        ]

    def validate(self, data):
        user_obj = None
        username = data.get("username", None)
        email = data.get("email", None)
        password = data.get("password")
        if not email and not username:
            raise ValidationError("A username or an email is required to login.")
        user_qs = User.objects.filter(
                Q(username = username)|
                Q(email = email)
            ).distinct()
        user_qs = user_qs.exclude(email__isnull = True).exclude(email__iexact='')
        if user_qs.exists() and user_qs.count() == 1:
            user_obj = user_qs.first()
        else:
            raise ValidationError("This username / email is not valid.")
        if user_obj:
            if not user_obj.check_password(password):
                raise ValidationError("Incorrect credentials, please try again.")
        # Token generation
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
        payload = jwt_payload_handler(user_obj)
        token = jwt_encode_handler(payload)
        data["token"] = token

        return data
