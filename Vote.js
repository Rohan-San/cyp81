// src/pages/Vote.js
import React, { useState } from 'react';
import { Container, Typography, RadioGroup, FormControlLabel, Radio, Button, Box, Paper, Alert } from '@mui/material';
import { useParams } from 'react-router-dom';

const Vote = () => {
  const { electionId } = useParams();
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [voteCasted, setVoteCasted] = useState(false);

  const handleVoteChange = (e) => {
    setSelectedCandidate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedCandidate) {
      alert("Please select a candidate before submitting!");
      return;
    }
    setVoteCasted(true); // Show success message
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={6} sx={{ padding: 4, mt: 4, borderRadius: 3, textAlign: 'center' }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Cast Your Vote
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Election ID: {electionId}
        </Typography>
        
        {voteCasted ? (
          <Alert severity="success" sx={{ mt: 2 }}>
            ✅ Vote Casted Successfully!
          </Alert>
        ) : (
          <form onSubmit={handleSubmit}>
            <RadioGroup value={selectedCandidate} onChange={handleVoteChange}>
              <FormControlLabel value="Candidate 1" control={<Radio />} label="Rahul Gandhi" />
              <FormControlLabel value="Candidate 2" control={<Radio />} label="Narendra Modi" />
              <FormControlLabel value="Candidate 3" control={<Radio />} label="Donald Trump" />
            </RadioGroup>
            <Button 
              variant="contained" 
              fullWidth 
              sx={{ mt: 2, py: 1.5, bgcolor: '#1976d2' }} 
              type="submit" 
              disabled={voteCasted}
            >
              {voteCasted ? "Vote Submitted" : "Submit Vote"}
            </Button>
          </form>
        )}
      </Paper>
    </Container>
  );
};

export default Vote;
