import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { styled } from '@mui/system';

const LoadContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
}));

const LoadText = styled(Typography)(({ theme }) => ({
    marginTop: theme.spacing(2),
    fontSize: '1.5rem',
    fontWeight: 'bold',
}));

const Load = () => (
    <LoadContainer>
        <CircularProgress size={80} thickness={4.5} color="primary" />
        <LoadText>Loading...</LoadText>
    </LoadContainer>
);

export default Load;
