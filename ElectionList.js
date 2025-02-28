// src/pages/ElectionList.js
import React from 'react';
import { Container, Typography, Grid, Card, CardMedia, CardContent, CardActions, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import election1 from '../assets/election1.jpg';
import election2 from '../assets/election2.jpg';

const elections = [
  { id: 1, name: 'Presidential Election 2025', image: election1 },
  { id: 2, name: 'City Council Election', image: election2 },
];

const ElectionList = () => {
  const navigate = useNavigate();

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Available Elections
      </Typography>
      <Grid container spacing={3}>
        {elections.map((election) => (
          <Grid item xs={12} md={6} key={election.id}>
            <Card>
              <CardMedia component="img" height="200" image={election.image} alt={election.name} />
              <CardContent>
                <Typography variant="h5">{election.name}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => navigate(`/vote/${election.id}`)}>
                  Vote Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ElectionList;
