import React from 'react';
import { Card, CardContent, Typography, Button, Box, Icon } from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const AppDescription = () => {
    const history = useHistory();
    return (
        <Card sx={{ maxWidth: 600, margin: 'auto', padding: 2, mt: 14 }}>
            <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                    Welcome to Our Multi-Store Grocery App!
                </Typography>
                <Box display="flex" alignItems="center" mb={2}>
                    <Icon sx={{ mr: 1 }}>
                        <StorefrontIcon color="primary" />
                    </Icon>
                    <Typography variant="body1">
                        Create your own stores and manage multiple stores with ease.
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={2}>
                    <Icon sx={{ mr: 1 }}>
                        <SearchIcon color="primary" />
                    </Icon>
                    <Typography variant="body1">
                        Search for stores by name or city to find exactly what you need.
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={2}>
                    <Icon sx={{ mr: 1 }}>
                        <ShoppingCartIcon color="primary" />
                    </Icon>
                    <Typography variant="body1">
                        Place orders from any store with a few simple clicks.
                    </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                    Whether you want to set up shop or just find the best deals in town, our app has got you covered.
                    Start exploring now and enjoy the convenience of a community-driven grocery marketplace!
                </Typography>
                <Button
                    variant="contained"
                    sx={{ mt: 2, bgcolor: '#1976d2', fontSize: '0.9rem', textTransform: 'none' }}
                    onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
                    onMouseOut={(e) => e.target.style.textDecoration = 'none'}
                    onClick={() => {
                        history.push("/");
                    }}
                >
                    Get Started
                </Button>
            </CardContent>
        </Card>
    );
};

export default AppDescription;
