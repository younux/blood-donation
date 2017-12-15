from rest_framework.serializers import (
        ModelSerializer,
        SerializerMethodField,
        )

from posts.models import Post

from comments.models import Comment
from comments.api.serializers import CommentDetailUpdateDeleteSerializer

from accounts.api.serializers import AuthorSerializer



class PostCreateSerializer(ModelSerializer):
    """
        Post Serializer for create and update use cases

        Extends ModelSerializer
    """
    class Meta:
        model = Post
        fields = [
            'title',
            'content',
            'publish',
        ]

class PostListSerializer(ModelSerializer):
    """
        Post Serializer for listing use case

        Extends ModelSerializer
    """
    author = AuthorSerializer(read_only=True)
    image = SerializerMethodField()
    comments_count = SerializerMethodField()
    class Meta:
        model = Post
        fields = [
            'slug',
            'author',
            'title',
            'content',
            'publish',
            'image',
            'comments_count',
        ]

    def get_image(self, obj):
        """
            get image url for image SerializerMethodField
        """
        try:
            image = obj.image.url
        except:
            image = None
        return image

    def get_comments_count(self, obj):
        """
            get comments for comments SerializerMethodField
        """
        return Comment.objects.count_instance_comments(obj)

class PostDetailUpdateDeleteSerializer(ModelSerializer):
    """
        Post Serializer for detail use case

        Extends ModelSerializer
    """

    author = AuthorSerializer(read_only = True)
    image = SerializerMethodField()
    comments_count = SerializerMethodField()
    comments = SerializerMethodField()
    class Meta:
        model = Post
        fields = [
            'slug',
            'author',
            'title',
            'content',
            'publish',
            'image',
            'comments_count',
            'comments',
        ]

        read_only_fields = [
            'slug',
            'author',
            'image',
            'comments_count',
            'comments',
        ]

    def get_image(self, obj):
        """
            get image url for image SerializerMethodField
        """
        try:
            image = obj.image.url
        except:
            image = None
        return image

    def get_comments_count(self, obj):
        """
            get comments for comments SerializerMethodField
        """
        return Comment.objects.count_instance_comments(obj)

    def get_comments(self, obj):
        """
            get comments for comments SerializerMethodField
        """
        c_qs = obj.comments
        comments = CommentDetailUpdateDeleteSerializer(c_qs, many=True).data
        return comments

