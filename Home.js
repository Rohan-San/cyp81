// src/pages/Home.js
import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/background.jpg';

const Home = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
      }}
    >
      <Container>
        <Typography variant="h3" gutterBottom>
          Secure & Transparent Blockchain Voting
        </Typography>
        <Typography variant="h6" paragraph>
          Participate in elections with ease. Register or login to get started.
        </Typography>
        <Button variant="contained" color="primary" component={Link} to="/register">
          Get Started
        </Button>
      </Container>
    </Box>
  );
};

export default Home;
