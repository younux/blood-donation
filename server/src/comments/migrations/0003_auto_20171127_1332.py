# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-11-27 12:32
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('comments', '0002_auto_20171127_1223'),
    ]

    operations = [
        migrations.RenameField(
            model_name='comment',
            old_name='parent',
            new_name='parent_id',
        ),
    ]
