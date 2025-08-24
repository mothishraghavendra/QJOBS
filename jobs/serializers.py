from rest_framework import serializers
from .models import Job, QuantumBackend, JobResult


class QuantumBackendSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuantumBackend
        fields = '__all__'


class JobSerializer(serializers.ModelSerializer):
    backend_name = serializers.CharField(source='backend.name', read_only=True)
    user_name = serializers.CharField(source='user.username', read_only=True)
    waiting_time_ms = serializers.ReadOnlyField()
    
    class Meta:
        model = Job
        fields = '__all__'
        read_only_fields = ('id', 'user', 'created_at', 'started_at', 'completed_at')


class JobResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobResult
        fields = '__all__'


class JobCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ['name', 'description', 'backend', 'qiskit_code']
    
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
