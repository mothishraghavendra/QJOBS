import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';

function JobOverviewCards({ stats = {} }) {
  const cardData = [
    {
      title: 'Running',
      value: stats.running || 5,
      color: '#4caf50',
      borderColor: '#4caf50',
    },
    {
      title: 'Completed',
      value: stats.completed || 12,
      color: '#2196f3',
      borderColor: '#2196f3',
    },
    {
      title: 'Queued',
      value: stats.queued || 8,
      color: '#ff9800',
      borderColor: '#ff9800',
    },
  ];

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
        Job Overview
      </Typography>
      <Grid container spacing={2}>
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card
              sx={{
                backgroundColor: '#2d2d2d',
                border: `2px solid ${card.borderColor}`,
                borderRadius: 2,
                height: 120,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 2 }}>
                <Typography
                  variant="h3"
                  sx={{
                    color: card.color,
                    fontWeight: 700,
                    mb: 1,
                  }}
                >
                  {card.value}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'white',
                    fontWeight: 500,
                  }}
                >
                  {card.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default JobOverviewCards;
