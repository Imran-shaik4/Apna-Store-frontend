import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodaysCompletedOrders, getTodaysUnCompletedOrders } from '../features/storeSlice';
import { CircularProgress, TextField, Button, Typography, Box, Container } from '@mui/material';

const GetTodaysOrdersComponent = () => {
    const [storeId, setStoreId] = useState('');
    const dispatch = useDispatch();
    const { orders, status, error } = useSelector((state) => state.store);

    const handleFetchCompletedOrders = () => {
        if (storeId.trim()) {
            dispatch(getTodaysCompletedOrders(storeId));
        }
    };

    const handleFetchUncompletedOrders = () => {
        if (storeId.trim()) {
            dispatch(getTodaysUnCompletedOrders(storeId));
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
                    onClick={handleFetchCompletedOrders}
                    disabled={status === 'loading'}
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    {status === 'loading' ? <CircularProgress size={24} /> : 'Fetch Today\'s Completed Orders'}
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleFetchUncompletedOrders}
                    disabled={status === 'loading'}
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    {status === 'loading' ? <CircularProgress size={24} /> : 'Fetch Today\'s Uncompleted Orders'}
                </Button>

                {status === 'failed' && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}

                {status === 'succeeded' && (
                    <Box mt={4} width="100%">
                        <Typography variant="h6">Today's Completed Orders:</Typography>
                        {orders && orders.completedOrders?.length > 0 ? (
                            <ul>
                                {orders.completedOrders.map((order) => (
                                    <li key={order._id}>
                                        <Typography>{`Order ID: ${order._id}, User: ${order.user.name}, Email: ${order.user.email}`}</Typography>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <Typography>No completed orders found for today.</Typography>
                        )}

                        <Typography variant="h6" sx={{ mt: 4 }}>Today's Uncompleted Orders:</Typography>
                        {orders && orders.uncompletedOrders?.length > 0 ? (
                            <ul>
                                {orders.uncompletedOrders.map((order) => (
                                    <li key={order._id}>
                                        <Typography>{`Order ID: ${order._id}, User: ${order.user.name}, Email: ${order.user.email}`}</Typography>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <Typography>No uncompleted orders found for today.</Typography>
                        )}
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default GetTodaysOrdersComponent;
