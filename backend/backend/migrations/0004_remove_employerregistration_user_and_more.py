# Generated by Django 5.0.2 on 2024-04-24 18:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0003_createemprequest_createprofrequest_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='employerregistration',
            name='user',
        ),
        migrations.AddField(
            model_name='employerregistration',
            name='user_name',
            field=models.CharField(default='default_name', max_length=255),
        ),
    ]
