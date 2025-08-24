#!/bin/bash
# Quick setup script for Quantum Job Dashboard

echo "🚀 Setting up Quantum Job Dashboard..."
echo ""

# Check if Python is installed
if ! command -v python &> /dev/null; then
    echo "❌ Python is not installed. Please install Python 3.11+"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+"
    exit 1
fi

echo "✅ Python and Node.js found"

# Install Python dependencies
echo "📦 Installing Python dependencies..."
pip install Django djangorestframework django-cors-headers pillow qiskit matplotlib

# Setup Django
echo "🔧 Setting up Django..."
python manage.py migrate
python manage.py create_sample_data

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo ""
echo "🎉 Setup complete!"
echo ""
echo "To start the application:"
echo "1. Backend: python manage.py runserver"
echo "2. Frontend: cd frontend && npm start"
echo ""
echo "Or use: ./start-app.bat (Windows)"
