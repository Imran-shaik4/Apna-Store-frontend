import React from 'react';
import {
    Box,
    Typography,
    Paper,
    Button,
    TextField,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector, useDispatch } from 'react-redux';
import { updateOrder } from '../features/storeSlice'; // Import your thunk here
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Load from './Load';
import Error from './Error';

const OwnerOrderDetails = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { selectedOrder,status,error } = useSelector((state) => state.store);

    const [productPrices, setProductPrices] = React.useState(
        selectedOrder.products.reduce((acc, product) => {
            acc[product._id] = product.price.toString(); // Ensure price is a string
            return acc;
        }, {})
    );


    const [totalAmount, setTotalAmount] = React.useState(selectedOrder.totalAmount);

    const handlePriceChange = (productId, value) => {
        const updatedPrices = {
            ...productPrices,
            [productId]: value,
        };
        setProductPrices(updatedPrices);

        // Update the total amount
        const newTotalAmount = selectedOrder.products.reduce((total, product) => {
            return total + parseFloat(updatedPrices[product._id] || product.price);
        }, 0);
        setTotalAmount(newTotalAmount);
    };

    const handleUpdateOrder = () => {
        const data = {
            products: selectedOrder.products.map(product => ({
                ...product,
                price: parseFloat(productPrices[product._id])
            })),
            totalAmount
        };

        dispatch(updateOrder({
            orderId: selectedOrder._id,
            storeId: selectedOrder.store,
            data
        }));
        history.push('/mystores');
    };


    if (status === 'loading') {
        return (
            <Load />
        );
    }

    if (status === 'failed') {
        function retry() {
            history.push('/mystores');
        }
        return (
            <Error message={error} onRetry={retry} />
        );
    }

    return (
        <Box sx={{ p: 4, mt: 10 }}>
            {/* User and Order Information */}
            <Paper elevation={4} sx={{ p: 4, mb: 4, backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e0e0e0' }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
                    Order Details
                </Typography>
                <Typography variant="subtitle1" sx={{ color: '#666' }}>
                    <strong>User:</strong> {selectedOrder.user.name}
                </Typography>
                <Typography variant="subtitle1" sx={{ color: '#666' }}>
                    <strong>Email:</strong> {selectedOrder.user.email}
                </Typography>
                <Typography variant="subtitle1" sx={{ color: '#666' }}>
                    <strong>Phone:</strong> {selectedOrder.user.phone}
                </Typography>
                <Typography variant="subtitle1" sx={{ color: '#666' }}>
                    <strong>Order Time:</strong> {new Date(selectedOrder.orderDate).toLocaleString()}
                </Typography>
                <Typography variant="subtitle1" sx={{ color: '#666' }}>
                    <strong>Status:</strong> {selectedOrder.status}
                </Typography>
                <Typography variant="subtitle1" sx={{ color: '#666' }}>
                    <strong>Total Amount:</strong> ${totalAmount.toFixed(2)}
                </Typography>
            </Paper>

            {/* Products List Container */}
            <Box
                sx={{
                    height: '400px',
                    overflowY: 'auto',
                    p: 2,
                    borderRadius: '12px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #e0e0e0',
                    '&::-webkit-scrollbar': {
                        width: '8px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#1976d2',
                        borderRadius: '8px',
                    },
                }}
            >
                {selectedOrder.products.map((product, index) => (
                    <Paper
                        key={product._id}
                        elevation={1}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            p: 2,
                            mb: 1,
                            borderRadius: '8px',
                            backgroundColor: '#f9f9f9',
                            border: '1px solid #e0e0e0',
                        }}
                    >
                        <Typography sx={{ mr: 2 }}>{index + 1}</Typography>
                        <Typography sx={{ flexGrow: 1, color: '#333' }}>{product.name}</Typography>
                        <Typography sx={{ width: '60px', mr: 2 }}>{product.quantity}</Typography>
                        <TextField
                            sx={{ width: '100px' }}
                            size="small"
                            type="number"
                            value={productPrices[product._id]}
                            onChange={(e) => handlePriceChange(product._id, e.target.value)}
                            label="Price"
                        />
                    </Paper>
                ))}
            </Box>

            {/* Update Order Button */}
            <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Button
                    variant="contained"
                    size="medium"
                    startIcon={<ShoppingCartIcon />}
                    sx={{
                        background: '#FE6B8B',
                        color: '#ffffff',
                        '&:hover': {
                            background: '#FF8E53',
                            color: '#ffffff',
                        },
                    }}
                    onClick={handleUpdateOrder}
                >
                    Update Order
                </Button>
            </Box>
        </Box>
    );
};

export default OwnerOrderDetails;
