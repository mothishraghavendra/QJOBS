# Quantum Job Dashboard (QJOBS)

[![CI](https://github.com/YOUR_USERNAME/quantum-job-dashboard/workflows/Quantum%20Job%20Dashboard%20CI/badge.svg)](https://github.com/YOUR_USERNAME/quantum-job-dashboard/actions)
[![Django](https://img.shields.io/badge/Django-5.2-green.svg)](https://www.djangoproject.com/)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![Qiskit](https://img.shields.io/badge/Qiskit-Latest-purple.svg)](https://qiskit.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A comprehensive web application for managing and monitoring quantum computing jobs with Django REST API backend and React frontend.

![Quantum Job Dashboard](https://via.placeholder.com/800x400/1a1a1a/2196f3?text=Quantum+Job+Dashboard)

## 🌟 Features

### 🎯 Core Features
- **Dashboard Overview**: Real-time job statistics, activity charts, and system metrics
- **Job Management**: Submit, monitor, and manage quantum computing jobs
- **Circuit Visualization**: Auto-generated quantum circuit diagrams
- **Results Visualization**: Interactive histograms and measurement results
- **Collaboration**: Share jobs, comments, and real-time collaboration
- **Analytics**: Performance metrics, leaderboards, and usage statistics

### 🚀 Key Capabilities
- Support for multiple quantum backends (IBM Quantum, simulators)
- Monaco code editor for Qiskit script editing
- Real-time job status tracking (Queued → Running → Completed)
- Educational examples and tutorials
- User profiles and achievement system
- RESTful API for external integrations

## Project Structure

```
QJOBS/
├── backend/ (Django)
│   ├── manage.py
│   ├── QJOBS/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── ...
│   ├── jobs/          # Job management app
│   ├── users/         # User profiles and analytics
│   ├── collaboration/ # Sharing and comments
│   ├── education/     # Example circuits and tutorials
│   └── analytics/     # Dashboard metrics and reporting
└── frontend/ (React)
    ├── src/
    │   ├── components/
    │   │   ├── Dashboard/
    │   │   ├── Jobs/
    │   │   ├── Analytics/
    │   │   └── Settings/
    │   └── services/
    └── public/
```

## Setup Instructions

### Backend (Django)

1. **Navigate to the backend directory:**
   ```bash
   cd QJOBS
   ```

2. **Install Python dependencies:**
   ```bash
   pip install Django djangorestframework django-cors-headers pillow qiskit matplotlib
   ```

3. **Run migrations:**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

4. **Create sample data:**
   ```bash
   python manage.py create_sample_data
   ```

5. **Start the Django development server:**
   ```bash
   python manage.py runserver
   ```

   The API will be available at `http://localhost:8000`

### Frontend (React)

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

3. **Start the React development server:**
   ```bash
   npm start
   ```

   The application will be available at `http://localhost:3000`

## API Endpoints

### Jobs
- `GET /api/jobs/` - List all jobs
- `POST /api/jobs/` - Create new job
- `GET /api/jobs/{id}/` - Get job details
- `PUT /api/jobs/{id}/` - Update job
- `DELETE /api/jobs/{id}/` - Delete job
- `GET /api/jobs/dashboard_stats/` - Dashboard statistics
- `POST /api/jobs/{id}/share/` - Share job

### Backends
- `GET /api/backends/` - List available quantum backends

### Results
- `GET /api/results/` - List job results
- `GET /api/results/{id}/` - Get specific result

## UI Components

### Dashboard
- **Job Overview Cards**: Running (5), Completed (12), Queued (8)
- **Activity Chart**: Real-time job submission vs completion
- **Job Details**: Current job progress with circuit visualization
- **Simulation Results**: Histogram of measurement outcomes
- **Collaboration Mode**: Chat and sharing interface

### Jobs Page
- Job submission with Monaco code editor
- Job listing with status tracking
- Circuit visualization and results
- Sharing and collaboration features

### Analytics
- Performance metrics and KPIs
- User leaderboards
- Backend usage statistics
- Weekly/monthly trends

### Settings
- User profile management
- Notification preferences
- Application settings

## Technology Stack

### Backend
- **Django 5.2**: Web framework
- **Django REST Framework**: API development
- **SQLite**: Database (easily switchable to PostgreSQL)
- **Qiskit**: Quantum circuit processing
- **Matplotlib**: Circuit visualization

### Frontend
- **React 18**: UI framework
- **Material-UI (MUI)**: Component library
- **Monaco Editor**: Code editing
- **Recharts**: Data visualization
- **Axios**: HTTP client
- **React Router**: Navigation

## Sample Data

The application includes sample data:
- **Users**: admin/admin123, alice/alice123
- **Backends**: IBM simulators and real devices
- **Jobs**: Bell state, QFT, Grover's algorithm examples
- **Example Circuits**: Educational quantum circuits

## Future Enhancements

- Real IBM Quantum integration
- WebSocket for real-time updates
- Advanced circuit builder (drag-and-drop)
- More visualization options
- Team collaboration features
- API rate limiting and authentication
- Docker containerization
- Cloud deployment configurations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
