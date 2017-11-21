from datetime import datetime, timedelta
from calendar import timegm
import jwt

from django.contrib.auth import get_user_model
from django.db.models import Q
from django.utils.encoding import smart_text
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode

from rest_framework.authentication import get_authorization_header
from rest_framework import exceptions

from rest_framework_jwt.settings import api_settings

# Should always use get_user_model to get User because it could be different from (in our case it is User)
# django.contrib.auth.models.User when we costumize User
User = get_user_model()


class JWTTokenGenerator:
    """
        Class that contains functions related to JWT Token.

        This class uses the app rest_framework_jwt that should be installed

        This based on and inspired from :
             https://github.com/GetBlimp/django-rest-framework-jwt/tree/master/rest_framework_jwt
    """

    # Getting values from settings.py file
    JWT_AUTH_HEADER_PREFIX = api_settings.JWT_AUTH_HEADER_PREFIX

    jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
    jwt_decode_handler = api_settings.JWT_DECODE_HANDLER
    jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
    jwt_payload_get_user_id_handler = api_settings.JWT_PAYLOAD_GET_USER_ID_HANDLER
    jwt_payload_get_username_handler = api_settings.JWT_PAYLOAD_GET_USERNAME_HANDLER
    jwt_response_payload_handler = api_settings.JWT_RESPONSE_PAYLOAD_HANDLER

    @classmethod
    def generate_token(cls, user, username=None, email=None):
        """
            Returns a generated token for a user
        """
        if user is not None :
            payload = cls.jwt_payload_handler(user)
            token = cls.jwt_encode_handler(payload)
        else :
            user_qs = User.objects.filter(
                Q(username=username) |
                Q(email=email)
            ).distinct()
            user_qs = user_qs.exclude(email__isnull=True).exclude(email__iexact='')
            user_obj = user_qs.first()
            # Token generation
            token = cls.generate_token(user_obj)

        return token

    @classmethod
    def refresh_token(cls, token):
        """
            Refreshes Token (with new expiration) based on existing token.

            If 'orig_iat' field (original issued-at-time) is found, will first check
            if it is within expiration window, then copy it to the new token
        """
        try:
            payload = cls.check_payload(token=token)
        except:
            raise
        try:
            user = cls.check_user(payload=payload)
        except:
            raise
        # Get and check 'orig_iat'
        orig_iat = payload.get('orig_iat')

        if orig_iat:
            # Verify expiration
            refresh_limit = api_settings.JWT_REFRESH_EXPIRATION_DELTA

            if isinstance(refresh_limit, timedelta):
                refresh_limit = (refresh_limit.days * 24 * 3600 +
                                 refresh_limit.seconds)

            expiration_timestamp = orig_iat + int(refresh_limit)
            now_timestamp = timegm(datetime.utcnow().utctimetuple())

            if now_timestamp > expiration_timestamp:
                msg = 'Refresh has expired.'
                raise exceptions.ValidationError(msg)
        else:
            msg = 'orig_iat field is required.'
            raise exceptions.ValidationError(msg)

        new_payload = cls.jwt_payload_handler(user)
        new_payload['orig_iat'] = orig_iat

        new_token = cls.jwt_encode_handler(new_payload)

        return (user, new_token)

    @classmethod
    def check_payload(cls, token):
        """
            Check payload valid (based off of JSONWebTokenAuthentication)
        """
        try:
            payload = cls.jwt_decode_handler(token)
        except jwt.ExpiredSignature:
            msg = 'Signature has expired.'
            raise exceptions.ValidationError(msg)
        except jwt.DecodeError:
            msg = 'Error decoding signature.'
            raise exceptions.ValidationError(msg)

        return payload

    @classmethod
    def check_user(cls, payload):
        """
            Check user valid (based off of JSONWebTokenAuthentication)
        """
        username = cls.jwt_payload_get_username_handler(payload)

        if not username:
            msg = 'Invalid payload.'
            raise exceptions.ValidationError(msg)

        # Make sure user exists
        try:
            user = User.objects.get_by_natural_key(username)
        except User.DoesNotExist:
            msg = "User doesn't exist."
            raise exceptions.ValidationError(msg)

        if not user.is_active:
            msg = 'User account is disabled.'
            raise exceptions.ValidationError(msg)

        return user

    @classmethod
    def get_jwt_value(cls, request):
        """
            Returns JWT Token value from request
        """
        auth = get_authorization_header(request).split()
        auth_header_prefix = api_settings.JWT_AUTH_HEADER_PREFIX.lower()

        if not auth:
            if api_settings.JWT_AUTH_COOKIE:
                return request.COOKIES.get(api_settings.JWT_AUTH_COOKIE)
            return None

        if smart_text(auth[0].lower()) != auth_header_prefix:
            return None

        if len(auth) == 1:
            msg = 'Invalid Authorization header. No credentials provided.'
            raise exceptions.AuthenticationFailed(msg)
        elif len(auth) > 2:
            msg = 'Invalid Authorization header. Credentials string should not contain spaces.'
            raise exceptions.AuthenticationFailed(msg)

        return auth[1]

    @classmethod
    def authenticate(cls, request):
        """
            Returns a two-tuple of `User` and token if a valid signature has been
            supplied using JWT-based authentication.  Otherwise returns `None`.
        """
        try :
            jwt_value = cls.get_jwt_value(request)
        except :
            raise

        if jwt_value is None:
            return None

        try:
            payload = cls.jwt_decode_handler(jwt_value)
        except jwt.ExpiredSignature:
            msg = 'Signature has expired.'
            raise exceptions.AuthenticationFailed(msg)
        except jwt.DecodeError:
            msg = 'Error decoding signature.'
            raise exceptions.AuthenticationFailed(msg)
        except jwt.InvalidTokenError:
            raise exceptions.AuthenticationFailed()

        try:
            user = cls.authenticate_credentials(payload)
        except :
            raise

        return (user, jwt_value)

    @classmethod
    def authenticate_credentials(cls, payload):
        """
            Returns an active user that matches the payload's user id and email.
        """
        username = cls.jwt_payload_get_username_handler(payload)

        if not username:
            msg = 'Invalid payload.'
            raise exceptions.AuthenticationFailed(msg)

        try:
            user = User.objects.get_by_natural_key(username)
        except User.DoesNotExist:
            msg = 'Invalid signature.'
            raise exceptions.AuthenticationFailed(msg)

        if not user.is_active:
            msg = 'User account is disabled.'
            raise exceptions.AuthenticationFailed(msg)

        return user


class AccountActivationTokenGenerator(PasswordResetTokenGenerator):
    """
        Account activation  token generator class

        Extends PasswordResetTokenGenerator and overrides its _make_hash_value(self, user, timestamp):
             _make_hash_value : should put information that will change after using the link.
                                replace  user.password by user.is_active that will change after
                                using the token (login_timestamp will change if user logs).
                                Both will change and the token will no longer be valid
    """

    def _make_hash_value(self, user, timestamp):
        """
            Override _make_hash_value to put information that will change after using the token
                so as to be used only one time.
            _make_hash_value is used by  PasswordResetTokenGenerator --> make_token(self, user)
        """
        login_timestamp = '' if user.last_login is None else user.last_login.replace(microsecond=0, tzinfo=None)
        return str(user.pk) + str(user.is_active) + str(login_timestamp) + str(timestamp)

    def make_uidb64_and_token(self, user):
        """
            Function that generate a uid from the primary key using base 64 encoding
                and a token using PasswordResetTokenGenerator --> make_token(self, user)

            :return: uidb64, token
        """

        uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
        token = self.make_token(user)

        return uidb64, token

    def check_uidb64_and_token(self, uidb64, token):
        """
            Fucntion that chekcs the validity of the given (uidb64, token) using base 64 decoding
                and PasswordResetTokenGenerator --> check_token(user, token)

            :return: True or False
        """
        try:
            uid = force_text(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except(TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None
        if user is not None and self.check_token(user, token):
            return True
        else:
            return False


class CustomPasswordResetTokenGenerator(PasswordResetTokenGenerator):
    """
        Account activation  token generator class

        Extends PasswordResetTokenGenerator to define make_uidb64_and_token and
        check_uidb64_and_token
    """
    def make_uidb64_and_token(self, user):
        """
            Function that generate a uid from the primary key using base 64 encoding
                and a token using PasswordResetTokenGenerator --> make_token(self, user)

            :return: uidb64, token
        """

        uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
        token = self.make_token(user)

        return uidb64, token

    def check_uidb64_and_token(self, uidb64, token):
        """
            Fucntion that chekcs the validity of the given (uidb64, token) using base 64 decoding
                and PasswordResetTokenGenerator --> check_token(user, token)

            :return: True or False
        """
        try:
            uid = force_text(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except(TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None
        if user is not None and self.check_token(user, token):
            return True
        else:
            return False
