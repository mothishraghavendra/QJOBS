import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
  Avatar,
  Grid,
} from '@mui/material';

function CollaborationMode() {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    // TODO: Implement message sending
    setMessage('');
  };

  return (
    <Grid container spacing={3}>
      {/* Collaboration Mode */}
      <Grid item xs={12} md={6}>
        <Card sx={{ backgroundColor: '#2d2d2d', height: '200px' }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>
              Collaboration Mode
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}>
              <TextField
                fullWidth
                placeholder="Type a message"
                variant="outlined"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#1a1a1a',
                    '& fieldset': {
                      borderColor: '#444',
                    },
                    '&:hover fieldset': {
                      borderColor: '#666',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#2196f3',
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: 'white',
                  },
                  '& .MuiInputLabel-root': {
                    color: '#b0b0b0',
                  },
                }}
              />
              <Button
                variant="contained"
                onClick={handleSendMessage}
                sx={{
                  backgroundColor: '#2196f3',
                  '&:hover': {
                    backgroundColor: '#1976d2',
                  },
                  minWidth: 80,
                }}
              >
                Send
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Cothanovvanmode (Chat) */}
      <Grid item xs={12} md={6}>
        <Card sx={{ backgroundColor: '#2d2d2d', height: '200px' }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>
              Cothanovvanmode
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  backgroundColor: '#4caf50',
                  fontSize: '14px',
                }}
              >
                A
              </Avatar>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Alice
                </Typography>
                <Typography variant="body2" sx={{ color: '#b0b0b0', fontSize: 12 }}>
                  The circuit lo god!
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default CollaborationMode;
