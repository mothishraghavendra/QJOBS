from django.db import models
from django.contrib.auth.models import User


class ExampleCircuit(models.Model):
    """Pre-built example quantum circuits for learning"""
    DIFFICULTY_CHOICES = [
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
    ]
    
    CATEGORY_CHOICES = [
        ('basic', 'Basic Gates'),
        ('entanglement', 'Entanglement'),
        ('algorithms', 'Quantum Algorithms'),
        ('protocols', 'Quantum Protocols'),
        ('games', 'Quantum Games'),
    ]
    
    name = models.CharField(max_length=200)
    description = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    difficulty = models.CharField(max_length=15, choices=DIFFICULTY_CHOICES)
    
    # Circuit code and visualization
    qiskit_code = models.TextField()
    circuit_image = models.ImageField(upload_to='example_circuits/', blank=True, null=True)
    
    # Educational content
    theory_explanation = models.TextField(blank=True)
    learning_objectives = models.JSONField(default=list)  # List of learning goals
    prerequisites = models.JSONField(default=list)  # List of required knowledge
    
    # Metadata
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_examples')
    is_featured = models.BooleanField(default=False)
    run_count = models.IntegerField(default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['difficulty', 'name']
    
    def __str__(self):
        return f"{self.name} ({self.difficulty})"


class Tutorial(models.Model):
    """Step-by-step tutorials for quantum computing"""
    title = models.CharField(max_length=200)
    description = models.TextField()
    content = models.TextField()  # Markdown content
    
    # Tutorial structure
    order = models.IntegerField(default=0)
    estimated_time_minutes = models.IntegerField(default=15)
    
    # Related circuits
    example_circuits = models.ManyToManyField(ExampleCircuit, blank=True)
    
    # Metadata
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    is_published = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['order']
    
    def __str__(self):
        return self.title


class UserProgress(models.Model):
    """Track user progress through tutorials and examples"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='learning_progress')
    
    # Completed items
    completed_examples = models.ManyToManyField(ExampleCircuit, blank=True)
    completed_tutorials = models.ManyToManyField(Tutorial, blank=True)
    
    # Progress tracking
    current_level = models.CharField(
        max_length=15,
        choices=ExampleCircuit.DIFFICULTY_CHOICES,
        default='beginner'
    )
    total_examples_run = models.IntegerField(default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.user.username}'s Progress"
