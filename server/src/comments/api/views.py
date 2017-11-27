from django.db.models import Q
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.generics import (
        ListAPIView,
        RetrieveAPIView,
        UpdateAPIView,
        DestroyAPIView,
        CreateAPIView,
        RetrieveUpdateAPIView,
        )
from rest_framework.mixins import DestroyModelMixin, UpdateModelMixin
from rest_framework.permissions import (
    AllowAny,
    IsAdminUser,
    IsAuthenticated,
    IsAuthenticatedOrReadOnly,
    )
from posts.api.permissions import IsOwnerOrReadOnly
from posts.api.paginations import PostLimitOffsetPagination, PostPageNumberPagination

from comments.models import Comment
from .serializers import (
    CommentListSerializer,
    CommentDetailUpdateDeleteSerializer,
    create_comment_serializer,
    )




class CommentCreateAPIView(CreateAPIView):
    """
        API View for Creating a comment

        Extends CreateAPIView.

        example :
        - to create a comment http://127.0.0.1:8000/api/comments/create/?model_type=post&slug=how-are-you
         (post : is the content type as we are commenting a post, how-are-you : is ths slug of the post we want to
          insert this comment. here we did not specify a parent i.e null)
        - http://127.0.0.1:8000/api/comments/create/?type=post&slug=how-are-you&parent_id=29
            (here the parent of the comment we insert is the comment whose id is 29)
    """
    queryset = Comment.objects.all()
    permission_classes = [IsAuthenticated] # we need to have a user authenticated to put it as author

    def get_serializer_class(self):
        """
            Overrides get_serializer_class

            This necessary as the creation serializers will be fenerated dynamically using the given model type
        """
        model_type = self.request.GET.get("model_type")
        slug = self.request.GET.get("slug")
        parent_id = self.request.GET.get("parent_id")
        return create_comment_serializer(model_type=model_type, slug=slug, parent_id=parent_id, author=self.request.user)


class CommentListAPIView(ListAPIView):
    """
        API View for listing a comment

        Extends ListAPIView.
    """
    serializer_class = CommentListSerializer
    # This is for searching and oredering with built in rest_framework filters
    # For example http://127.0.0.1:6001/api/posts/?search=switch&ordering=-publish
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['content', 'user__first_name', 'user__last_name']
    pagination_class = PostPageNumberPagination

    # This is for using Q search for examplle :http://127.0.0.1:6001/api/posts/?q=real
    def get_queryset(self, *args, **kwargs):
        """
            Overrides get query set
        """
        queryset_list = Comment.objects.filter(id__gte=0)
        query = self.request.GET.get('q')
        if query:
            queryset_list = queryset_list.filter(
                Q(content__icontains = query)|
                Q(user__first_name__icontains = query)|
                Q(user__last_name__icontains = query)
            ).distinct()
        return queryset_list

class CommentDetailUpdateDeleteAPIView(RetrieveAPIView, UpdateModelMixin, DestroyModelMixin):
    """
        API View for retrieving, updating and destroying a comment

        Extends RetrieveAPIView, UpdateModelMixin, DestroyModelMixin.
    """
    queryset = Comment.objects.filter(id__gte=0)
    serializer_class = CommentDetailUpdateDeleteSerializer

    def put(self, request, *args, **kwargs):
        """
            Defines put for UpdateModelMixin
        """
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        """
            Defines delete for DestroyModelMixin
        """
        return self.destroy(request, *args, **kwargs)


