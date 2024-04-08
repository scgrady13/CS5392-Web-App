# serializers.py

from rest_framework import serializers
from .models import User, ProfessionalRegistration

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
