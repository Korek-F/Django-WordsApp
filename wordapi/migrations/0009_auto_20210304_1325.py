# Generated by Django 3.0.6 on 2021-03-04 12:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('wordapi', '0008_auto_20210304_1313'),
    ]

    operations = [
        migrations.RenameField(
            model_name='profileword',
            old_name='word',
            new_name='word_en',
        ),
    ]
