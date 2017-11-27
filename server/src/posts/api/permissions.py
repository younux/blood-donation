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