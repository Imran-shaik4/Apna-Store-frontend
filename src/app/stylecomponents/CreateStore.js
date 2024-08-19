import React, {  useState } from 'react';
import { TextField, Button, Box, Typography, Grid, Paper, Avatar } from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';
import { useDispatch, useSelector } from 'react-redux';
import { createStore } from '../features/userSlice';
import { useHistory } from 'react-router-dom';
import Load from './Load';
import Error from './Error';
import { changeToIdle } from '../features/userSlice';
function CreateStore() {
    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.user);
    const history = useHistory();

    const [storeDetails, setStoreDetails] = useState({
        name: '',
        address: {
            street: '',
            city: '',
            state: ''
        }
    });
    

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.includes('address.')) {
            const addressField = name.split('.')[1];
            setStoreDetails((prevDetails) => ({
                ...prevDetails,
                address: {
                    ...prevDetails.address,
                    [addressField]: value
                }
            }));
        } else {
            setStoreDetails((prevDetails) => ({
                ...prevDetails,
                [name]: value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createStore(storeDetails));
        if (status === 'succeeded') {
            dispatch(changeToIdle());
            history.push('/mystores');
        }
    };
   
    if (status === 'loading') {
        return (<Load />);
    };
    if (status === 'failed') {
        function retry() {
            dispatch(changeToIdle());
            history.push('/createstore');
        }
        return (<Error message={error} onRetry={retry} />)
    };

    return (
        <Paper
            elevation={6}
            sx={{
                padding: 4,
                margin: 'auto',
                maxWidth: 600,
                borderRadius: 4,
                backgroundColor: '#ffffff',
                textAlign: 'center',
                marginTop: 14
            }}
        >
            <Avatar sx={{ bgcolor: '#FE6B8B', margin: 'auto', mb: 2 }}>
                <StoreIcon />
            </Avatar>
            <Typography variant="h4" component="h1" gutterBottom color="textPrimary">
                Create Store
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            variant="filled"
                            fullWidth
                            name="name"
                            label="Store Name"
                            value={storeDetails.name}
                            onChange={handleChange}
                            InputProps={{
                                disableUnderline: true,
                            }}
                            InputLabelProps={{
                                style: { color: '#333' },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="filled"
                            fullWidth
                            name="address.street"
                            label="Street Address"
                            value={storeDetails.address.street}
                            onChange={handleChange}
                            InputProps={{
                                disableUnderline: true,
                            }}
                            InputLabelProps={{
                                style: { color: '#333' },
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            variant="filled"
                            fullWidth
                            name="address.city"
                            label="City"
                            value={storeDetails.address.city}
                            onChange={handleChange}
                            InputProps={{
                                disableUnderline: true,
                            }}
                            InputLabelProps={{
                                style: { color: '#333' },
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            variant="filled"
                            fullWidth
                            name="address.state"
                            label="State"
                            value={storeDetails.address.state}
                            onChange={handleChange}
                            InputProps={{
                                disableUnderline: true,
                            }}
                            InputLabelProps={{
                                style: { color: '#333' },
                            }}
                        />
                    </Grid>
                </Grid>
                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                        variant="outlined"
                        sx={{
                            color: '#FE6B8B',
                            borderColor: '#FE6B8B',
                            '&:hover': {
                                borderColor: '#FE6B8B',
                                backgroundColor: 'rgba(63, 81, 181, 0.04)',
                            },
                        }}
                        onClick={() => history.push('/')}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            background: '#FE6B8B',
                            color: '#ffffff',
                            '&:hover': {
                                background: '#FF8E53',
                            },
                        }}
                    >
                        Create Store
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
}

export default CreateStore;
