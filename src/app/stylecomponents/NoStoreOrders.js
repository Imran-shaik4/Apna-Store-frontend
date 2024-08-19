import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';

const NoStoreOrders = () => {
    return (
        <Paper elevation={4} sx={{ p: 4, mt: 4, borderRadius: 4 }}>
            <Box sx={{ textAlign: 'center', mt: 2 }}>
                <AssignmentIcon sx={{ fontSize: 64, color: '#FE6B8B', mb: 2 }} />
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', mb: 2 }}>
                    No Orders for this Store
                </Typography>
                <Typography variant="body1" sx={{ color: '#666' }}>
                    This store hasn't received any orders yet. Stay tuned for new orders!
                </Typography>
            </Box>
        </Paper>
    );
};

export default NoStoreOrders;
