from datetime import datetime, timedelta
from calendar import timegm
from django.contrib.auth import get_user_model
from django.db.models import Q
from rest_framework_jwt.settings import api_settings
from rest_framework.authentication import get_authorization_header
from django.utils.encoding import smart_text
from rest_framework import exceptions
import jwt

# Should always use get_user_model to get User because it could be different from
# django.contrib.auth.models.User when we costumize User
User = get_user_model()


# This is inspired from https://github.com/GetBlimp/django-rest-framework-jwt/tree/master/rest_framework_jwt
# Getting values from settings.py file
JWT_AUTH_HEADER_PREFIX = api_settings.JWT_AUTH_HEADER_PREFIX
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
jwt_decode_handler = api_settings.JWT_DECODE_HANDLER
jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_payload_get_user_id_handler = api_settings.JWT_PAYLOAD_GET_USER_ID_HANDLER
jwt_payload_get_username_handler = api_settings.JWT_PAYLOAD_GET_USERNAME_HANDLER
jwt_response_payload_handler = api_settings.JWT_RESPONSE_PAYLOAD_HANDLER


def generate_token(user, username=None, email=None):
    """
        Returns a generated token for a user
    """
    if user is not None :
        payload = jwt_payload_handler(user)
        token = jwt_encode_handler(payload)
    else :
        user_qs = User.objects.filter(
            Q(username=username) |
            Q(email=email)
        ).distinct()
        user_qs = user_qs.exclude(email__isnull=True).exclude(email__iexact='')
        user_obj = user_qs.first()
        # Token generation
        token = generate_token(user_obj)

    return token

def refresh_token(token):
    """
        Refreshes Token (with new expiration) based on existing token.

        If 'orig_iat' field (original issued-at-time) is found, will first check
        if it is within expiration window, then copy it to the new token
    """
    try:
        payload = check_payload(token=token)
    except:
        raise
    try:
        user = check_user(payload=payload)
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

    new_payload = jwt_payload_handler(user)
    new_payload['orig_iat'] = orig_iat

    new_token = jwt_encode_handler(new_payload)

    return (user, new_token)

def check_payload(token):
    """
        Check payload valid (based off of JSONWebTokenAuthentication)
    """
    try:
        payload = jwt_decode_handler(token)
    except jwt.ExpiredSignature:
        msg = 'Signature has expired.'
        raise exceptions.ValidationError(msg)
    except jwt.DecodeError:
        msg = 'Error decoding signature.'
        raise exceptions.ValidationError(msg)

    return payload

def check_user(payload):
    """
        Check user valid (based off of JSONWebTokenAuthentication)
    """
    username = jwt_payload_get_username_handler(payload)

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

def get_jwt_value(request):
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


def authenticate(request):
    """
        Returns a two-tuple of `User` and token if a valid signature has been
        supplied using JWT-based authentication.  Otherwise returns `None`.
    """
    try :
        jwt_value = get_jwt_value(request)
    except :
        raise

    if jwt_value is None:
        return None

    try:
        payload = jwt_decode_handler(jwt_value)
    except jwt.ExpiredSignature:
        msg = 'Signature has expired.'
        raise exceptions.AuthenticationFailed(msg)
    except jwt.DecodeError:
        msg = 'Error decoding signature.'
        raise exceptions.AuthenticationFailed(msg)
    except jwt.InvalidTokenError:
        raise exceptions.AuthenticationFailed()

    try:
        user = authenticate_credentials(payload)
    except :
        raise

    return (user, jwt_value)

def authenticate_credentials(payload):
    """
        Returns an active user that matches the payload's user id and email.
    """
    username = jwt_payload_get_username_handler(payload)

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




