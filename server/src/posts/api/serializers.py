from rest_framework.serializers import (
        ModelSerializer,
        HyperlinkedIdentityField,
        SerializerMethodField,
        )

from posts.models import Post

from comments.models import Comment
from comments.api.serializers import CommentSerializer

from accounts.api.serializers import ProfileDetailSerializer


post_detail_url = HyperlinkedIdentityField(
        view_name= "posts-api:detail",
        lookup_field="slug"
        )


class PostListSerializer(ModelSerializer):
    """
        Post Serializer for listing use case

        Extends ModelSerializer
    """
    url = post_detail_url
    user = ProfileDetailSerializer(read_only = True)
    class Meta:
        model = Post
        fields = [
            'url',
            'user',
            'title',
            'slug',
            'content',
            'publish',
        ]


class PostDetailSerializer(ModelSerializer):
    """
        Post Serializer for detail use case

        Extends ModelSerializer
    """

    url = post_detail_url
    user = ProfileDetailSerializer(read_only = True)
    image = SerializerMethodField()
    html = SerializerMethodField()
    comments = SerializerMethodField()
    class Meta:
        model = Post
        fields = [
            'url',
            'user',
            'title',
            'slug',
            'content',
            'html',
            'publish',
            'image',
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

    def get_html(self, obj):
        """
            get html html SerializerMethodField
        """
        return obj.get_markdown()

    def get_comments(self, obj):
        """
            get comments for comments SerializerMethodField
        """
        c_qs = Comment.objects.filter_by_instance(obj)
        comments = CommentSerializer(c_qs, many=True).data
        return comments


class PostCreateUpdateSerializer(ModelSerializer):
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