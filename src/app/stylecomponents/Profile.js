import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Grid, Paper, Avatar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { useDispatch, useSelector } from 'react-redux';
import { getTheProfile, updateProfile, logout } from '../features/userSlice';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Load from './Load';
import Error from './Error';

function Profile() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { user, status, error } = useSelector((state) => state.user);

    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        city: '',
        state: '',
        phone: '',
    });

    useEffect(() => {
        dispatch(getTheProfile());
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            setProfileData({
                name: user.name || '',
                email: user.email || '',
                city: user.address.city || '',
                state: user.address.state || '',
                phone: user.phone || '',
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    const toggleEdit = () => {
        if (isEditing) {
            dispatch(updateProfile(profileData));
        }
        setIsEditing(!isEditing);
    };

    const handleLogout = () => {
        dispatch(logout());
        history.push('/');
    };
    if (status === 'Loading') {
        return <Load />
    }
    if (status === 'failed') {
        function retry() {
            history.push('/');
        }
        return <Error message={error} onRetry={ retry} />
    }
    return (
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
                marginTop: 14,
            }}
        >
            <Avatar sx={{ bgcolor: '#FE6B8B', margin: 'auto', mb: 2 }}>
                <PersonIcon sx={{ color: '#ffffff' }} />
            </Avatar>
            <Typography variant="h4" component="h1" gutterBottom>
                Profile
            </Typography>

            <Box component="form" sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            variant="filled"
                            fullWidth
                            name="name"
                            label="Name"
                            value={profileData.name}
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
                            name="email"
                            label="Email"
                            value={profileData.email}
                            InputProps={{
                                readOnly: true,
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
                            value={profileData.city}
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
                            value={profileData.state}
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
                            name="phone"
                            label="Phone"
                            value={profileData.phone}
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
                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                        variant="contained"
                        startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
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
                        startIcon={<LogoutIcon />}
                        onClick={handleLogout}
                        sx={{
                            background: '#FE6B8B',
                            color: '#ffffff',
                            '&:hover': {
                                background: '#FF8E53',
                                color: '#ffffff',
                            },
                        }}
                    >
                        Logout
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
}

export default Profile;
