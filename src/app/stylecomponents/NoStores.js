import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';


const NoStores = () => {
    

   

    return (
        <Paper elevation={4} sx={{ p: 4, mt: 14, borderRadius: 4 }}>
            <Box sx={{ textAlign: 'center', mt: 2 }}>
                <StorefrontIcon sx={{ fontSize: 64, color: '#FE6B8B', mb: 2 }} />
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', mb: 2 }}>
                    You don't have any stores
                </Typography>
                <Typography variant="body1" sx={{ color: '#666', mb: 4 }}>
                    It looks like you haven't created any stores yet. Start by setting up your first store!
                </Typography>
            </Box>
        </Paper>
    );
};

export default NoStores;
