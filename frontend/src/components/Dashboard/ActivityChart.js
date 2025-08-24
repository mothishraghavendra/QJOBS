import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const sampleActivityData = [
  { time: '12:00', submitted: 2, completed: 1 },
  { time: '13:00', submitted: 4, completed: 2 },
  { time: '14:00', submitted: 3, completed: 4 },
  { time: '15:00', submitted: 5, completed: 3 },
];

function ActivityChart({ data = sampleActivityData }) {
  return (
    <Card sx={{ height: '100%', backgroundColor: '#2d2d2d' }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
          Activity
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, color: '#b0b0b0' }}>
          6
        </Typography>
        <Box sx={{ height: 200 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis
                dataKey="time"
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
                dataKey="submitted"
                stroke="#2196f3"
                strokeWidth={2}
                dot={{ fill: '#2196f3', strokeWidth: 2, r: 4 }}
                name="Submitted"
              />
              <Line
                type="monotone"
                dataKey="completed"
                stroke="#4caf50"
                strokeWidth={2}
                dot={{ fill: '#4caf50', strokeWidth: 2, r: 4 }}
                name="Completed"
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, mt: 2, justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                backgroundColor: '#2196f3',
                borderRadius: '50%',
              }}
            />
            <Typography variant="body2" sx={{ fontSize: 12 }}>
              Submitted
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                backgroundColor: '#4caf50',
                borderRadius: '50%',
              }}
            />
            <Typography variant="body2" sx={{ fontSize: 12 }}>
              Completed
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ActivityChart;
