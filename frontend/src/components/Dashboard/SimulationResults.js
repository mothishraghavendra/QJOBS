import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const sampleResults = [
  { state: '00', probability: 0.4, color: '#2196f3' },
  { state: '01', probability: 0.35, color: '#4caf50' },
  { state: '11', probability: 0.3, color: '#ff9800' },
];

function SimulationResults({ data = sampleResults }) {
  return (
    <Card sx={{ backgroundColor: '#2d2d2d', height: '100%' }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>
          Simulation Results
        </Typography>

        <Box sx={{ height: 250 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis
                dataKey="state"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#b0b0b0', fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#b0b0b0', fontSize: 12 }}
                domain={[0, 0.5]}
              />
              <Bar dataKey="probability" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Bar
                    key={`cell-${index}`}
                    fill={
                      index === 0 ? '#2196f3' :
                      index === 1 ? '#4caf50' : '#ff9800'
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>

        {/* Custom Bar Chart Labels */}
        <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
          {data.map((item, index) => (
            <Box key={index} sx={{ textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: '#b0b0b0', fontSize: 12 }}>
                {item.state}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

export default SimulationResults;
