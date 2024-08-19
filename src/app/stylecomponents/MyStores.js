import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStoresOfUser, setSelectedStoreId, setSelectedStore } from '../features/storeSlice';
import { Box, Typography, Card, CardContent, Grid, Badge, Avatar, Button, Fab } from '@mui/material';
import { styled } from '@mui/material/styles';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AddIcon from '@mui/icons-material/Add';
import { formatDistanceToNow } from 'date-fns';
import Load from './Load';
import Error from './Error';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useHistory } from 'react-router-dom';
import NoStores from './NoStores';
const StyledCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#FE6B8B',
    color: theme.palette.primary.contrastText,
    boxShadow: theme.shadows[8],
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
        transform: 'translateY(-10px)',
        boxShadow: theme.shadows[16],
        backgroundColor: '#FF8E53',
    },
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
    padding: theme.spacing(4),
    position: 'relative',
    flexGrow: 1,
}));

const Header = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2),
}));

const StoreAvatar = styled(Avatar)(({ theme }) => ({
    backgroundColor: theme.palette.primary.contrastText,
    color: '#FE6B8B', // This makes the icon contrast nicely with the background
    marginRight: theme.spacing(2),
}));

const CardFooter = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[100],
    borderTop: `1px solid ${theme.palette.divider}`,
}));

const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
    },
}));

const AddStoreButton = styled(Fab)(({ theme }) => ({
    position: 'fixed',
    bottom: theme.spacing(3),
    right: theme.spacing(3),
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    '&:hover': {
        backgroundColor: theme.palette.secondary.dark,
    },
}));

const MyStores = () => {
    const dispatch = useDispatch();
    const stores = useSelector((state) => state.store.stores);
    const status = useSelector((state) => state.store.status);
    const error = useSelector((state) => state.store.error);
    const history = useHistory();
    useEffect(() => {
        dispatch(getAllStoresOfUser());
    }, [dispatch]);
    function handleStoreManage(id, store) {
        dispatch(setSelectedStoreId(id));
        dispatch(setSelectedStore(store));
        history.push('/mystore');
    }
    function handleAddStoreClick() {
        
        history.push('/createstore');
    }

    if (status === 'loading') {
        return (
            <Load />
        );
    }

    if (status === 'failed') {
        function retry() {
            history.push('/');
        }
        return (
            <Error message={error} onRetry={retry} />
        );
    }
    if (stores.length === 0) {
        return (
            <>
                <NoStores />
                <AddStoreButton aria-label="add-store" onClick={handleAddStoreClick}>
                    <AddIcon />
                </AddStoreButton>
            </>
        );
    }

    return (
        <Box sx={{ padding: 3, position: 'relative', mt: 14 }}>
            <Grid container spacing={4}>
                {stores.map((store) => (
                    <Grid item xs={12} sm={6} md={4} key={store._id}>
                        <StyledCard>
                            <StyledCardContent>
                                <Header>
                                    <Box display="flex" alignItems="center">
                                        <StoreAvatar>
                                            <StorefrontIcon />
                                        </StoreAvatar>
                                        <Typography variant="h6" noWrap>
                                            {store.name}
                                        </Typography>
                                    </Box>
                                    <Badge
                                        badgeContent={store.totalUncompletedOrders}
                                        color={store.totalUncompletedOrders > 0 ? 'error' : 'default'}
                                    >
                                        <ShoppingCartIcon color="inherit" />
                                    </Badge>
                                </Header>

                                <Typography variant="body2" color="white" mt={1}>
                                    {`${store.address.street}, ${store.address.city}, ${store.address.state}`}
                                </Typography>

                                {store.lastOrderDate && (
                                    <Typography variant="body2" color="white" mt={2}>
                                        Last Order: {formatDistanceToNow(new Date(store.lastOrderDate))} ago
                                    </Typography>
                                )}
                            </StyledCardContent>

                            <CardFooter>
                                <Typography variant="body2" color="textSecondary">
                                    Store Created: {formatDistanceToNow(new Date(store.date))} ago
                                </Typography>
                                <StyledButton size="small" variant="contained" onClick={() => { handleStoreManage(store._id, store) }}>
                                    Manage Store
                                </StyledButton>
                            </CardFooter>
                        </StyledCard>
                    </Grid>
                ))}
            </Grid>
            <AddStoreButton aria-label="add-store" onClick={handleAddStoreClick} >
                <AddIcon />
            </AddStoreButton>
        </Box>
    );
};

export default MyStores;
