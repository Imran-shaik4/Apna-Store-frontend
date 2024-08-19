import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useHistory } from 'react-router-dom';

const NoOrders = () => {
    const history = useHistory();

    const handlePlaceOrder = () => {
        // Redirect to the page where users can place an order
        history.push('/');
    };

    return (
        <Paper elevation={4} sx={{ p: 4, mt: 14, borderRadius: 4 }}>
            <Box sx={{ textAlign: 'center', mt: 2 }}>
                <ShoppingCartIcon sx={{ fontSize: 64, color: '#FE6B8B', mb: 2 }} />
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', mb: 2 }}>
                    You don't have any orders
                </Typography>
                <Typography variant="body1" sx={{ color: '#666', mb: 4 }}>
                    It looks like you haven't placed any orders yet. Start shopping to fill your cart!
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
                    onClick={handlePlaceOrder}
                >
                    Place an Order
                </Button>
            </Box>
        </Paper>
    );
};

export default NoOrders;
