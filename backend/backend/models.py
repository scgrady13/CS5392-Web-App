from django.db import models

# User model
class User(models.Model):
    username = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)  # Please use Django's built-in User model or extend it for password handling
    user_type = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=20)

    class Meta:
        db_table = 'backend_user'

# Staff model
class Staff(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='staff', default=1)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=20)

    class Meta:
        db_table = 'backend_staff'

# ProfessionalRegistration model
class ProfessionalRegistration(models.Model):
    user_name = models.CharField(max_length=255, default='default_name')
    institution_name = models.CharField(max_length=255)
    street_address = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    zip = models.CharField(max_length=10)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    degree_name = models.CharField(max_length=255, default='Unknown')
    month_complete = models.IntegerField(default=1)
    year_complete = models.IntegerField(default=2000)
    category = models.CharField(max_length=255, default='')
    keywords = models.CharField(max_length=255, default='')
    class Meta:
        db_table = 'backend_professionalregistration'

# Professional model
class Professional(models.Model):
    id = models.AutoField(primary_key=True)
    user_name = models.CharField(max_length=255, default='default_name')
    institution_name = models.CharField(max_length=255)
    street_address = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    zip = models.CharField(max_length=10)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    degree_name = models.CharField(max_length=255, default='Unknown')
    month_complete = models.IntegerField(default=1)
    year_complete = models.IntegerField(default=2000)
    category = models.CharField(max_length=255, default='')
    keywords = models.CharField(max_length=255, default='')

    class Meta:
        db_table = 'backend_professional'

# EmployerRegistration model
class EmployerRegistration(models.Model):
    user_name = models.CharField(max_length=255, default='default_name')
    company_name = models.CharField(max_length=255)
    street_address = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    zip = models.CharField(max_length=10)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)

    class Meta:
        db_table = 'backend_employerregistration'

# Employer model
class Employer(models.Model):
    id = models.AutoField(primary_key=True)
    company_name = models.CharField(max_length=255)
    street_address = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    zip = models.CharField(max_length=10)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)

    class Meta:
        db_table = 'backend_employer'
# Job model
class Job(models.Model):
    employer = models.ForeignKey(Employer, on_delete=models.CASCADE, related_name='jobs')
    position_name = models.CharField(max_length=255)
    contact_first_name = models.CharField(max_length=255)
    contact_last_name = models.CharField(max_length=255)
    contact_phone = models.CharField(max_length=20)
    contact_email = models.EmailField()
    start_date = models.DateField()
    end_date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    payment = models.DecimalField(max_digits=10, decimal_places=2)
    qualifications_required = models.TextField()

    class Meta:
        db_table = 'backend_job'

# CreateProfRequest model
class CreateProfRequest(models.Model):
    request_id = models.AutoField(primary_key=True)
    professional_temp_id = models.CharField(max_length=10)

    class Meta:
        db_table = 'CreateProfRequest'

# CreateEmpRequest model
class CreateEmpRequest(models.Model):
    request_id = models.AutoField(primary_key=True)
    employer_temp_id = models.CharField(max_length=10)

    class Meta:
        db_table = 'CreateEmpRequest'

# JobMatchingRequest model
class JobMatchingRequest(models.Model):
    request_id = models.AutoField(primary_key=True)
    professional_id = models.CharField(max_length=10)

    class Meta:
        db_table = 'JobMatchingRequest'

# ProfessionalProfileDeleteRequest model
class ProfessionalProfileDeleteRequest(models.Model):
    id = models.AutoField(primary_key=True)
    user_name = models.CharField(max_length=255, default='default_name')
    institution_name = models.CharField(max_length=255, default='')
    street_address = models.CharField(max_length=255, default='')
    city = models.CharField(max_length=255, default='')
    state = models.CharField(max_length=255, default='')
    zip = models.CharField(max_length=10, default='')
    first_name = models.CharField(max_length=255, default='')
    last_name = models.CharField(max_length=255, default='')
    email = models.EmailField(default='')
    phone = models.CharField(max_length=20, default='')
    degree_name = models.CharField(max_length=255, default='Unknown')
    month_complete = models.IntegerField(default=1)
    year_complete = models.IntegerField(default=2000)
    category = models.CharField(max_length=255, default='')
    keywords = models.CharField(max_length=255, default='')

    class Meta:
        db_table = 'ProfessionalProfileDeleteRequest'

# EmployerProfileDeleteRequest model
class EmployerProfileDeleteRequest(models.Model):
    id = models.AutoField(primary_key=True)
    company_name = models.CharField(max_length=255, default='')
    street_address = models.CharField(max_length=255, default='')
    city = models.CharField(max_length=255, default='')
    state = models.CharField(max_length=255, default='')
    zip = models.CharField(max_length=10, default='')
    first_name = models.CharField(max_length=255, default='')
    last_name = models.CharField(max_length=255, default='')
    email = models.EmailField(default='')
    phone = models.CharField(max_length=20, default='')

    class Meta:
        db_table = 'EmployerProfileDeleteRequest'