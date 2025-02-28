// src/pages/Login.js
import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import loginBg from '../assets/login-bg.jpg';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login Data:', formData);
    // Add authentication logic here
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${loginBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={6} sx={{ padding: 4, borderRadius: 3, textAlign: 'center', bgcolor: 'rgba(255, 255, 255, 0.9)' }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Welcome Back!
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            Login to access your account
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email Address"
              name="email"
              type="email"
              fullWidth
              margin="normal"
              onChange={handleChange}
              required
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              margin="normal"
              onChange={handleChange}
              required
            />
            <Button variant="contained" fullWidth sx={{ mt: 2, py: 1.5, bgcolor: '#1976d2' }} type="submit">
              Login
            </Button>
          </form>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Don't have an account? <Link to="/register" style={{ color: '#1976d2' }}>Register here</Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
