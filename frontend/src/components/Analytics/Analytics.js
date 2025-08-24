import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

// Sample analytics data
const weeklyJobsData = [
  { day: 'Mon', jobs: 12, completed: 10 },
  { day: 'Tue', jobs: 15, completed: 13 },
  { day: 'Wed', jobs: 8, completed: 8 },
  { day: 'Thu', jobs: 20, completed: 18 },
  { day: 'Fri', jobs: 25, completed: 22 },
  { day: 'Sat', jobs: 10, completed: 9 },
  { day: 'Sun', jobs: 5, completed: 5 },
];

const backendUsageData = [
  { name: 'ibmq_qasm_simulator', usage: 45 },
  { name: 'ibmq_lima', usage: 25 },
  { name: 'ibmq_belem', usage: 20 },
  { name: 'aer_simulator', usage: 10 },
];

const COLORS = ['#2196f3', '#4caf50', '#ff9800', '#f44336'];

function Analytics() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Analytics
      </Typography>

      <Grid container spacing={3}>
        {/* Job Summary Cards */}
        <Grid item xs={12} sm={3}>
          <Card sx={{ backgroundColor: '#2d2d2d', textAlign: 'center' }}>
            <CardContent>
              <Typography variant="h4" sx={{ color: '#2196f3', fontWeight: 700 }}>
                95
              </Typography>
              <Typography variant="body1">Total Jobs</Typography>
              <Typography variant="body2" sx={{ color: '#4caf50' }}>
                +12% this week
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card sx={{ backgroundColor: '#2d2d2d', textAlign: 'center' }}>
            <CardContent>
              <Typography variant="h4" sx={{ color: '#4caf50', fontWeight: 700 }}>
                87
              </Typography>
              <Typography variant="body1">Completed</Typography>
              <Typography variant="body2" sx={{ color: '#4caf50' }}>
                91.6% success rate
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card sx={{ backgroundColor: '#2d2d2d', textAlign: 'center' }}>
            <CardContent>
              <Typography variant="h4" sx={{ color: '#ff9800', fontWeight: 700 }}>
                245ms
              </Typography>
              <Typography variant="body1">Avg Wait Time</Typography>
              <Typography variant="body2" sx={{ color: '#f44336' }}>
                +5% from last week
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card sx={{ backgroundColor: '#2d2d2d', textAlign: 'center' }}>
            <CardContent>
              <Typography variant="h4" sx={{ color: '#9c27b0', fontWeight: 700 }}>
                1.2s
              </Typography>
              <Typography variant="body1">Avg Exec Time</Typography>
              <Typography variant="body2" sx={{ color: '#4caf50' }}>
                -8% improvement
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Weekly Jobs Chart */}
        <Grid item xs={12} md={8}>
          <Card sx={{ backgroundColor: '#2d2d2d' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
                Weekly Job Activity
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyJobsData}>
                    <XAxis
                      dataKey="day"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#b0b0b0', fontSize: 12 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#b0b0b0', fontSize: 12 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="jobs"
                      stroke="#2196f3"
                      strokeWidth={3}
                      dot={{ fill: '#2196f3', strokeWidth: 2, r: 6 }}
                      name="Submitted"
                    />
                    <Line
                      type="monotone"
                      dataKey="completed"
                      stroke="#4caf50"
                      strokeWidth={3}
                      dot={{ fill: '#4caf50', strokeWidth: 2, r: 6 }}
                      name="Completed"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Backend Usage Pie Chart */}
        <Grid item xs={12} md={4}>
          <Card sx={{ backgroundColor: '#2d2d2d' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
                Backend Usage
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={backendUsageData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="usage"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {backendUsageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* User Leaderboard */}
        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: '#2d2d2d' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
                Top Users This Week
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  { name: 'Alice', jobs: 25, rank: 1 },
                  { name: 'Bob', jobs: 18, rank: 2 },
                  { name: 'Charlie', jobs: 15, rank: 3 },
                  { name: 'Diana', jobs: 12, rank: 4 },
                  { name: 'Eve', jobs: 8, rank: 5 },
                ].map((user) => (
                  <Box
                    key={user.name}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      p: 2,
                      backgroundColor: '#1a1a1a',
                      borderRadius: 1,
                      border: user.rank === 1 ? '2px solid #ffd700' : '1px solid #444',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: user.rank === 1 ? '#ffd700' : user.rank <= 3 ? '#4caf50' : '#b0b0b0',
                          fontWeight: 600,
                          minWidth: 24,
                        }}
                      >
                        #{user.rank}
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {user.name}
                      </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ color: '#2196f3', fontWeight: 600 }}>
                      {user.jobs} jobs
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Performance Metrics */}
        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: '#2d2d2d' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
                Performance Metrics
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Success Rate</Typography>
                    <Typography variant="body2" sx={{ color: '#4caf50' }}>91.6%</Typography>
                  </Box>
                  <Box sx={{ backgroundColor: '#1a1a1a', borderRadius: 1, height: 8 }}>
                    <Box
                      sx={{
                        backgroundColor: '#4caf50',
                        borderRadius: 1,
                        height: 8,
                        width: '91.6%',
                      }}
                    />
                  </Box>
                </Box>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Queue Efficiency</Typography>
                    <Typography variant="body2" sx={{ color: '#2196f3' }}>85.2%</Typography>
                  </Box>
                  <Box sx={{ backgroundColor: '#1a1a1a', borderRadius: 1, height: 8 }}>
                    <Box
                      sx={{
                        backgroundColor: '#2196f3',
                        borderRadius: 1,
                        height: 8,
                        width: '85.2%',
                      }}
                    />
                  </Box>
                </Box>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Resource Utilization</Typography>
                    <Typography variant="body2" sx={{ color: '#ff9800' }}>73.4%</Typography>
                  </Box>
                  <Box sx={{ backgroundColor: '#1a1a1a', borderRadius: 1, height: 8 }}>
                    <Box
                      sx={{
                        backgroundColor: '#ff9800',
                        borderRadius: 1,
                        height: 8,
                        width: '73.4%',
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Analytics;
