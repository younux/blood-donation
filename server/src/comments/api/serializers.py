from rest_framework.serializers import (
        ModelSerializer,
        SerializerMethodField,
        ValidationError,
        )

from django.contrib.contenttypes.models import ContentType
from django.contrib.auth import get_user_model
from comments.models import Comment
from accounts.api.serializers import AuthorSerializer



def create_comment_serializer(model_type='post', slug=None, parent_id=None, author=None):
    """
        Creates dynamically  a comment serializer based on the given model type.
    """
    class CommentCreateSerializer(ModelSerializer):
        """
            Comment serializer for creation use case

            Extends ModelSerializer
        """
        class Meta:
            model = Comment
            fields = [
                'content',
            ]

            write_only_fields = [
                'content',
            ]

        def __init__(self, *args, **kwargs):
            self.model_type = model_type
            self.slug = slug
            self.parent_obj = None
            if parent_id:
                parent_qs = Comment.objects.filter(id=parent_id)
                if parent_qs.exists() and parent_qs.count() == 1:
                    self.parent_obj = parent_qs.first()
            super(CommentCreateSerializer, self).__init__(*args, **kwargs)

        def validate(self, data):
            """
                Custom Serializer validation
            """
            model_type = self.model_type
            model_qs = ContentType.objects.filter(model = model_type)
            if not model_qs.exists() or model_qs.count() != 1 :
                raise ValidationError("This is not a valid content type")
            SomeModel = model_qs.first().model_class()
            obj_qs = SomeModel.objects.filter(slug=self.slug)
            if not obj_qs.exists() or obj_qs.count() != 1 :
                raise ValidationError("This is not a valid slug for this content type")
            return data

        def create(self, validated_data):
            """
                Overrides serializer create method
            """
            content = validated_data.get('content')
            main_author = author
            model_type = self.model_type
            slug = self.slug
            parent_obj = self.parent_obj
            comment = Comment.objects.create_by_model_type(
                    model_type,
                    slug,
                    content,
                    main_author,
                    parent_obj,
                    )
            return comment

    return CommentCreateSerializer


class CommentListSerializer(ModelSerializer):
    """
        Comment serializer for listing use case.

        Extends ModelSerializer
    """
    author = AuthorSerializer(read_only = True)
    reply_count = SerializerMethodField()
    class Meta:
        model = Comment
        fields = [
            'id',
            'author',
            'parent_id',
            'content',
            'timestamp',
            'reply_count',
        ]

    def get_reply_count(self, obj):
        """
            Returns reply count for reply_count SerializerMethodField
        """
        if obj.is_parent:
            return obj.children().count()
        return 0

class CommentDetailUpdateDeleteSerializer(ModelSerializer):
    """
        Comment serializer for detail use case

        Extends ModelSerializer
    """
    author = AuthorSerializer(read_only = True)
    reply_count = SerializerMethodField(read_only = True)
    replies = SerializerMethodField(read_only = True)
    class Meta:
        model = Comment
        fields = [
            'id',
            'author',
            'parent_id',
            'content',
            'timestamp',
            'reply_count',
            'replies',
        ]

        read_only_fields = ['id','parent_id', 'timestamp']

    def get_reply_count(self, obj):
        """
            return counts the number of replies. For reply_count SerializerMethodField
        """
        if obj.is_parent:
            return obj.children().count()
        return 0

    def get_replies(self, obj):
        """
            get replies comments (serialized) if the comment is a parent for replies SerializerMethodField
        """
        if obj.is_parent:
            return CommentChildrenSerializer(obj.children(), many=True).data
        return None


class CommentChildrenSerializer(ModelSerializer):
    """
        Comment serializer for replies (children comments)

        Extends ModelSerializer
        used in CommentDetailUpdateDeleteSerializer to serialize replies
    """
    author = AuthorSerializer(read_only = True)
    class Meta:
        model = Comment
        fields = [
            'id',
            'author',
            'parent_id',
            'content',
            'timestamp',
        ]
