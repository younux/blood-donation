from django.utils.deprecation import MiddlewareMixin
from accounts.api.tokens_jwt import get_jwt_value, authenticate, refresh_token, JWT_AUTH_HEADER_PREFIX


class JWTTokenMiddleware(MiddlewareMixin):
    """
        This is a middleware that handles the JWT token authentication.

        The class overrides process_response(self, request, response) to set an Authorization header
        in the response with a refreshed jwt token if the request contains a valid jwt token.

        For process_request(self, request) : it is not necessary to override it, the job is done by
        default when declaring rest_framework_jwt.authentication.JSONWebTokenAuthentication in
        settings.py ==> REST_FRAMEWORK ==> DEFAULT_PERMISSION_CLASSES : It already authenticates user
        using the received token.
    """
    def __init__(self, get_response=None):
        self.get_response = get_response

    def process_request(self, request):
        """
            Authenticates user.

            Sets the request.user based on the jwt token contained in request header.
            If token is not valid, request.user remains equals to AnonymousUser.
        """
        try:
            user, jwt_value = authenticate(request)
        except:
            user = None
            jwt_value = None
        if user is not None :
            request.user = user

    def process_response(self, request, response):
        """
            Refreshes JWT Token.

            Sets an Authorization header in the response with a refreshed jwt token if the request
            contains a valid jwt token.
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


