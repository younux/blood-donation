# -*- coding: utf-8 -*-
import json

from django.conf import settings
from rest_framework.parsers import ParseError, six

from .settings import api_settings
from .utils import underscoreize


class CamelCaseJSONParser(api_settings.PARSER_CLASS):
    """
        Custom Parser Class

        Transforms camel case to underscore case when parsing data
    """
    def parse(self, stream, media_type=None, parser_context=None):
        """
        Transforms camel case to underscore case when parsing data
        """
        parser_context = parser_context or {}
        encoding = parser_context.get('encoding', settings.DEFAULT_CHARSET)

        try:
            data = stream.read().decode(encoding)
            return underscoreize(json.loads(data))
        except ValueError as exc:
            raise ParseError('JSON parse error - %s' % six.text_type(exc))