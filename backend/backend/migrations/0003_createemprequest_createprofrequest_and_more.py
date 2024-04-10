# Generated by Django 5.0.2 on 2024-04-08 16:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_employerregistration_user_professional_user_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='CreateEmpRequest',
            fields=[
                ('request_id', models.AutoField(primary_key=True, serialize=False)),
                ('employer_temp_id', models.CharField(max_length=10)),
            ],
            options={
                'db_table': 'CreateEmpRequest',
            },
        ),
        migrations.CreateModel(
            name='CreateProfRequest',
            fields=[
                ('request_id', models.AutoField(primary_key=True, serialize=False)),
                ('professional_temp_id', models.CharField(max_length=10)),
            ],
            options={
                'db_table': 'CreateProfRequest',
            },
        ),
        migrations.CreateModel(
            name='EmployerProfileDeleteRequest',
            fields=[
                ('request_id', models.AutoField(primary_key=True, serialize=False)),
                ('employer_id', models.CharField(max_length=10)),
            ],
            options={
                'db_table': 'EmployerProfileDeleteRequest',
            },
        ),
        migrations.CreateModel(
            name='JobMatchingRequest',
            fields=[
                ('request_id', models.AutoField(primary_key=True, serialize=False)),
                ('professional_id', models.CharField(max_length=10)),
            ],
            options={
                'db_table': 'JobMatchingRequest',
            },
        ),
        migrations.CreateModel(
            name='ProfessionalProfileDeleteRequest',
            fields=[
                ('request_id', models.AutoField(primary_key=True, serialize=False)),
                ('professional_id', models.CharField(max_length=10)),
            ],
            options={
                'db_table': 'ProfessionalProfileDeleteRequest',
            },
        ),
    ]
