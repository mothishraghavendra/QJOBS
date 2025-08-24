import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
} from '@mui/material';
import JobOverviewCards from './JobOverviewCards';
import ActivityChart from './ActivityChart';
import JobDetails from './JobDetails';
import SimulationResults from './SimulationResults';
import CollaborationMode from './CollaborationMode';

// Sample data matching the dashboard image
const sampleData = {
  jobStats: {
    running: 5,
    completed: 12,
    queued: 8,
    avgWaitingTime: 235, // ms
  },
  activityData: [
    { time: '12:00', submitted: 2, completed: 1 },
    { time: '13:00', submitted: 4, completed: 2 },
    { time: '14:00', submitted: 3, completed: 4 },
    { time: '15:00', submitted: 5, completed: 3 },
  ],
  simulationResults: [
    { state: '00', probability: 0.4 },
    { state: '01', probability: 0.35 },
    { state: '11', probability: 0.3 },
  ],
  currentJob: {
    name: 'Quantum Fourier Transform',
    status: 'Running',
    progress: 58,
    executionTime: '235 ms',
    circuitImage: '/circuit-placeholder.png',
  },
};

function Dashboard() {
  const [data] = useState(sampleData);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Job Overview Cards */}
        <Grid item xs={12} md={8}>
          <JobOverviewCards stats={data.jobStats} />
        </Grid>

        {/* Activity Chart */}
        <Grid item xs={12} md={4}>
          <ActivityChart data={data.activityData} />
        </Grid>

        {/* Job Details */}
        <Grid item xs={12} md={6}>
          <JobDetails job={data.currentJob} />
        </Grid>

        {/* Simulation Results */}
        <Grid item xs={12} md={6}>
          <SimulationResults data={data.simulationResults} />
        </Grid>

        {/* Collaboration Mode */}
        <Grid item xs={12}>
          <CollaborationMode />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
