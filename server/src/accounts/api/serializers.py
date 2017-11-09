import re
from rest_framework import serializers
from django.db.models import Q

from ..models import Address, Profile
from .tokens import AccountActivationTokenGenerator, CustomPasswordResetTokenGenerator

class AddressSerializer(serializers.ModelSerializer):
    """
        Address Serializer

        Extends ModelSerializer
    """
    class Meta:
        model = Address
        fields = [
            'street',
            'city',
            'country',
            'zip_code',
        ]
        extra_kwargs = {
            "street": {"error_messages":
                           {"blank": "Give yourself a street",
                            "max_length" : "dededd"}
                       }

        }
    def validate_zip_code(self, value):
        """
            custom zip code validation.
        """
        zip_code_re = re.compile("^[0-9]{5}$")
        if zip_code_re.match(value) is None :
            raise serializers.ValidationError("The zip code is not valid (XXXXX where X is a digit)")
        return value


class ProfileDetailSerializer(serializers.ModelSerializer):
    """
        Profile serializer for detail use case

        Extends ModelSerializer
    """
    address = AddressSerializer(read_only = True)
    class Meta:
        model = Profile
        fields = [
            'username',
            'email',
            'first_name',
            'last_name',
            'gender',
            'phone_number',
            'address',
            'birth_date',
            'blood_type',
            'email_notification',
            'sms_notification',
        ]

class ProfileCreateSerialzer(serializers.ModelSerializer):
    """
        Profile Serializer for Creation use case.

        Extends ModelSerializer
    """
    email = serializers.EmailField(write_only=True, label="Email address")
    address = AddressSerializer(write_only=True)
    class Meta:
        model = Profile
        fields = [
            'username',
            'email',
            'password',
            'first_name',
            'last_name',
            'gender',
            'phone_number',
            'address',
            'birth_date',
            'blood_type',
            'email_notification',
            'sms_notification',
        ]
        extra_kwargs = {
            "username": {"write_only": True},
            "password": {"write_only": True},
            "first_name": {"write_only": True},
            "last_name": {"write_only": True},
            "gender": {"write_only": True},
            "phone_number": {"write_only": True},
            "birth_date": {"write_only": True},
            "blood_type": {"write_only": True},
            "email_notification": {"write_only": True},
            "sms_notification": {"write_only": True},

            # "blood_type": {"error_messages":
            #                {"invalid_choice": "Give yourself a blood type",
            #                 }
            #            },
        }

    def validate_username(self, value):
        """
            custom username validationn
        """
        if len(value)< 3 :
            raise serializers.ValidationError("Username length must be greater or equal to 3")
        username_re = re.compile("^[a-zA-Z0-9]*$")
        if username_re.match(value) is None :
            raise serializers.ValidationError("Username should contain only alphanumeric characters")
        return value

    def validate_email(self, value):
        """
            custom email validation
        """
        email_re = re.compile(r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)")
        if email_re.match(value) is None :
            raise serializers.ValidationError("This is not a valid email address")
        profile_qs = Profile.objects.filter(email=value)
        if profile_qs.exists():
            raise serializers.ValidationError("A profile with that email address already exists.")
        return value

    def validate_password(self, value):
        """
            custom password validation
        """
        #TODO : implement a validation for robust password
        return value

    def validate_first_name(self, value):
        """
            custom first name validation
        """
        if not value :
            raise serializers.ValidationError("This field may not be blank.")
        if len(value) < 3 :
            raise serializers.ValidationError("This name is too short to be valid")
        return value

    def validate_last_name(self, value):
        """
            custom last name validation
        """
        if not value :
            raise serializers.ValidationError("This field may not be blank.")
        if len(value) < 3 :
            raise serializers.ValidationError("This name is too short to be valid")
        return value

    def validate_phone_number(self, value):
        """
            custom phone number validation
        """
        phone_re = re.compile(r'^(0|\+212|00212)[1-9][0-9]{8}$')
        if phone_re.match(value) is None:
            raise serializers.ValidationError("The phone number must be valid (0X-XX-XX-XX-XX or +212 X-XX-XX-XX-XX or 00212 X-XX-XX-XX-XX where X is a digit)")
        return value

    def validate_birth_date(self, value):
        """
            custom birth date validation
        """
        if not value:
            raise serializers.ValidationError("This field may not be blank.")
        return value

    def create(self, validated_data):
        """
            Overriding ModelSerializer .create(self, validated_data) implementation:

            It creates an inactive profile object with the password and save it.
        """
        username = validated_data.get("username")
        email = validated_data.get("email")
        password = validated_data.get("password")
        first_name = validated_data.get("first_name")
        last_name = validated_data.get("last_name")
        gender = validated_data.get("gender")
        phone_number = validated_data.get("phone_number")
        address = validated_data.get("address")
        birth_date = validated_data.get("birth_date")
        blood_type = validated_data.get("blood_type")
        email_notification = validated_data.get("email_notification")
        sms_notification = validated_data.get("sms_notification")

        address_obj = Address.objects.create(**address)
        # .create_profile creates the model and saves it
        profile_obj = Profile.objects.create_profile(username = username,
                                            email = email,
                                            password = password,
                                            first_name = first_name,
                                            last_name = last_name,
                                            gender = gender,
                                            phone_number = phone_number,
                                            address = address_obj,
                                            birth_date = birth_date,
                                            blood_type = blood_type,
                                            email_notification = email_notification,
                                            sms_notification = sms_notification,
                                         )
        return profile_obj

class ProfileLoginSerializer(serializers.ModelSerializer):
    """
        Profile serializer for login use case.

        Extends ModelSerializer
    """
    username = serializers.CharField(allow_blank=True, allow_null=True, required=False)
    email = serializers.EmailField(label="Email address", allow_blank=True, allow_null=True, required=False)
    password = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    address = AddressSerializer(read_only=True)
    class Meta :
        model = Profile
        fields = [
            'username',
            'email',
            'password',
            'first_name',
            'last_name',
            'gender',
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
            "gender": {"read_only": True},
            "phone_number": {"read_only": True},
            "birth_date": {"read_only": True},
            "blood_type": {"read_only": True},
            "email_notification": {"read_only": True},
            "sms_notification": {"read_only": True},
        }


    def validate(self, data):
        """
            Custom validation (object level : validation using many fields)

            First, it checks that a username or an email is supplied. Then, it checks the the username/email
            is valid (exists in database). Finally, it checks that the supplied password is correct.
        """
        profile_obj = None
        username = data.get("username", None)
        email = data.get("email", None)
        password = data.get("password")
        if not email and not username:
            raise serializers.ValidationError("A username or an email is required to login.")
        profile_qs = Profile.objects.all_active().filter(
                Q(username = username)|
                Q(email = email)
            ).distinct()
        profile_qs = profile_qs.exclude(email__isnull = True).exclude(email__iexact='')
        if profile_qs.exists() and profile_qs.count() == 1:
            profile_obj = profile_qs.first()
        else:
            raise serializers.ValidationError("This username / email is not valid.")
        if profile_obj:
            if not profile_obj.check_password(password):
                raise serializers.ValidationError("Incorrect credentials, please try again.")
            data = ProfileDetailSerializer(profile_obj).data

        return data


class ProfileActivateSerializer(serializers.Serializer):
    """
        Serializer for profile activation

        Extends Serializer
    """
    key = serializers.CharField(allow_null=False, allow_blank=False, required=True, max_length=32, write_only=True)
    token = serializers.CharField(allow_null=False, allow_blank=False, required=True, max_length=128, write_only=True)

    def validate(self, data):
        """
            Checks that the token is valid
        """
        key   = data.get("key", None)
        token = data.get("token", None)
        # the check below is note necessary thanks to the definition above of key and token
        # fields (allow_null=False, allow_blank=False, required=True)
        if key is None or token is None:
            raise serializers.ValidationError("You should give a key and a token")
        # Checking the validity of the token
        account_activation_token = AccountActivationTokenGenerator()
        if not account_activation_token.check_uidb64_and_token(uidb64=key, token=token):
            raise serializers.ValidationError("The activation url is not valid")
        return data

class PasswordResetRequestSerializer(serializers.Serializer):
    """
        Serializer for requesting a password reset

        Extends Serializer
    """
    email = serializers.EmailField(write_only=True, label="Email address")

    def validate_email(self, value):
        """
            custom email validation
        """
        email_re = re.compile(r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)")
        if email_re.match(value) is None :
            raise serializers.ValidationError("This is not a valid email address")
        profile_qs = Profile.objects.all_active().filter(email=value)
        if not profile_qs.exists():
            raise serializers.ValidationError("There is no active user with this email")
        return value


class PasswordResetVerifySerializer(serializers.Serializer):
    """
        Serializer for the verification of the token before requesting a new password.

        Extends Serializer
    """
    key = serializers.CharField(allow_null=False, allow_blank=False, required=True, max_length=32, write_only=True)
    token = serializers.CharField(allow_null=False, allow_blank=False, required=True, max_length=128, write_only=True)

    def validate(self, data):
        """
            Checks that the token is valid
        """
        key   = data.get("key", None)
        token = data.get("token", None)
        # the check below is note necessary thanks to the definition above of key and token
        # fields (allow_null=False, allow_blank=False, required=True)
        if key is None or token is None:
            raise serializers.ValidationError("You should give a key and a token")
        # Checking the validity of the token
        password_reset_token = CustomPasswordResetTokenGenerator()
        if not password_reset_token.check_uidb64_and_token(uidb64=key, token=token):
            raise serializers.ValidationError("The reset password url is not valid")
        return data

class PasswordResetSerializer(serializers.Serializer):
    """
        Serializer for redefining the password

        Extends Serializer
    """
    key = serializers.CharField(allow_null=False, allow_blank=False, required=True, max_length=32, write_only=True)
    token = serializers.CharField(allow_null=False, allow_blank=False, required=True, max_length=128, write_only=True)
    password = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    def validate_password(self, value):
        """
            custom password validation
        """
        #TODO : implement a validation for robust password
        return value

    def validate(self, data):
        """
            Checks that the token is valid
        """
        key = data.get("key", None)
        token = data.get("token", None)
        # the check below is note necessary thanks to the definition above of key and token
        # fields (allow_null=False, allow_blank=False, required=True)
        if key is None or token is None:
            raise serializers.ValidationError("You should give a key and a token")
        # Checking the validity of the token
        password_reset_token = CustomPasswordResetTokenGenerator()
        if not password_reset_token.check_uidb64_and_token(uidb64=key, token=token):
            raise serializers.ValidationError("The reset password url is not valid")
        return data