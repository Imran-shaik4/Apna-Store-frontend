import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import products from '../../assets/products'; // Import the products array
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { getStoreById, } from '../features/storeSlice';
import { placeOrder } from '../features/userSlice';
import Load from './Load';
import Error from './Error';
import { changeToIdle } from '../features/userSlice';
import { storeChangeToIdle } from '../features/storeSlice';
const OrderComponent = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedProducts, setSelectedProducts] = useState({});
    const [open, setOpen] = useState(false);


    const dispatch = useDispatch();
    const history = useHistory();
    const { selectedStore, selectedStoreId } = useSelector((state) => state.store);
    const storeStatus = useSelector((state) => state.store.status);
    const storeError = useSelector((state) => state.store.error);
    const userStatus = useSelector((state) => state.user.status);
    const userError = useSelector((state) => state.user.error);
    const [storeData, setStoreData] = useState({ name: '', street: '', city: '', state: '', email: '', phone: '', owner: "" });

    useEffect(() => {
        if (selectedStoreId) {
            dispatch(getStoreById(selectedStoreId));
        }
    }, [dispatch, selectedStoreId]);

    useEffect(() => {
        if (selectedStore) {


            setStoreData({
                name: selectedStore.name,
                street: selectedStore.address.street,
                city: selectedStore.address.city,
                state: selectedStore.address.state,
                phone: selectedStore.owner.phone,
                email: selectedStore.owner.email,
                owner: selectedStore.owner.name
            });
        }
    }, [selectedStore]);



    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleProductChange = (productId, quantity) => {
        setSelectedProducts((prev) => ({
            ...prev,
            [String(productId)]: String(quantity), // Ensure both productId and quantity are strings
        }));
    };

    const handleCheckboxChange = (productId) => {
        setSelectedProducts((prev) => {
            const newSelection = { ...prev };
            if (newSelection[String(productId)]) {
                delete newSelection[String(productId)];
            } else {
                newSelection[String(productId)] = String(products.find(product => product.id === productId).quantities[0]);
            }
            return newSelection;
        });
    };

    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(product => product.category === selectedCategory);

    const handlePlaceOrder = () => {

        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleOk = () => {
        const orderBody = {
            storeId: selectedStoreId, // You can replace this with the actual storeId as needed
            products: Object.entries(selectedProducts).map(([productId, quantity]) => {
                const product = products.find(p => String(p.id) === productId);
                return {
                    name: product.name,
                    quantity: quantity.toString(), // Ensure quantity is a string
                };
            }),
        };
        dispatch(placeOrder(orderBody));
        setOpen(false);
        history.push('/myorders');
    }


    if (storeStatus === 'loading') {
        return (
            <Load />
        );
    }

    if (storeStatus === 'failed') {
        function retry() {
            dispatch(storeChangeToIdle());
            history.push('/');
        }
        return (
            <Error message={storeError} onRetry={retry} />
        );
    }
    if (userStatus === 'loading') {
        return (
            <Load />
        );
    }

    if (userStatus === 'failed') {
        function retry() {
            dispatch(changeToIdle());
            history.push('/');
        }
        return (
            <Error message={userError} onRetry={retry} />
        );
    }

    return (
        <Box sx={{ p: 4, mt: 10 }}>
            {/* Store Information */}
            <Paper elevation={4} sx={{ p: 4, mb: 4, backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e0e0e0' }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
                    {storeData.name}
                </Typography>
                <Typography variant="subtitle1" sx={{ color: '#666' }}>
                    <strong>Owner:</strong> {storeData.owner}
                </Typography>
                <Typography variant="subtitle1" sx={{ color: '#666' }}>
                    <strong>Email:</strong> {storeData.email}
                </Typography>
                <Typography variant="subtitle1" sx={{ color: '#666' }}>
                    <strong>Phone:</strong> {storeData.phone}
                </Typography>
                <Typography variant="subtitle1" sx={{ color: '#666' }}>
                    <strong>Street:</strong> {storeData.street}
                </Typography>
                <Typography variant="subtitle1" sx={{ color: '#666' }}>
                    <strong>City:</strong> {storeData.city}
                </Typography>
                <Typography variant="subtitle1" sx={{ color: '#666' }}>
                    <strong>State:</strong> {storeData.state}
                </Typography>
            </Paper>

            {/* Category Selector */}
            <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Category</InputLabel>
                <Select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    label="Category"
                    sx={{
                        '& .MuiSelect-select': {
                            fontWeight: 'bold',
                            color: '#333',
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderRadius: '12px',
                                borderColor: '#e0e0e0',
                            },
                        },
                    }}
                >
                    <MenuItem value="all">All Products</MenuItem>
                    {Array.from(new Set(products.map(product => product.category)))
                        .sort()
                        .map(category => (
                            <MenuItem key={category} value={category}>
                                {category}
                            </MenuItem>
                        ))}
                </Select>
            </FormControl>

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
                <FormGroup>
                    {filteredProducts.map((product) => (
                        <Paper
                            key={product.id}
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
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={Boolean(selectedProducts[String(product.id)])}
                                        onChange={() => handleCheckboxChange(product.id)}
                                    />
                                }
                                label={product.name}
                                sx={{ flexGrow: 1, color: '#333' }}
                            />
                            <FormControl
                                sx={{ minWidth: '120px' }}
                                variant="outlined"
                                size="small"
                                disabled={!selectedProducts[String(product.id)]}
                            >
                                <Select
                                    value={selectedProducts[String(product.id)] || ''}
                                    onChange={(e) => handleProductChange(product.id, e.target.value)}
                                    displayEmpty
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderRadius: '8px',
                                                borderColor: '#e0e0e0',
                                            },
                                        },
                                    }}
                                >
                                    {product.quantities.map((quantity) => (
                                        <MenuItem key={quantity} value={quantity}>
                                            {quantity}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Paper>
                    ))}
                </FormGroup>
            </Box>

            {/* Place Order Button */}
            <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Button
                    variant="contained"
                    size="medium"
                    startIcon={<ShoppingCartIcon />}
                    onClick={handlePlaceOrder}
                    sx={{
                        background: '#FE6B8B',
                        color: '#ffffff',
                        '&:hover': {
                            background: '#FF8E53',
                            color: '#ffffff',
                        },
                    }}
                >
                    Place Order
                </Button>
            </Box>

            {/* Confirmation Dialog */}
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Confirm Order</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to place this order?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        No
                    </Button>
                    <Button onClick={handleOk} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default OrderComponent;
