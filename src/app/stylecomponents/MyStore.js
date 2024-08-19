import React, { useEffect, useState } from 'react';
import {
    Box, Typography, Grid, Paper, Avatar, Chip, Button, TextField, Tabs, Tab
} from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { useDispatch, useSelector } from 'react-redux';
import {
    getStoreById, getAllOrdersOfStore, getTodaysOrders, getTodaysCompletedOrders, getTodaysUnCompletedOrders, storeChangeToIdle, setSelectedOrder
} from '../features/storeSlice';
import { updateStore, deleteStore, changeToIdle } from '../features/userSlice';
import moment from 'moment';
import Load from './Load';
import Error from './Error';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import NoStoreOrders from './NoStoreOrders';


function MyStore() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { selectedStore, selectedStoreId, orders } = useSelector((state) => state.store);
    const storeStatus = useSelector((state) => state.store.status);
    const storeError = useSelector((state) => state.store.error);
    const userStatus = useSelector((state) => state.user.status);
    const userError = useSelector((state) => state.user.error);


    const [isEditing, setIsEditing] = useState(false);
    const [storeData, setStoreData] = useState({ name: '', street: '', city: '', state: '' });
    const [selectedTab, setSelectedTab] = useState('uncompleted');

    useEffect(() => {
        if (selectedStoreId) {
            dispatch(getStoreById(selectedStoreId));
            dispatch(getTodaysUnCompletedOrders(selectedStoreId));
        }
    }, [dispatch, selectedStoreId]);

    useEffect(() => {
        if (selectedStore) {
            setStoreData({
                name: selectedStore.name,
                street: selectedStore.address.street,
                city: selectedStore.address.city,
                state: selectedStore.address.state,
            });
        }
    }, [selectedStore]);

    const handleChange = (e) => {
        setStoreData({ ...storeData, [e.target.name]: e.target.value });
    };

    const toggleEdit = () => {
        if (isEditing) {
            dispatch(updateStore({ storeId: selectedStore._id, newData: storeData }));
        }
        setIsEditing(!isEditing);
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this store?')) {
            dispatch(deleteStore(selectedStore._id));
        }
    };

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
        switch (newValue) {
            case 'all':
                dispatch(getAllOrdersOfStore(selectedStore._id));
                console.log(orders);
                break;
            case 'today':
                dispatch(getTodaysOrders(selectedStore._id));
                break;
            case 'completed':
                dispatch(getTodaysCompletedOrders(selectedStore._id));
                break;
            case 'uncompleted':
                dispatch(getTodaysUnCompletedOrders(selectedStore._id));
                break;
            default:
                break;
        }
    };

    const getOrderStatusColor = (status) => {
        return status === 'completed' ? '#4caf50' : '#f44336';
    };


    function handleOrderView(order) {
        console.log(order);
        dispatch(setSelectedOrder(order));
        history.push('/storeorder');
    }

    // const formatOrderDate = (date) => {
    //     return moment(date).format('MMMM Do YYYY, h:mm A');
    // };
    // const formatOrderDate = (orderDate) => {
    //     if (!orderDate || !orderDate.$date) return 'Date not available';
    //     return moment(orderDate.$date).format('MMMM Do YYYY, h:mm A');
    // }; 
    const formatOrderDate = (orderDate) => {
        // Check if orderDate is a valid string
        if (typeof orderDate === 'string') {
            return moment(orderDate).format('MMMM Do YYYY, h:mm A');
        }
        return 'Date not available';
    };


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
        <Box sx={{ width: '100%', padding: 2, mt: 6 }} >
            <Paper
                elevation={6}
                sx={{
                    padding: 4,
                    margin: 'auto',
                    maxWidth: 600,
                    borderRadius: 4,
                    background: '#ffffff',
                    color: '#000000',
                    textAlign: 'center',
                    marginTop: 4
                }}
            >
                <Avatar sx={{ bgcolor: '#FE6B8B', margin: 'auto', mb: 2 }}>
                    <StoreIcon sx={{ color: '#ffffff' }} />
                </Avatar>
                <Typography variant="h4" component="h1" gutterBottom>
                    Store Details
                </Typography>

                <Box component="form" sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="filled"
                                fullWidth
                                name="name"
                                label="Store Name"
                                value={storeData.name}
                                onChange={handleChange}
                                InputProps={{
                                    readOnly: !isEditing,
                                    disableUnderline: true,
                                    style: { color: '#000000' },
                                }}
                                InputLabelProps={{
                                    style: { color: '#000000' },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="filled"
                                fullWidth
                                name="street"
                                label="Street"
                                value={storeData.street}
                                onChange={handleChange}
                                InputProps={{
                                    readOnly: !isEditing,
                                    disableUnderline: true,
                                    style: { color: '#000000' },
                                }}
                                InputLabelProps={{
                                    style: { color: '#000000' },
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                variant="filled"
                                fullWidth
                                name="city"
                                label="City"
                                value={storeData.city}
                                onChange={handleChange}
                                InputProps={{
                                    readOnly: !isEditing,
                                    disableUnderline: true,
                                    style: { color: '#000000' },
                                }}
                                InputLabelProps={{
                                    style: { color: '#000000' },
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                variant="filled"
                                fullWidth
                                name="state"
                                label="State"
                                value={storeData.state}
                                onChange={handleChange}
                                InputProps={{
                                    readOnly: !isEditing,
                                    disableUnderline: true,
                                    style: { color: '#000000' },
                                }}
                                InputLabelProps={{
                                    style: { color: '#000000' },
                                }}
                            />
                        </Grid>
                    </Grid>

                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Button
                            variant="contained"
                            onClick={toggleEdit}
                            sx={{
                                background: '#FE6B8B',
                                color: '#ffffff',
                                '&:hover': {
                                    background: '#FF8E53',
                                    color: '#ffffff',
                                },
                            }}
                        >
                            {isEditing ? 'Save' : 'Edit'}
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleDelete}
                            sx={{
                                background: '#FF4C4C',
                                color: '#ffffff',
                                '&:hover': {
                                    background: '#FF1C1C',
                                    color: '#ffffff',
                                },
                            }}
                        >
                            Delete
                        </Button>
                    </Box>
                </Box>
            </Paper>

            <Box sx={{ mt: 4, width: '100%' }}>
                <Tabs
                    value={selectedTab}
                    onChange={handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs"
                    sx={{
                        background: '#ffffff',
                        '& .Mui-selected': {
                            color: '#ff8e53',
                        },
                    }}
                >
                    <Tab label="Uncompleted Orders" value="uncompleted" />
                    <Tab label="All Orders" value="all" />
                    <Tab label="Today's Orders" value="today" />
                    <Tab label="Completed Orders" value="completed" />
                </Tabs>
                {orders.length === 0 && <NoStoreOrders />}
                <Grid container spacing={2} sx={{ overflowX: 'auto', mt: 2, mb: 4 }}>
                    {orders && orders.map((order) => (
                        <Grid item xs={12} sm={6} md={4} key={order._id} >
                            <Paper
                                sx={{
                                    background: '#ffffff',
                                    color: '#000000',
                                    borderRadius: 2,
                                    padding: 2,
                                    textAlign: 'left',
                                    position: 'relative',
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <PersonIcon sx={{ mr: 1 }} />
                                    <Typography variant="h6">{order.user.name}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <EmailIcon sx={{ mr: 1 }} />
                                    <Typography variant="body2">{order.user.email}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <PhoneIcon sx={{ mr: 1 }} />
                                    <Typography variant="body2">{order.user.phone}</Typography>
                                </Box>
                                <Typography variant="body2">
                                    <strong>Order Date:</strong> {formatOrderDate(order.orderDate)}
                                </Typography>
                                <Chip
                                    label={order.status}
                                    sx={{
                                        background: getOrderStatusColor(order.status),
                                        color: '#ffffff',
                                        fontWeight: 'bold',
                                        marginTop: 2,
                                    }}
                                />
                                <Button
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                        position: 'absolute',
                                        top: 8,
                                        right: 8,
                                        borderColor: '#ff8e53',
                                        color: '#ff8e53',
                                        '&:hover': {
                                            background: '#ff8e53',
                                            color: '#ffffff',
                                        },
                                    }}
                                    onClick={() => { handleOrderView(order) }}
                                >
                                    View Details
                                </Button>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}

export default MyStore;
