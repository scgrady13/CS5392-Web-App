from rest_framework import serializers
from .models import User, ProfessionalRegistration, Staff, Professional, EmployerRegistration, Employer, Job

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
    user = UserSerializer()

    class Meta:
        model = ProfessionalRegistration
        fields = '__all__'

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user_serializer = UserSerializer(data=user_data)
        user_serializer.is_valid(raise_exception=True)
        user = user_serializer.save()
        professional_registration = ProfessionalRegistration.objects.create(user=user, **validated_data)
        return professional_registration

class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = '__all__'

class ProfessionalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Professional
        fields = '__all__'

class EmployerRegistrationSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = EmployerRegistration
        fields = '__all__'

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user_serializer = UserSerializer(data=user_data)
        user_serializer.is_valid(raise_exception=True)
        user = user_serializer.save()
        employer_registration = EmployerRegistration.objects.create(user=user, **validated_data)
        return employer_registration

class EmployerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employer
        fields = '__all__'

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__'
from rest_framework import serializers
from .models import CreateProfRequest, CreateEmpRequest, JobMatchingRequest, ProfessionalProfileDeleteRequest, EmployerProfileDeleteRequest

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

class EmployerProfileDeleteRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployerProfileDeleteRequest
        fields = '__all__'
