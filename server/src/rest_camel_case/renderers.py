# -*- coding: utf-8 -*-
from .settings import api_settings
from .utils import camelize


class CamelCaseJSONRenderer(api_settings.RENDERER_CLASS):
    def render(self, data, *args, **kwargs):
        return super(CamelCaseJSONRenderer, self).render(camelize(data), *args,
                                                         **kwargs)