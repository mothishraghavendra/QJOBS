from django.db import models
from django.contrib.auth.models import User
from jobs.models import Job, QuantumBackend
from django.utils import timezone


class DashboardMetrics(models.Model):
    """Daily aggregated metrics for dashboard"""
    date = models.DateField(unique=True)
    
    # Job statistics
    jobs_submitted = models.IntegerField(default=0)
    jobs_completed = models.IntegerField(default=0)
    jobs_failed = models.IntegerField(default=0)
    jobs_running = models.IntegerField(default=0)
    jobs_queued = models.IntegerField(default=0)
    
    # Performance metrics
    avg_waiting_time_ms = models.FloatField(default=0)
    avg_execution_time_ms = models.FloatField(default=0)
    total_execution_time_ms = models.BigIntegerField(default=0)
    
    # User activity
    active_users = models.IntegerField(default=0)
    new_users = models.IntegerField(default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-date']
    
    def __str__(self):
        return f"Metrics for {self.date}"


class BackendUsage(models.Model):
    """Track usage statistics for different backends"""
    backend = models.ForeignKey(QuantumBackend, on_delete=models.CASCADE)
    date = models.DateField()
    
    jobs_count = models.IntegerField(default=0)
    total_execution_time_ms = models.BigIntegerField(default=0)
    avg_execution_time_ms = models.FloatField(default=0)
    success_rate = models.FloatField(default=0)  # Percentage
    
    class Meta:
        unique_together = ['backend', 'date']
        ordering = ['-date']
    
    def __str__(self):
        return f"{self.backend.name} usage on {self.date}"


class UserActivity(models.Model):
    """Track individual user activity"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='activity_logs')
    date = models.DateField()
    
    # Activity counts
    jobs_submitted = models.IntegerField(default=0)
    jobs_completed = models.IntegerField(default=0)
    examples_run = models.IntegerField(default=0)
    comments_made = models.IntegerField(default=0)
    
    # Time spent
    total_session_time_minutes = models.IntegerField(default=0)
    
    class Meta:
        unique_together = ['user', 'date']
        ordering = ['-date']
    
    def __str__(self):
        return f"{self.user.username} activity on {self.date}"


class SystemHealth(models.Model):
    """System health and performance monitoring"""
    timestamp = models.DateTimeField(auto_now_add=True)
    
    # Queue statistics
    queue_length = models.IntegerField(default=0)
    avg_queue_wait_time_ms = models.FloatField(default=0)
    
    # System performance
    cpu_usage_percent = models.FloatField(default=0)
    memory_usage_percent = models.FloatField(default=0)
    
    # Error rates
    error_rate_percent = models.FloatField(default=0)
    timeout_rate_percent = models.FloatField(default=0)
    
    class Meta:
        ordering = ['-timestamp']
    
    def __str__(self):
        return f"System health at {self.timestamp}"


class LeaderboardEntry(models.Model):
    """Leaderboard for most active users"""
    LEADERBOARD_TYPES = [
        ('jobs_completed', 'Jobs Completed'),
        ('execution_time', 'Total Execution Time'),
        ('examples_run', 'Examples Completed'),
        ('collaboration', 'Most Collaborative'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    leaderboard_type = models.CharField(max_length=20, choices=LEADERBOARD_TYPES)
    score = models.FloatField()
    rank = models.IntegerField()
    
    # Time period
    period_start = models.DateField()
    period_end = models.DateField()
    
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ['user', 'leaderboard_type', 'period_start', 'period_end']
        ordering = ['rank']
    
    def __str__(self):
        return f"{self.user.username} - Rank {self.rank} in {self.leaderboard_type}"
