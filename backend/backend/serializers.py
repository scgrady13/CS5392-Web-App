from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'user_type', 'email', 'phone_number']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            user_type=validated_data['user_type'],
            email=validated_data['email'],
            phone_number=validated_data['phone_number'],
            password=validated_data['password']
        )
        user.save()
        return user

class ProfessionalRegistrationSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProfessionalRegistration
        fields = '__all__'

class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = '__all__'

class ProfessionalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Professional
        fields = '__all__'

class EmployerRegistrationSerializer(serializers.ModelSerializer):

    class Meta:
        model = EmployerRegistration
        fields = '__all__'


class EmployerProfileDeleteRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployerProfileDeleteRequest
        fields = '__all__'

class EmployerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employer
        fields = '__all__'

    

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__'


class CreateProfRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreateProfRequest
        fields = '__all__'

class CreateEmpRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreateEmpRequest
        fields = '__all__'

class JobMatchingRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobMatchingRequest
        fields = '__all__'

class ProfessionalProfileDeleteRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfessionalProfileDeleteRequest
        fields = '__all__'


