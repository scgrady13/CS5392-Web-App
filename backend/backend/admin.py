from django.contrib import admin
from .models import User, Staff, ProfessionalRegistration, Professional, EmployerRegistration, Employer, Job
from .models import CreateProfRequest, CreateEmpRequest, JobMatchingRequest, ProfessionalProfileDeleteRequest, EmployerProfileDeleteRequest

admin.site.register(User)
admin.site.register(Staff)
admin.site.register(ProfessionalRegistration)
admin.site.register(Professional)
admin.site.register(EmployerRegistration)
admin.site.register(Employer)
admin.site.register(Job)
admin.site.register(CreateProfRequest)
admin.site.register(CreateEmpRequest)
admin.site.register(JobMatchingRequest)
admin.site.register(ProfessionalProfileDeleteRequest)
admin.site.register(EmployerProfileDeleteRequest)
