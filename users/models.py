from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


class UserProfile(models.Model):
    """Extended user profile for quantum job tracking"""
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    
    # Profile information
    bio = models.TextField(max_length=500, blank=True)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    organization = models.CharField(max_length=200, blank=True)
    
    # Quantum experience
    experience_level = models.CharField(
        max_length=20,
        choices=[
            ('beginner', 'Beginner'),
            ('intermediate', 'Intermediate'),
            ('advanced', 'Advanced'),
            ('expert', 'Expert'),
        ],
        default='beginner'
    )
    
    # Preferences
    favorite_backend = models.CharField(max_length=100, blank=True)
    preferred_language = models.CharField(max_length=20, default='python')
    
    # Statistics
    total_jobs_submitted = models.IntegerField(default=0)
    total_jobs_completed = models.IntegerField(default=0)
    total_execution_time_ms = models.BigIntegerField(default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.user.username}'s Profile"
    
    @property
    def success_rate(self):
        """Calculate job success rate"""
        if self.total_jobs_submitted == 0:
            return 0
        return round((self.total_jobs_completed / self.total_jobs_submitted) * 100, 2)


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    """Automatically create user profile when user is created"""
    if created:
        UserProfile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    """Save user profile when user is saved"""
    instance.userprofile.save()


class UserAchievement(models.Model):
    """User achievements and badges"""
    ACHIEVEMENT_TYPES = [
        ('first_job', 'First Job Submitted'),
        ('ten_jobs', '10 Jobs Completed'),
        ('hundred_jobs', '100 Jobs Completed'),
        ('bell_state', 'Bell State Master'),
        ('teleportation', 'Quantum Teleportation'),
        ('grover', 'Grover\'s Algorithm'),
        ('collaborator', 'Team Player'),
        ('educator', 'Mentor'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='achievements')
    achievement_type = models.CharField(max_length=20, choices=ACHIEVEMENT_TYPES)
    title = models.CharField(max_length=100)
    description = models.TextField()
    icon = models.CharField(max_length=50, default='🏆')
    earned_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['user', 'achievement_type']
    
    def __str__(self):
        return f"{self.user.username} - {self.title}"
