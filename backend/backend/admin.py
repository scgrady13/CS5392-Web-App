from django.contrib import admin
from .models import User, Staff, ProfessionalRegistration, Professional, EmployerRegistration, Employer, Job


admin.site.register(User)
admin.site.register(Staff)
admin.site.register(ProfessionalRegistration)
admin.site.register(Professional)
admin.site.register(EmployerRegistration)
admin.site.register(Employer)
admin.site.register(Job)