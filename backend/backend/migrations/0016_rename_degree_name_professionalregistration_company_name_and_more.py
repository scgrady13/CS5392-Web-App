# Generated by Django 5.0.4 on 2024-04-25 18:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0015_alter_professionalregistration_category_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='professionalregistration',
            old_name='degree_name',
            new_name='company_name',
        ),
        migrations.RenameField(
            model_name='professionalregistration',
            old_name='email_address',
            new_name='email',
        ),
        migrations.RenameField(
            model_name='professionalregistration',
            old_name='phone_number',
            new_name='phone',
        ),
        migrations.RemoveField(
            model_name='professionalregistration',
            name='category',
        ),
        migrations.RemoveField(
            model_name='professionalregistration',
            name='institution_name',
        ),
        migrations.RemoveField(
            model_name='professionalregistration',
            name='keywords',
        ),
    ]
