from rest_framework import permissions
from rest_framework.permissions import BasePermission


class IsOwnerOrReadOnly(BasePermission):
    """
       Object-level permission to only allow owners of an object to edit it.
       Assumes the model instance has an `owner` attribute.
    """
    def has_object_permission(self, request, view, obj):
        message = "You must be the owner of this object."
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Instance must have an attribute named `user`.
        return obj.author == request.user

class IsModerator(BasePermission):
    """
       Global permission to only allow moderators to  to create, update or delete an object.
    """
    message = "You must be a moderator."

    def has_permission(self, request, view):

        if not request.user.is_authenticated :
            return False

        return request.user.is_moderator


class IsModeratorOrReadOnly(BasePermission):
    """
       Global permission to only allow moderators to create, update or delete an object
       otherwise read only.
    """
    message = "You must be a moderator."

    def has_permission(self, request, view):

        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        if not request.user.is_authenticated :
            return False

        return request.user.is_moderator