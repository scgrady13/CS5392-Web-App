from rest_framework import viewsets
from .models import User, ProfessionalRegistration, Staff, Professional, EmployerRegistration, Employer, Job, CreateProfRequest, CreateEmpRequest, JobMatchingRequest, ProfessionalProfileDeleteRequest, EmployerProfileDeleteRequest
from .serializers import UserSerializer, ProfessionalRegistrationSerializer, StaffSerializer, ProfessionalSerializer, EmployerRegistrationSerializer, EmployerSerializer, JobSerializer, CreateProfRequestSerializer, CreateEmpRequestSerializer, JobMatchingRequestSerializer, ProfessionalProfileDeleteRequestSerializer, EmployerProfileDeleteRequestSerializer

class CreateProfRequestViewSet(viewsets.ModelViewSet):
    queryset = CreateProfRequest.objects.all()

class ProfessionalRegistrationViewSet(viewsets.ModelViewSet):
    serializer_class = ProfessionalRegistrationSerializer
    queryset = ProfessionalRegistration.objects.all()

class StaffViewSet(viewsets.ModelViewSet):
    serializer_class = StaffSerializer
    queryset = Staff.objects.all()

class ProfessionalViewSet(viewsets.ModelViewSet):
    serializer_class = ProfessionalSerializer
    queryset = Professional.objects.all()

class EmployerRegistrationViewSet(viewsets.ModelViewSet):
    serializer_class = EmployerRegistrationSerializer
    queryset = EmployerRegistration.objects.all()

class EmployerViewSet(viewsets.ModelViewSet):
    serializer_class = EmployerSerializer
    queryset = Employer.objects.all()

class JobViewSet(viewsets.ModelViewSet):
    serializer_class = JobSerializer
    queryset = Job.objects.all()
    
class CreateProfRequestViewSet(viewsets.ModelViewSet):
    queryset = CreateProfRequest.objects.all()
    serializer_class = CreateProfRequestSerializer

class CreateEmpRequestViewSet(viewsets.ModelViewSet):
    queryset = CreateEmpRequest.objects.all()
    serializer_class = CreateEmpRequestSerializer

class JobMatchingRequestViewSet(viewsets.ModelViewSet):
    queryset = JobMatchingRequest.objects.all()
    serializer_class = JobMatchingRequestSerializer

class ProfessionalProfileDeleteRequestViewSet(viewsets.ModelViewSet):
    queryset = ProfessionalProfileDeleteRequest.objects.all()
    serializer_class = ProfessionalProfileDeleteRequestSerializer

class EmployerProfileDeleteRequestViewSet(viewsets.ModelViewSet):
    queryset = EmployerProfileDeleteRequest.objects.all()
    serializer_class = EmployerProfileDeleteRequestSerializer