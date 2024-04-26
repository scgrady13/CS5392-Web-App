# Generated by Django 5.0.4 on 2024-04-25 19:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0021_rename_request_id_employerprofiledeleterequest_id_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='professionalprofiledeleterequest',
            old_name='request_id',
            new_name='id',
        ),
        migrations.RemoveField(
            model_name='professionalprofiledeleterequest',
            name='professional_id',
        ),
        migrations.AddField(
            model_name='professionalprofiledeleterequest',
            name='category',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AddField(
            model_name='professionalprofiledeleterequest',
            name='city',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AddField(
            model_name='professionalprofiledeleterequest',
            name='degree_name',
            field=models.CharField(default='Unknown', max_length=255),
        ),
        migrations.AddField(
            model_name='professionalprofiledeleterequest',
            name='email',
            field=models.EmailField(default='', max_length=254),
        ),
        migrations.AddField(
            model_name='professionalprofiledeleterequest',
            name='first_name',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AddField(
            model_name='professionalprofiledeleterequest',
            name='institution_name',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AddField(
            model_name='professionalprofiledeleterequest',
            name='keywords',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AddField(
            model_name='professionalprofiledeleterequest',
            name='last_name',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AddField(
            model_name='professionalprofiledeleterequest',
            name='month_complete',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='professionalprofiledeleterequest',
            name='phone',
            field=models.CharField(default='', max_length=20),
        ),
        migrations.AddField(
            model_name='professionalprofiledeleterequest',
            name='state',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AddField(
            model_name='professionalprofiledeleterequest',
            name='street_address',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AddField(
            model_name='professionalprofiledeleterequest',
            name='user_name',
            field=models.CharField(default='default_name', max_length=255),
        ),
        migrations.AddField(
            model_name='professionalprofiledeleterequest',
            name='year_complete',
            field=models.IntegerField(default=2000),
        ),
        migrations.AddField(
            model_name='professionalprofiledeleterequest',
            name='zip',
            field=models.CharField(default='', max_length=10),
        ),
    ]