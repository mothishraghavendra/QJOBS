from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Count, Avg
from .models import Job, QuantumBackend, JobResult
from .serializers import JobSerializer, QuantumBackendSerializer, JobResultSerializer, JobCreateSerializer


class QuantumBackendViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for quantum backends"""
    queryset = QuantumBackend.objects.filter(is_active=True)
    serializer_class = QuantumBackendSerializer


class JobViewSet(viewsets.ModelViewSet):
    """ViewSet for quantum jobs"""
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Job.objects.filter(user=self.request.user)
    
    def get_serializer_class(self):
        if self.action == 'create':
            return JobCreateSerializer
        return JobSerializer
    
    @action(detail=False, methods=['get'])
    def dashboard_stats(self, request):
        """Get dashboard statistics"""
        user = request.user
        jobs = Job.objects.filter(user=user)
        
        stats = {
            'total_jobs': jobs.count(),
            'running_jobs': jobs.filter(status='running').count(),
            'completed_jobs': jobs.filter(status='completed').count(),
            'queued_jobs': jobs.filter(status='queued').count(),
            'failed_jobs': jobs.filter(status='failed').count(),
        }
        
        # Calculate average waiting time
        completed_jobs = jobs.filter(status='completed', waiting_time_ms__isnull=False)
        if completed_jobs.exists():
            stats['avg_waiting_time_ms'] = completed_jobs.aggregate(
                avg_wait=Avg('waiting_time_ms')
            )['avg_wait']
        else:
            stats['avg_waiting_time_ms'] = 0
            
        return Response(stats)
    
    @action(detail=True, methods=['post'])
    def share(self, request, pk=None):
        """Share a job with other users"""
        job = self.get_object()
        job.is_shared = True
        job.save()
        return Response({'status': 'shared'})
    
    @action(detail=True, methods=['get'])
    def circuit_image(self, request, pk=None):
        """Get circuit visualization"""
        job = self.get_object()
        if job.circuit_image:
            return Response({'image_url': job.circuit_image.url})
        return Response({'image_url': None})


class JobResultViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for job results"""
    serializer_class = JobResultSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return JobResult.objects.filter(job__user=self.request.user)
