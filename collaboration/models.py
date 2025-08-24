from django.db import models
from django.contrib.auth.models import User
from jobs.models import Job


class JobComment(models.Model):
    """Comments on shared jobs"""
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Comment by {self.user.username} on {self.job.name}"


class JobShare(models.Model):
    """Sharing settings for jobs"""
    job = models.OneToOneField(Job, on_delete=models.CASCADE, related_name='share_settings')
    shared_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='shared_jobs_created')
    
    # Sharing permissions
    can_view = models.BooleanField(default=True)
    can_comment = models.BooleanField(default=True)
    can_copy = models.BooleanField(default=False)
    can_modify = models.BooleanField(default=False)
    
    # Access control
    is_public = models.BooleanField(default=False)
    access_token = models.CharField(max_length=100, unique=True)
    expires_at = models.DateTimeField(blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Share settings for {self.job.name}"


class Notification(models.Model):
    """User notifications"""
    NOTIFICATION_TYPES = [
        ('job_completed', 'Job Completed'),
        ('job_failed', 'Job Failed'),
        ('job_shared', 'Job Shared'),
        ('comment_added', 'Comment Added'),
        ('achievement_earned', 'Achievement Earned'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    notification_type = models.CharField(max_length=20, choices=NOTIFICATION_TYPES)
    title = models.CharField(max_length=200)
    message = models.TextField()
    
    # Related objects
    job = models.ForeignKey(Job, on_delete=models.CASCADE, blank=True, null=True)
    
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Notification for {self.user.username}: {self.title}"
