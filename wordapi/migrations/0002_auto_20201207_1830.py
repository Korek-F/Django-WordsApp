# Generated by Django 3.1.4 on 2020-12-07 17:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wordapi', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='word',
            old_name='word',
            new_name='word_en',
        ),
        migrations.AddField(
            model_name='word',
            name='word_pl',
            field=models.CharField(max_length=60, null=True),
        ),
    ]