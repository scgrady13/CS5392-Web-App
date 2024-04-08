from rest_framework import viewsets
from .models import ProfessionalRegistration
from .serializers import ProfessionalRegistrationSerializer

class ProfessionalRegistrationViewSet(viewsets.ModelViewSet):
    serializer_class = ProfessionalRegistrationSerializer
    queryset = ProfessionalRegistration.objects.all()

    
