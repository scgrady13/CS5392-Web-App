# Generated by Django 5.0.2 on 2024-04-24 18:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0005_remove_employer_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='professional',
            name='user',
        ),
        migrations.RemoveField(
            model_name='professionalregistration',
            name='user',
        ),
        migrations.AddField(
            model_name='professionalregistration',
            name='user_name',
            field=models.CharField(default='default_name', max_length=255),
        ),
    ]
