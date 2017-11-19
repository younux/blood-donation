from rest_framework.serializers import (
        ModelSerializer,
        HyperlinkedIdentityField,
        SerializerMethodField,
        ValidationError,
        )

from django.contrib.contenttypes.models import ContentType
from django.contrib.auth import get_user_model
from comments.models import Comment
from accounts.api.serializers import ProfileDetailSerializer

User = get_user_model()

class CommentSerializer(ModelSerializer):
    """
        Comment serializer

        Extends ModelSerializer
    """
    user = ProfileDetailSerializer(read_only = True)
    reply_count = SerializerMethodField()
    class Meta:
        model = Comment
        fields = [
            'id',
            'user',
            'content_type',
            'object_id',
            'parent',
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

class CommentListSerializer(ModelSerializer):
    """
        Comment serializer for listing use case

        Extends ModelSerializer
    """
    reply_count = SerializerMethodField()
    url = HyperlinkedIdentityField(view_name= "comments-api:detail")
    class Meta:
        model = Comment
        fields = [
            'url',
            'id',
            'content_type',
            'object_id',
            'parent',
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

class CommentChildSerializer(ModelSerializer):
    """
        Comment serializer for children comments

        Extends ModelSerializer
    """
    user = ProfileDetailSerializer(read_only = True)
    class Meta:
        model = Comment
        fields = [
            'id',
            'user',
            'content_type',
            'object_id',
            'parent',
            'content',
            'timestamp',
        ]


class CommentDetailSerializer(ModelSerializer):
    """
        Comment serializer for detail use case

        Extends ModelSerializer
    """
    user = ProfileDetailSerializer(read_only = True)
    replies = SerializerMethodField()
    reply_count = SerializerMethodField()
    content_object_url = SerializerMethodField()
    class Meta:
        model = Comment
        fields = [
            'id',
            'user',
            #'content_type',
            #'object_id',
            'content_object_url',
            'parent',
            'content',
            'timestamp',
            'reply_count',
            'replies',
        ]
        read_only_fields = [
            #'content_type',
            #'object_id',
            'parent',
            'reply_count',
            'replies',

        ]

    def get_replies(self, obj):
        """
            get replies comments (serialized) if the comment is a parent for replies SerializerMethodField
        """
        if obj.is_parent:
            return CommentChildSerializer(obj.children(), many=True).data
        return None
    def get_reply_count(self, obj):
        """
            return counts the number of replies. For reply_count SerializerMethodField
        """
        if obj.is_parent:
            return obj.children().count()
        return 0
    def get_content_object_url(self, obj):
        """
            returns content object api url. For content_object_url SerializerMethodField
        """
        try :
            return obj.content_object.get_api_url()
        except :
            return None


# class CommentEditSerializer(ModelSerializer):
#
#     class Meta:
#         model = Comment
#         fields = [
#             'id',
#             'content',
#             'timestamp',
#         ]


def create_comment_serializer(model_type='post', slug=None, parent_id=None, user=None):
    """
        Creates a comment serializer based on the model type.
    """
    class CommentCreateSerializer(ModelSerializer):
        """
            Comment serializer

            Extends ModelSerializer
        """
        class Meta:
            model = Comment
            fields = [
                'id',
                'content',
                'timestamp',
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
                raise ValidationError("This is not a slug for this content type")
            return data

        def create(self, validated_data):
            """
                Overrides serializer create method
            """
            content = validated_data.get('content')
            if user :
                main_user = user
            else :
                main_user = User.objects.all().first()
            model_type = self.model_type
            slug = self.slug
            parent_obj = self.parent_obj
            comment = Comment.objects.create_by_model_type(
                    model_type,
                    slug,
                    content,
                    main_user,
                    parent_obj,
                    )
            return comment

    return CommentCreateSerializer