from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from jobs.models import QuantumBackend, Job
from education.models import ExampleCircuit
import json


class Command(BaseCommand):
    help = 'Create sample data for the Quantum Job Dashboard'
    
    def handle(self, *args, **options):
        # Create superuser if it doesn't exist
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser('admin', 'admin@qjobs.com', 'admin123')
            self.stdout.write('Created admin user')
        
        # Create sample user
        if not User.objects.filter(username='alice').exists():
            User.objects.create_user('alice', 'alice@qjobs.com', 'alice123')
            self.stdout.write('Created alice user')
        
        # Create quantum backends
        backends_data = [
            {'name': 'ibmq_qasm_simulator', 'provider': 'IBM', 'is_simulator': True, 'num_qubits': 32},
            {'name': 'ibmq_lima', 'provider': 'IBM', 'is_simulator': False, 'num_qubits': 5},
            {'name': 'ibmq_belem', 'provider': 'IBM', 'is_simulator': False, 'num_qubits': 5},
            {'name': 'aer_simulator', 'provider': 'Qiskit', 'is_simulator': True, 'num_qubits': 30},
        ]
        
        for backend_data in backends_data:
            backend, created = QuantumBackend.objects.get_or_create(
                name=backend_data['name'],
                defaults=backend_data
            )
            if created:
                self.stdout.write(f'Created backend: {backend.name}')
        
        # Create sample jobs
        alice = User.objects.get(username='alice')
        simulator = QuantumBackend.objects.get(name='ibmq_qasm_simulator')
        
        sample_jobs = [
            {
                'name': 'Bell State Preparation',
                'description': 'Create and measure a Bell state',
                'status': 'completed',
                'qiskit_code': '''
from qiskit import QuantumCircuit, QuantumRegister, ClassicalRegister

# Create a quantum circuit with 2 qubits
qc = QuantumCircuit(2, 2)
qc.h(0)  # Apply Hadamard gate to qubit 0
qc.cx(0, 1)  # Apply CNOT gate
qc.measure_all()  # Measure all qubits
''',
                'result_data': {'00': 512, '11': 512}
            },
            {
                'name': 'Quantum Fourier Transform',
                'description': 'Implement QFT on 3 qubits',
                'status': 'running',
                'qiskit_code': '''
from qiskit import QuantumCircuit
import numpy as np

def qft(n):
    qc = QuantumCircuit(n)
    for j in range(n):
        qc.h(j)
        for k in range(j+1, n):
            qc.cp(np.pi/2**(k-j), k, j)
    return qc

# Create QFT circuit for 3 qubits
circuit = qft(3)
circuit.measure_all()
''',
                'result_data': None
            },
            {
                'name': 'Grover Search',
                'description': 'Search for marked item using Grover algorithm',
                'status': 'queued',
                'qiskit_code': '''
from qiskit import QuantumCircuit

# Grover's algorithm for 2 qubits
qc = QuantumCircuit(2, 2)

# Initialize superposition
qc.h([0, 1])

# Oracle (marking |11⟩)
qc.cz(0, 1)

# Diffusion operator
qc.h([0, 1])
qc.z([0, 1])
qc.cz(0, 1)
qc.h([0, 1])

qc.measure_all()
''',
                'result_data': None
            }
        ]
        
        for job_data in sample_jobs:
            job, created = Job.objects.get_or_create(
                name=job_data['name'],
                user=alice,
                defaults={
                    'description': job_data['description'],
                    'backend': simulator,
                    'status': job_data['status'],
                    'qiskit_code': job_data['qiskit_code'],
                    'result_data': job_data['result_data']
                }
            )
            if created:
                self.stdout.write(f'Created job: {job.name}')
        
        # Create example circuits
        example_circuits = [
            {
                'name': 'Bell State',
                'description': 'Create maximum entanglement between two qubits',
                'category': 'entanglement',
                'difficulty': 'beginner',
                'qiskit_code': '''
from qiskit import QuantumCircuit

# Create Bell State |Φ+⟩ = (|00⟩ + |11⟩)/√2
qc = QuantumCircuit(2, 2)
qc.h(0)      # Put qubit 0 in superposition
qc.cx(0, 1)  # Entangle qubits 0 and 1
qc.measure_all()
''',
                'theory_explanation': 'The Bell state is one of the four maximally entangled two-qubit quantum states.',
                'learning_objectives': ['Understand entanglement', 'Learn Hadamard and CNOT gates']
            },
            {
                'name': 'Quantum Teleportation',
                'description': 'Teleport quantum information using entanglement',
                'category': 'protocols',
                'difficulty': 'intermediate',
                'qiskit_code': '''
from qiskit import QuantumCircuit

# Quantum teleportation protocol
qc = QuantumCircuit(3, 3)

# Prepare the state to teleport (qubit 0)
qc.x(0)  # |1⟩ state (you can modify this)

# Create Bell pair between qubits 1 and 2
qc.h(1)
qc.cx(1, 2)

# Alice's operations
qc.cx(0, 1)
qc.h(0)
qc.measure(0, 0)
qc.measure(1, 1)

# Bob's operations (conditional on Alice's measurements)
qc.cx(1, 2)
qc.cz(0, 2)
qc.measure(2, 2)
''',
                'theory_explanation': 'Quantum teleportation uses entanglement to transfer quantum information.',
                'learning_objectives': ['Understand quantum teleportation', 'Learn conditional operations']
            }
        ]
        
        for circuit_data in example_circuits:
            circuit, created = ExampleCircuit.objects.get_or_create(
                name=circuit_data['name'],
                defaults={
                    **circuit_data,
                    'created_by': alice
                }
            )
            if created:
                self.stdout.write(f'Created example circuit: {circuit.name}')
        
        self.stdout.write(self.style.SUCCESS('Successfully created sample data!'))
