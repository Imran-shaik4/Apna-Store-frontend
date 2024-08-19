import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { useHistory } from 'react-router-dom';

const NoMatchingStores = () => {
    const history = useHistory();

    const handleSearchAgain = () => {
        // Redirect to the search page or allow the user to search again
        history.push('/');
    };

    return (
        <Paper elevation={4} sx={{ p: 4, mt: 14, borderRadius: 4 }}>
            <Box sx={{ textAlign: 'center', mt: 2 }}>
                <SearchOffIcon sx={{ fontSize: 64, color: '#FE6B8B', mb: 2 }} />
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', mb: 2 }}>
                    No Stores Matching Your Query
                </Typography>
                <Typography variant="body1" sx={{ color: '#666', mb: 4 }}>
                    There are no stores that match your search criteria. Please try searching by store name or city.
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    sx={{
                        px: 4, py: 1.5,
                        backgroundColor: '#FE6B8B',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        '&:hover': { backgroundColor: '#FF8E53' }
                    }}
                    onClick={handleSearchAgain}
                >
                    Search Again
                </Button>
            </Box>
        </Paper>
    );
};

export default NoMatchingStores;
