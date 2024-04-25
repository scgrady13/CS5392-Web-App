from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'professional-registrations', ProfessionalRegistrationViewSet, basename='professional-registration')

router.register(r'employer-registrations', EmployerRegistrationViewSet, basename='employer-registration')

router.register(r'employers-delete', EmployerProfileDeleteRequestViewSet, basename='employer-delete')
router.register(r'professional-delete', ProfessionalProfileDeleteRequestViewSet, basename='professional-delete')

router.register(r'employers', EmployerViewSet, basename='employer')

router.register(r'professionals', ProfessionalViewSet, basename='professional')
urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/', include(router.urls)),
]