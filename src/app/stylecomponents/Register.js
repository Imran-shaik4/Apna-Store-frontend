import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Grid, Paper, Avatar } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../features/userSlice';
import Load from './Load';
import Error from './Error';
import { useHistory } from 'react-router-dom';
import { changeToIdle } from '../features/userSlice';
function Register() {
    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.user);
    const history = useHistory();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        city: '',
        state: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, password, phone, city, state } = formData;

        // Construct the userDetails object to match backend requirements
        const userDetails = {
            name,
            email,
            password,
            phone,
            address: { city, state }
        };

        // Dispatch the register thunk with the userDetails object
        dispatch(register(userDetails));
    };
    if (status === 'succeeded') {
        history.push('/');
    };
    if (status === 'loading') {
        return (<Load />);
    };
    if (status === 'failed') {
        function retry() {
            dispatch(changeToIdle());
            history.push('/register');
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
                <PersonAddIcon />
            </Avatar>
            <Typography variant="h4" component="h1" gutterBottom color="textPrimary">
                Register
            </Typography>

       

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            variant="filled"
                            fullWidth
                            name="name"
                            label="Name"
                            value={formData.name}
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
                            name="email"
                            label="Email"
                            value={formData.email}
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
                            name="password"
                            label="Password"
                            type="password"
                            value={formData.password}
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
                            name="phone"
                            label="Phone"
                            value={formData.phone}
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
                            name="city"
                            label="City"
                            value={formData.city}
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
                            name="state"
                            label="State"
                            value={formData.state}
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
                <Box sx={{ mt: 4 }}>
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
                        Register
                    </Button>
                </Box>
                {/* <Box sx={{ mt: 2 }}>
                    <Link href="/login" variant="body2" sx={{ color: '#1976d2', fontSize: '0.9rem' }}>
                        {"Already have an account? Sign In"}
                    </Link>
                </Box> */}
                <Box sx={{ mt: 2 }}>
                    <Typography
                        variant="body2"
                        onClick={()=>{history.push('/login')}}
                        sx={{
                            color: '#1976d2',
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            '&:hover': {
                                textDecoration: 'underline',
                            },
                        }}
                    >
                        {"Already have an account? Sign In"}
                    </Typography>
                </Box>
            </Box>
        </Paper>
    );
}

export default Register;
