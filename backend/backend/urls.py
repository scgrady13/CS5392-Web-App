from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProfessionalRegistrationViewSet

router = DefaultRouter()
router.register(r'professional_registrations', ProfessionalRegistrationViewSet, basename='professional-registration')

urlpatterns = [
    path("admin/", admin.site.urls),
    path('', include(router.urls)),
]
