# -*- coding: utf-8 -*-
from .settings import api_settings
from .utils import camelize


class CamelCaseJSONRenderer(api_settings.RENDERER_CLASS):
    """
        Custom Rendrer Class

        Transforms underscore case to camel case when rendering data
    """
    def render(self, data, *args, **kwargs):
        """
            Transforms underscore case to camel case when rendering data
        """
        return super(CamelCaseJSONRenderer, self).render(camelize(data), *args,
                                                         **kwargs)