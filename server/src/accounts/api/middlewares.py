from django.utils.deprecation import MiddlewareMixin
from accounts.api.utils import get_jwt_value, authenticate, refresh_token, JWT_AUTH_HEADER_PREFIX


class JWTTokenMiddleware(MiddlewareMixin):
    def __init__(self, get_response=None):
        self.get_response = get_response

    # This is done by default when declaring rest_framework_jwt.authentication.JSONWebTokenAuthentication
    # in DEFAULT_AUTHENTICATION_CLASSES of REST_FRAMEWORK in settings.py file. It already authenticates user
    # using the received token. So I commented process_request since it is useless now !
    # def process_request(self, request):
    #     """
    #     Authenticates user : sets the request.user based on the jwt token contained in request header
    #     If token is not valid, request.user remains equals to AnonymousUser
    #     """
    #     try:
    #         user, jwt_value = authenticate(request)
    #     except:
    #         user = None
    #         jwt_value = None
    #     if user is not None :
    #         request.user = user

    def process_response(self, request, response):
        """
        Sets an Authorization header in the response with a refreshed jwt token if the request
        contains a valid jwt token
        """
        try:
            token = get_jwt_value(request)
        except:
            token = None
        if token is not None :
            try:
                user, new_token =  refresh_token(token)
            except:
                user = None
                new_token = None
            if new_token is not None :
                response['Authorization'] = JWT_AUTH_HEADER_PREFIX + " " + new_token

        return response


