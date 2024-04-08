# Generated by Django 4.2 on 2024-04-08 14:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="EmployerRegistration",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("company_name", models.CharField(max_length=255)),
                ("street_address", models.CharField(max_length=255)),
                ("city", models.CharField(max_length=255)),
                ("state", models.CharField(max_length=255)),
                ("zip", models.CharField(max_length=10)),
                ("first_name", models.CharField(max_length=255)),
                ("last_name", models.CharField(max_length=255)),
                ("email", models.EmailField(max_length=254)),
                ("phone", models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name="Professional",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("first_name", models.CharField(max_length=255)),
                ("last_name", models.CharField(max_length=255)),
                ("email_address", models.EmailField(max_length=254)),
                ("degree_name", models.CharField(max_length=255)),
                ("institution_name", models.CharField(max_length=255)),
                ("month_complete", models.IntegerField()),
                ("year_complete", models.IntegerField()),
                ("street_address", models.CharField(max_length=255)),
                ("city", models.CharField(max_length=255)),
                ("state", models.CharField(max_length=255)),
                ("zip", models.CharField(max_length=10)),
                ("qualifications", models.TextField()),
                ("phone_number", models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name="ProfessionalRegistration",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("first_name", models.CharField(max_length=255)),
                ("last_name", models.CharField(max_length=255)),
                ("email_address", models.EmailField(max_length=254)),
                ("degree_name", models.CharField(max_length=255)),
                ("institution_name", models.CharField(max_length=255)),
                ("month_complete", models.IntegerField()),
                ("year_complete", models.IntegerField()),
                ("street_address", models.CharField(max_length=255)),
                ("city", models.CharField(max_length=255)),
                ("state", models.CharField(max_length=255)),
                ("zip", models.CharField(max_length=10)),
                ("phone_number", models.CharField(max_length=20)),
            ],
            options={
                "db_table": "backend_professionalregistration",
            },
        ),
        migrations.CreateModel(
            name="Staff",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("first_name", models.CharField(max_length=255)),
                ("last_name", models.CharField(max_length=255)),
                ("email", models.EmailField(max_length=254, unique=True)),
                ("phone_number", models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name="User",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("username", models.CharField(max_length=255, unique=True)),
                ("password", models.CharField(max_length=255)),
                ("user_type", models.CharField(max_length=50)),
                ("email", models.EmailField(max_length=254, unique=True)),
                ("phone_number", models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name="Job",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("position_name", models.CharField(max_length=255)),
                ("contact_first_name", models.CharField(max_length=255)),
                ("contact_last_name", models.CharField(max_length=255)),
                ("contact_phone", models.CharField(max_length=20)),
                ("contact_email", models.EmailField(max_length=254)),
                ("start_date", models.DateField()),
                ("end_date", models.DateField()),
                ("start_time", models.TimeField()),
                ("end_time", models.TimeField()),
                ("payment", models.DecimalField(decimal_places=2, max_digits=10)),
                ("qualifications_required", models.TextField()),
                (
                    "employer",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="backend.employerregistration",
                    ),
                ),
            ],
        ),
    ]
