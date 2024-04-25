from rest_framework import generics, viewsets
from rest_framework.response import Response
from .models import *
from .serializers import *

class ProfessionalRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Professional.objects.all()
    serializer_class = ProfessionalSerializer

    def patch(self, request, *args, **kwargs):
        partial = True
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def perform_update(self, serializer):
        serializer.save()

class EmployerRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Employer.objects.all()
    serializer_class = EmployerSerializer

    def patch(self, request, *args, **kwargs):
        partial = True
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def perform_update(self, serializer):
        serializer.save()


class CreateProfRequestViewSet(viewsets.ModelViewSet):
    queryset = CreateProfRequest.objects.all()
    serializer_class = CreateProfRequestSerializer

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
