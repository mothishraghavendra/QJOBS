import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Job API services
export const jobsAPI = {
  // Get all jobs for the current user
  getJobs: () => api.get('/api/jobs/'),
  
  // Get job by ID
  getJob: (id) => api.get(`/api/jobs/${id}/`),
  
  // Create new job
  createJob: (jobData) => api.post('/api/jobs/', jobData),
  
  // Update job
  updateJob: (id, jobData) => api.put(`/api/jobs/${id}/`, jobData),
  
  // Delete job
  deleteJob: (id) => api.delete(`/api/jobs/${id}/`),
  
  // Get dashboard statistics
  getDashboardStats: () => api.get('/api/jobs/dashboard_stats/'),
  
  // Share job
  shareJob: (id) => api.post(`/api/jobs/${id}/share/`),
  
  // Get circuit image
  getCircuitImage: (id) => api.get(`/api/jobs/${id}/circuit_image/`),
};

// Backend API services
export const backendsAPI = {
  // Get all available backends
  getBackends: () => api.get('/api/backends/'),
};

// Results API services
export const resultsAPI = {
  // Get results for a job
  getResults: () => api.get('/api/results/'),
  
  // Get result by ID
  getResult: (id) => api.get(`/api/results/${id}/`),
};

// Analytics API services (placeholder for future implementation)
export const analyticsAPI = {
  // Get dashboard metrics
  getDashboardMetrics: () => {
    // TODO: Implement when backend is ready
    return Promise.resolve({
      data: {
        total_jobs: 95,
        completed_jobs: 87,
        avg_waiting_time: 245,
        avg_execution_time: 1200,
      }
    });
  },
  
  // Get weekly activity
  getWeeklyActivity: () => {
    // TODO: Implement when backend is ready
    return Promise.resolve({
      data: [
        { day: 'Mon', jobs: 12, completed: 10 },
        { day: 'Tue', jobs: 15, completed: 13 },
        { day: 'Wed', jobs: 8, completed: 8 },
        { day: 'Thu', jobs: 20, completed: 18 },
        { day: 'Fri', jobs: 25, completed: 22 },
        { day: 'Sat', jobs: 10, completed: 9 },
        { day: 'Sun', jobs: 5, completed: 5 },
      ]
    });
  },
};

// Error handling interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default api;
