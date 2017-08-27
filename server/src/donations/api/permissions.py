from rest_framework import permissions
from rest_framework.permissions import BasePermission
from accounts.models import Profile

class IsDonationOwnerOrReadOnly(BasePermission):
    """
       Object-level permission to only allow owners of an object to edit it.
       Assumes the model instance has an `owner` attribute.
    """
    message = "You must be the owner of this object."
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.applicant == request.user

