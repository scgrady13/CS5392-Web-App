# Generated by Django 5.0.4 on 2024-04-25 17:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0010_alter_user_managers_remove_user_date_joined_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='professionalregistration',
            old_name='month_complete',
            new_name='completion_date',
        ),
        migrations.RemoveField(
            model_name='professionalregistration',
            name='year_complete',
        ),
    ]
