import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Chip,
} from '@mui/material';

function JobDetails({ job }) {
  const defaultJob = {
    name: 'Quantum Fourier Transform',
    status: 'Running',
    progress: 58,
    executionTime: '235 ms',
  };

  const currentJob = job || defaultJob;

  return (
    <Card sx={{ backgroundColor: '#2d2d2d', height: '100%' }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>
          Job Details
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
            {currentJob.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Chip
              label={currentJob.status}
              size="small"
              sx={{
                backgroundColor: '#4caf50',
                color: 'white',
                fontSize: '12px',
              }}
            />
          </Box>
        </Box>

        {/* Circuit Visualization Placeholder */}
        <Box
          sx={{
            backgroundColor: '#1a1a1a',
            border: '1px solid #444',
            borderRadius: 1,
            p: 2,
            mb: 3,
            height: 120,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Quantum Circuit Diagram */}
          <Box sx={{ textAlign: 'center' }}>
            <svg width="200" height="80" viewBox="0 0 200 80">
              {/* Qubit lines */}
              <line x1="20" y1="20" x2="180" y2="20" stroke="white" strokeWidth="2" />
              <line x1="20" y1="40" x2="180" y2="40" stroke="white" strokeWidth="2" />
              <line x1="20" y1="60" x2="180" y2="60" stroke="white" strokeWidth="2" />
              
              {/* Gates */}
              <rect x="40" y="10" width="20" height="20" fill="none" stroke="white" strokeWidth="2" />
              <text x="50" y="25" fill="white" fontSize="12" textAnchor="middle">H</text>
              
              <rect x="80" y="10" width="20" height="20" fill="none" stroke="white" strokeWidth="2" />
              <text x="90" y="25" fill="white" fontSize="12" textAnchor="middle">Z</text>
              
              <rect x="120" y="30" width="20" height="20" fill="none" stroke="white" strokeWidth="2" />
              <text x="130" y="45" fill="white" fontSize="12" textAnchor="middle">H</text>
              
              {/* Control lines */}
              <circle cx="90" cy="20" r="3" fill="white" />
              <line x1="90" y1="20" x2="90" y2="40" stroke="white" strokeWidth="2" />
              <circle cx="90" cy="40" r="6" fill="none" stroke="white" strokeWidth="2" />
              <line x1="87" y1="40" x2="93" y2="40" stroke="white" strokeWidth="2" />
              <line x1="90" y1="37" x2="90" y2="43" stroke="white" strokeWidth="2" />
            </svg>
          </Box>
        </Box>

        {/* Progress and timing */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              border: `4px solid #2196f3`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {currentJob.progress}%
            </Typography>
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: `conic-gradient(#2196f3 ${currentJob.progress * 3.6}deg, transparent 0deg)`,
                mask: 'radial-gradient(circle at center, transparent 70%, black 70%)',
              }}
            />
          </Box>
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {currentJob.executionTime}
            </Typography>
            <Typography variant="body2" sx={{ color: '#b0b0b0' }}>
              Exec
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default JobDetails;
