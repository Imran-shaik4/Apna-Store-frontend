import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const ErrorContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: theme.palette.background.default,
    color: theme.palette.error.main,
}));

const ErrorText = styled(Typography)(({ theme }) => ({
    marginTop: theme.spacing(2),
    fontSize: '1.5rem',
    fontWeight: 'bold',
}));

const RetryButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(4),
    padding: theme.spacing(1.5, 3),
    fontSize: '1rem',
    color: theme.palette.getContrastText(theme.palette.error.main),
    backgroundColor: theme.palette.error.main,
    '&:hover': {
        backgroundColor: theme.palette.error.dark,
    },
}));
const Error = ({ onRetry, message }) => (
    <ErrorContainer>
        <ErrorOutlineIcon style={{ fontSize: 80 }} />
        <ErrorText>{message }!</ErrorText>
        <RetryButton onClick={onRetry}>Retry</RetryButton>
    </ErrorContainer>
);

export default Error;
