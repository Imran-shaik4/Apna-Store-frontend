import React, { } from 'react';
import { Avatar, Button, CssBaseline, TextField, Grid, Box, Typography, Container, Paper } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { login } from '../features/userSlice'; // Assuming you have defined the login thunk in userSlice
import { useSelector, useDispatch } from 'react-redux';
import Load from './Load'; // Adjusted component name from 'Lode' to 'Load'
import Error from './Error';
import { useHistory } from 'react-router-dom';
import { changeToIdle } from '../features/userSlice';
const theme = createTheme();

function Login() {
    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.user); // Replace 'user' with the correct slice name if different
    const history = useHistory();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const credentials = {
            email: data.get('email'),
            password: data.get('password'),
        };
        dispatch(login(credentials));

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
            history.push('/login');
        }
        return (<Error message={error} onRetry={retry} />)
    };
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs" sx={{ mt: 14 }}>
                <CssBaseline />
                <Paper elevation={6} sx={{ mt: 8, p: 4, borderRadius: 4 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Avatar sx={{ m: 1, bgcolor: '#FE6B8B' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', color: '#333' }}>
                            Sign In
                        </Typography>

                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                InputProps={{
                                    style: { fontSize: '1rem' }
                                }}
                                InputLabelProps={{
                                    style: { fontSize: '1rem', color: '#666' }
                                }}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                InputProps={{
                                    style: { fontSize: '1rem' }
                                }}
                                InputLabelProps={{
                                    style: { fontSize: '1rem', color: '#666' }
                                }}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 3, mb: 2, p: 1.5,
                                    fontWeight: 'bold', fontSize: '1rem', backgroundColor: '#FE6B8B',
                                    '&:hover': { backgroundColor: '#FF8E53' }
                                }}
                            >
                                Sign In
                            </Button>
                            {/* <Grid container>
                                <Grid item>
                                    <Link href="/register" variant="body2" sx={{ color: '#FE6B8B', fontSize: '0.9rem' }}>
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid> */}
                            <Grid container>
                                <Grid item>
                                    <Typography
                                        variant="body2"
                                        onClick={() => { history.push('/register') }}
                                        sx={{
                                            color: '#FE6B8B',
                                            fontSize: '0.9rem',
                                            cursor: 'pointer',
                                            '&:hover': {
                                                textDecoration: 'underline',
                                            },
                                        }}
                                    >
                                        {"Don't have an account? Sign Up"}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </ThemeProvider>
    );
}

export default Login;
