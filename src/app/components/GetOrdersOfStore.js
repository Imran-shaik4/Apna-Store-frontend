import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrdersOfStore } from '../features/storeSlice';
import { CircularProgress, TextField, Button, Typography, Box, Container } from '@mui/material';

const GetOrdersComponent = () => {
    const [storeId, setStoreId] = useState('');
    const dispatch = useDispatch();
    const { orders, status, error } = useSelector((state) => state.store);

    const handleFetchOrders = () => {
        if (storeId.trim()) {
            dispatch(getAllOrdersOfStore(storeId));
        }
    };

    return (
        <Container>
            <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
                <TextField
                    label="Store ID"
                    variant="outlined"
                    value={storeId}
                    onChange={(e) => setStoreId(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleFetchOrders}
                    disabled={status === 'loading'}
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    {status === 'loading' ? <CircularProgress size={24} /> : 'Fetch Orders'}
                </Button>
                {status === 'failed' && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
                {status === 'succeeded' && (
                    <Box mt={4} width="100%">
                        <Typography variant="h6">Orders:</Typography>
                        {orders.length > 0 ? (
                            <ul>
                                {orders.map((order) => (
                                    <li key={order._id}>
                                        <Typography>{`Order ID: ${order._id}, User: ${order.user.name}, Email: ${order.user.email}`}</Typography>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <Typography>No orders found for this store.</Typography>
                        )}
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default GetOrdersComponent;
