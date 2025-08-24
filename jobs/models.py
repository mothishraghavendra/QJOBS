from django.db import models
from django.contrib.auth.models import User
import uuid


class QuantumBackend(models.Model):
    """Model for quantum computing backends"""
    name = models.CharField(max_length=100, unique=True)
    provider = models.CharField(max_length=50, default='IBM')
    is_simulator = models.BooleanField(default=True)
    num_qubits = models.IntegerField(default=5)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.name} ({self.provider})"


class Job(models.Model):
    """Model for quantum computing jobs"""
    STATUS_CHOICES = [
        ('queued', 'Queued'),
        ('running', 'Running'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
        ('cancelled', 'Cancelled'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='quantum_jobs')
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    
    # Job execution details
    backend = models.ForeignKey(QuantumBackend, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='queued')
    
    # Code and circuit
    qiskit_code = models.TextField()
    circuit_image = models.ImageField(upload_to='circuit_images/', blank=True, null=True)
    
    # Timing information
    created_at = models.DateTimeField(auto_now_add=True)
    started_at = models.DateTimeField(blank=True, null=True)
    completed_at = models.DateTimeField(blank=True, null=True)
    execution_time_ms = models.IntegerField(blank=True, null=True)
    
    # Results
    result_data = models.JSONField(blank=True, null=True)
    error_message = models.TextField(blank=True)
    
    # Collaboration
    is_shared = models.BooleanField(default=False)
    shared_with = models.ManyToManyField(User, blank=True, related_name='shared_jobs')
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.name} ({self.status})"
    
    @property
    def waiting_time_ms(self):
        """Calculate waiting time in milliseconds"""
        if self.started_at and self.created_at:
            return int((self.started_at - self.created_at).total_seconds() * 1000)
        return None


class JobResult(models.Model):
    """Model for storing detailed job results"""
    job = models.OneToOneField(Job, on_delete=models.CASCADE, related_name='detailed_results')
    
    # Measurement results
    counts = models.JSONField(blank=True, null=True)  # e.g., {"00": 512, "11": 488}
    probabilities = models.JSONField(blank=True, null=True)
    
    # Hardware specific data
    shots = models.IntegerField(default=1024)
    calibration_data = models.JSONField(blank=True, null=True)
    
    # Visualization data
    histogram_image = models.ImageField(upload_to='result_images/', blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Results for {self.job.name}"
