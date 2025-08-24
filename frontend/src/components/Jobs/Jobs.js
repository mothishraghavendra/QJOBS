import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Add as AddIcon,
  PlayArrow as RunIcon,
  Visibility as ViewIcon,
  Share as ShareIcon,
} from '@mui/icons-material';
import { Editor } from '@monaco-editor/react';

// Sample job data
const sampleJobs = [
  {
    id: '1',
    name: 'Bell State Preparation',
    status: 'completed',
    backend: 'ibmq_qasm_simulator',
    created: '2025-08-23 10:30',
    executionTime: '145ms',
  },
  {
    id: '2',
    name: 'Quantum Fourier Transform',
    status: 'running',
    backend: 'ibmq_lima',
    created: '2025-08-23 11:15',
    executionTime: '235ms',
  },
  {
    id: '3',
    name: 'Grover Search',
    status: 'queued',
    backend: 'ibmq_belem',
    created: '2025-08-23 11:45',
    executionTime: '-',
  },
];

const backends = [
  'ibmq_qasm_simulator',
  'ibmq_lima',
  'ibmq_belem',
  'aer_simulator',
];

function Jobs() {
  const [jobs, setJobs] = useState(sampleJobs);
  const [openDialog, setOpenDialog] = useState(false);
  const [newJob, setNewJob] = useState({
    name: '',
    description: '',
    backend: 'ibmq_qasm_simulator',
    code: `from qiskit import QuantumCircuit, QuantumRegister, ClassicalRegister

# Create a quantum circuit
qc = QuantumCircuit(2, 2)

# Add your quantum gates here
qc.h(0)      # Hadamard gate on qubit 0
qc.cx(0, 1)  # CNOT gate

# Measure all qubits
qc.measure_all()

print(qc.draw())`,
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return '#4caf50';
      case 'running':
        return '#2196f3';
      case 'queued':
        return '#ff9800';
      case 'failed':
        return '#f44336';
      default:
        return '#666';
    }
  };

  const handleSubmitJob = () => {
    const job = {
      id: String(jobs.length + 1),
      name: newJob.name,
      status: 'queued',
      backend: newJob.backend,
      created: new Date().toLocaleString(),
      executionTime: '-',
    };
    setJobs([...jobs, job]);
    setOpenDialog(false);
    setNewJob({
      name: '',
      description: '',
      backend: 'ibmq_qasm_simulator',
      code: newJob.code,
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Jobs
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
          sx={{
            backgroundColor: '#2196f3',
            '&:hover': { backgroundColor: '#1976d2' },
          }}
        >
          Submit New Job
        </Button>
      </Box>

      {/* Job Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={3}>
          <Card sx={{ backgroundColor: '#2d2d2d', textAlign: 'center' }}>
            <CardContent>
              <Typography variant="h4" sx={{ color: '#2196f3', fontWeight: 700 }}>
                {jobs.filter(j => j.status === 'running').length}
              </Typography>
              <Typography variant="body1">Running</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card sx={{ backgroundColor: '#2d2d2d', textAlign: 'center' }}>
            <CardContent>
              <Typography variant="h4" sx={{ color: '#4caf50', fontWeight: 700 }}>
                {jobs.filter(j => j.status === 'completed').length}
              </Typography>
              <Typography variant="body1">Completed</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card sx={{ backgroundColor: '#2d2d2d', textAlign: 'center' }}>
            <CardContent>
              <Typography variant="h4" sx={{ color: '#ff9800', fontWeight: 700 }}>
                {jobs.filter(j => j.status === 'queued').length}
              </Typography>
              <Typography variant="body1">Queued</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card sx={{ backgroundColor: '#2d2d2d', textAlign: 'center' }}>
            <CardContent>
              <Typography variant="h4" sx={{ color: '#f44336', fontWeight: 700 }}>
                {jobs.filter(j => j.status === 'failed').length}
              </Typography>
              <Typography variant="body1">Failed</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Jobs Table */}
      <Card sx={{ backgroundColor: '#2d2d2d' }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
            Recent Jobs
          </Typography>
          <TableContainer component={Paper} sx={{ backgroundColor: '#1a1a1a' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: '#b0b0b0', fontWeight: 600 }}>Name</TableCell>
                  <TableCell sx={{ color: '#b0b0b0', fontWeight: 600 }}>Status</TableCell>
                  <TableCell sx={{ color: '#b0b0b0', fontWeight: 600 }}>Backend</TableCell>
                  <TableCell sx={{ color: '#b0b0b0', fontWeight: 600 }}>Created</TableCell>
                  <TableCell sx={{ color: '#b0b0b0', fontWeight: 600 }}>Execution Time</TableCell>
                  <TableCell sx={{ color: '#b0b0b0', fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {jobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell sx={{ color: 'white' }}>{job.name}</TableCell>
                    <TableCell>
                      <Chip
                        label={job.status}
                        size="small"
                        sx={{
                          backgroundColor: getStatusColor(job.status),
                          color: 'white',
                          textTransform: 'capitalize',
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ color: '#b0b0b0' }}>{job.backend}</TableCell>
                    <TableCell sx={{ color: '#b0b0b0' }}>{job.created}</TableCell>
                    <TableCell sx={{ color: '#b0b0b0' }}>{job.executionTime}</TableCell>
                    <TableCell>
                      <IconButton size="small" sx={{ color: '#2196f3' }}>
                        <ViewIcon />
                      </IconButton>
                      <IconButton size="small" sx={{ color: '#4caf50' }}>
                        <RunIcon />
                      </IconButton>
                      <IconButton size="small" sx={{ color: '#ff9800' }}>
                        <ShareIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Submit Job Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { backgroundColor: '#2d2d2d', color: 'white' },
        }}
      >
        <DialogTitle>Submit New Quantum Job</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Job Name"
                value={newJob.name}
                onChange={(e) => setNewJob({ ...newJob, name: e.target.value })}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#1a1a1a',
                    '& fieldset': { borderColor: '#444' },
                    '&:hover fieldset': { borderColor: '#666' },
                    '&.Mui-focused fieldset': { borderColor: '#2196f3' },
                  },
                  '& .MuiInputBase-input': { color: 'white' },
                  '& .MuiInputLabel-root': { color: '#b0b0b0' },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel sx={{ color: '#b0b0b0' }}>Backend</InputLabel>
                <Select
                  value={newJob.backend}
                  onChange={(e) => setNewJob({ ...newJob, backend: e.target.value })}
                  sx={{
                    backgroundColor: '#1a1a1a',
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#444' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#666' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#2196f3' },
                    '& .MuiSelect-select': { color: 'white' },
                  }}
                >
                  {backends.map((backend) => (
                    <MenuItem key={backend} value={backend}>
                      {backend}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={2}
                value={newJob.description}
                onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#1a1a1a',
                    '& fieldset': { borderColor: '#444' },
                    '&:hover fieldset': { borderColor: '#666' },
                    '&.Mui-focused fieldset': { borderColor: '#2196f3' },
                  },
                  '& .MuiInputBase-input': { color: 'white' },
                  '& .MuiInputLabel-root': { color: '#b0b0b0' },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Qiskit Code
              </Typography>
              <Box sx={{ height: 300, border: '1px solid #444', borderRadius: 1 }}>
                <Editor
                  height="100%"
                  language="python"
                  theme="vs-dark"
                  value={newJob.code}
                  onChange={(value) => setNewJob({ ...newJob, code: value })}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    scrollBeyondLastLine: false,
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} sx={{ color: '#b0b0b0' }}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmitJob}
            variant="contained"
            sx={{
              backgroundColor: '#2196f3',
              '&:hover': { backgroundColor: '#1976d2' },
            }}
          >
            Submit Job
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Jobs;
