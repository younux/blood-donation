# from rest_framework.serializers import (
#         EmailField,
#         CharField,
#         ModelSerializer,
#         HyperlinkedIdentityField,
#         SerializerMethodField,
#         ValidationError,
#         )
# from django.contrib.contenttypes.models import ContentType
# from django.contrib.auth import (
#         get_user_model,
#         authenticate,
#         login,
#         logout,
#         )
# from django.db.models import Q
# from rest_framework_jwt.settings import api_settings
# User = get_user_model()
#
#
# class UserCreateSerializer(ModelSerializer):
#     email = EmailField(label="Email address")
#     email2 = EmailField(label="Confirm email", write_only=True)
#     class Meta :
#         model = User
#         fields = [
#             'username',
#             'email',
#             'email2',
#             'password',
#         ]
#         extra_kwargs = {
#             "password" : {"write_only" : True},
#
#         }
#
#     def validate(self, data):
#         # email = data.get("email")
#         # user_qs = User.objects.filter(email = email)
#         # if user_qs.exists():
#         #     raise ValidationError("A user with that email adress already exists.")
#         return data
#
#     def validate_email2(self, value):
#         data = self.initial_data
#         email1 = data.get("email")
#         email2 = value
#         if email1 != email2 :
#             raise ValidationError("Emails must match : email confirmation is not correct.")
#         user_qs = User.objects.filter(email=email2)
#         if user_qs.exists():
#             raise ValidationError("A user with that email adress already exists.")
#         return value
#
#     def create(self, validated_data):
#         username = validated_data.get("username")
#         email = validated_data.get("email")
#         password = validated_data.get("password")
#         user_obj = User.objects.create(username = username,
#                         email = email,
#                         )
#         user_obj.set_password(password)
#         user_obj.save()
#         return user_obj
#
# class UserLoginSerializer(ModelSerializer):
#     token = CharField(allow_blank= True, read_only=True)
#     username = CharField(allow_blank=True, required=False, write_only=True)
#     email = EmailField(label="Email address", allow_blank=True, required=False, write_only=True)
#     class Meta :
#         model = User
#         fields = [
#             'username',
#             'email',
#             'password',
#             'token',
#         ]
#         extra_kwargs = {
#             "password" : {"write_only" : True}
#         }
#
#     def validate(self, data):
#         user_obj = None
#         username = data.get("username", None)
#         email = data.get("email", None)
#         password = data.get("password")
#         if not email and not username:
#             raise ValidationError("A username or an email is required to login.")
#         user_qs = User.objects.filter(
#                 Q(username = username)|
#                 Q(email = email)
#             ).distinct()
#         user_qs = user_qs.exclude(email__isnull = True).exclude(email__iexact='')
#         if user_qs.exists() and user_qs.count() == 1:
#             user_obj = user_qs.first()
#         else:
#             raise ValidationError("This username / email is not valid.")
#         if user_obj:
#             if not user_obj.check_password(password):
#                 raise ValidationError("Incorrect credentials, please try again.")
#         # TODO : for more information and to see how to generate a token :
#         # https://getblimp.github.io/django-rest-framework-jwt/
#         # https://ponyfoo.com/articles/json-web-tokens-vs-session-cookies
#         # https://auth0.com/learn/json-web-tokens/
#         jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
#         jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
#         payload = jwt_payload_handler(user_obj)
#         token = jwt_encode_handler(payload)
#
#         data["token"] = token
#
#         return data
#
# class UserDetailSerializer(ModelSerializer):
#     class Meta:
#         model = User
#         fields = [
#             'username',
#             'email',
#             'first_name',
#             'last_name',
#         ]
#
#
#
#
