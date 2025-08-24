import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from '@mui/material';
import { PhotoCamera as CameraIcon } from '@mui/icons-material';

function Settings() {
  const [profile, setProfile] = useState({
    username: 'alice',
    email: 'alice@qjobs.com',
    organization: 'Quantum Research Lab',
    bio: 'Quantum computing enthusiast and researcher',
    experienceLevel: 'intermediate',
    favoriteBackend: 'ibmq_qasm_simulator',
  });

  const [notifications, setNotifications] = useState({
    jobCompletion: true,
    jobFailure: true,
    sharing: false,
    comments: true,
    achievements: true,
  });

  const [preferences, setPreferences] = useState({
    defaultBackend: 'ibmq_qasm_simulator',
    autoSave: true,
    darkMode: true,
    language: 'en',
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // TODO: Implement save functionality
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Settings
      </Typography>

      {saved && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Settings saved successfully!
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Profile Settings */}
        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: '#2d2d2d' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>
                Profile Information
              </Typography>
              
              {/* Avatar */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    mr: 2,
                    backgroundColor: '#2196f3',
                    fontSize: '2rem',
                  }}
                >
                  A
                </Avatar>
                <Button
                  variant="outlined"
                  startIcon={<CameraIcon />}
                  sx={{
                    color: '#2196f3',
                    borderColor: '#2196f3',
                    '&:hover': {
                      borderColor: '#1976d2',
                      backgroundColor: 'rgba(33, 150, 243, 0.1)',
                    },
                  }}
                >
                  Change Photo
                </Button>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Username"
                    value={profile.username}
                    onChange={(e) => setProfile({ ...profile, username: e.target.value })}
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
                  <TextField
                    fullWidth
                    label="Email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
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
                  <TextField
                    fullWidth
                    label="Organization"
                    value={profile.organization}
                    onChange={(e) => setProfile({ ...profile, organization: e.target.value })}
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
                  <TextField
                    fullWidth
                    label="Bio"
                    multiline
                    rows={3}
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
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
                    <InputLabel sx={{ color: '#b0b0b0' }}>Experience Level</InputLabel>
                    <Select
                      value={profile.experienceLevel}
                      onChange={(e) => setProfile({ ...profile, experienceLevel: e.target.value })}
                      sx={{
                        backgroundColor: '#1a1a1a',
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#444' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#666' },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#2196f3' },
                        '& .MuiSelect-select': { color: 'white' },
                      }}
                    >
                      <MenuItem value="beginner">Beginner</MenuItem>
                      <MenuItem value="intermediate">Intermediate</MenuItem>
                      <MenuItem value="advanced">Advanced</MenuItem>
                      <MenuItem value="expert">Expert</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel sx={{ color: '#b0b0b0' }}>Favorite Backend</InputLabel>
                    <Select
                      value={profile.favoriteBackend}
                      onChange={(e) => setProfile({ ...profile, favoriteBackend: e.target.value })}
                      sx={{
                        backgroundColor: '#1a1a1a',
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#444' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#666' },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#2196f3' },
                        '& .MuiSelect-select': { color: 'white' },
                      }}
                    >
                      <MenuItem value="ibmq_qasm_simulator">IBMQ QASM Simulator</MenuItem>
                      <MenuItem value="ibmq_lima">IBMQ Lima</MenuItem>
                      <MenuItem value="ibmq_belem">IBMQ Belem</MenuItem>
                      <MenuItem value="aer_simulator">Aer Simulator</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Notification Settings */}
        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: '#2d2d2d' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>
                Notification Preferences
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.jobCompletion}
                      onChange={(e) => setNotifications({ ...notifications, jobCompletion: e.target.checked })}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: '#2196f3',
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                          backgroundColor: '#2196f3',
                        },
                      }}
                    />
                  }
                  label="Job Completion Notifications"
                  sx={{ color: 'white' }}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.jobFailure}
                      onChange={(e) => setNotifications({ ...notifications, jobFailure: e.target.checked })}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: '#2196f3',
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                          backgroundColor: '#2196f3',
                        },
                      }}
                    />
                  }
                  label="Job Failure Alerts"
                  sx={{ color: 'white' }}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.sharing}
                      onChange={(e) => setNotifications({ ...notifications, sharing: e.target.checked })}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: '#2196f3',
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                          backgroundColor: '#2196f3',
                        },
                      }}
                    />
                  }
                  label="Job Sharing Notifications"
                  sx={{ color: 'white' }}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.comments}
                      onChange={(e) => setNotifications({ ...notifications, comments: e.target.checked })}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: '#2196f3',
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                          backgroundColor: '#2196f3',
                        },
                      }}
                    />
                  }
                  label="Comment Notifications"
                  sx={{ color: 'white' }}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.achievements}
                      onChange={(e) => setNotifications({ ...notifications, achievements: e.target.checked })}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: '#2196f3',
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                          backgroundColor: '#2196f3',
                        },
                      }}
                    />
                  }
                  label="Achievement Notifications"
                  sx={{ color: 'white' }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Application Preferences */}
        <Grid item xs={12}>
          <Card sx={{ backgroundColor: '#2d2d2d' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>
                Application Preferences
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth>
                    <InputLabel sx={{ color: '#b0b0b0' }}>Default Backend</InputLabel>
                    <Select
                      value={preferences.defaultBackend}
                      onChange={(e) => setPreferences({ ...preferences, defaultBackend: e.target.value })}
                      sx={{
                        backgroundColor: '#1a1a1a',
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#444' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#666' },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#2196f3' },
                        '& .MuiSelect-select': { color: 'white' },
                      }}
                    >
                      <MenuItem value="ibmq_qasm_simulator">IBMQ QASM Simulator</MenuItem>
                      <MenuItem value="ibmq_lima">IBMQ Lima</MenuItem>
                      <MenuItem value="ibmq_belem">IBMQ Belem</MenuItem>
                      <MenuItem value="aer_simulator">Aer Simulator</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={preferences.autoSave}
                        onChange={(e) => setPreferences({ ...preferences, autoSave: e.target.checked })}
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked': {
                            color: '#2196f3',
                          },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: '#2196f3',
                          },
                        }}
                      />
                    }
                    label="Auto-save Code"
                    sx={{ color: 'white' }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={preferences.darkMode}
                        onChange={(e) => setPreferences({ ...preferences, darkMode: e.target.checked })}
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked': {
                            color: '#2196f3',
                          },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: '#2196f3',
                          },
                        }}
                      />
                    }
                    label="Dark Mode"
                    sx={{ color: 'white' }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth>
                    <InputLabel sx={{ color: '#b0b0b0' }}>Language</InputLabel>
                    <Select
                      value={preferences.language}
                      onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                      sx={{
                        backgroundColor: '#1a1a1a',
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#444' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#666' },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#2196f3' },
                        '& .MuiSelect-select': { color: 'white' },
                      }}
                    >
                      <MenuItem value="en">English</MenuItem>
                      <MenuItem value="es">Spanish</MenuItem>
                      <MenuItem value="fr">French</MenuItem>
                      <MenuItem value="de">German</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Save Button */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              onClick={handleSave}
              sx={{
                backgroundColor: '#2196f3',
                '&:hover': { backgroundColor: '#1976d2' },
                px: 4,
                py: 1.5,
                fontSize: '1rem',
              }}
            >
              Save Changes
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Settings;
