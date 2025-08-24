from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'jobs', views.JobViewSet, basename='job')
router.register(r'backends', views.QuantumBackendViewSet)
router.register(r'results', views.JobResultViewSet, basename='jobresult')

urlpatterns = [
    path('api/', include(router.urls)),
]
