import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Card, CardContent, Grid, Chip, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { getAllOrdersOfUser } from '../features/userSlice';
import { formatDistanceToNow } from 'date-fns';
import StorefrontIcon from '@mui/icons-material/Storefront';
import Load from './Load';
import Error from './Error';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import NoOrders from './NoOrders';
const ScrollableContainer = styled(TableContainer)(({ theme }) => ({
    maxHeight: '150px',
    overflowY: 'auto',
    marginTop: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    boxShadow: `0 4px 6px ${theme.palette.grey[300]}`,
    '&::-webkit-scrollbar': {
        width: '8px',
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.primary.main,
        borderRadius: '8px',
    },
    '&::-webkit-scrollbar-track': {
        backgroundColor: theme.palette.background.paper,
    },
}));

const StyledCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[6],
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: theme.shadows[12],
    },
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
    padding: theme.spacing(4),
    position: 'relative',
}));

const Header = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
}));

const StoreAvatar = styled(Avatar)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    marginRight: theme.spacing(2),
}));

const TruncatedTextCell = styled(TableCell)(({ theme }) => ({
    maxWidth: '150px',  // Limit the maximum width of the product name column
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    [theme.breakpoints.down('sm')]: {
        maxWidth: '100px',  // Adjust max-width for smaller screens
    },
}));

const MyOrders = () => {
    const dispatch = useDispatch();
    const { orders, status, error } = useSelector((state) => state.user);
    const history = useHistory();
    useEffect(() => {
        dispatch(getAllOrdersOfUser());
    }, [dispatch]);

    if (status === 'loading') {
        return (
            <Load />
        );
    }
    if (orders.length === 0) {
        return <NoOrders />
    }

    if (status === 'failed') {
        function retry() {
            history.push('/');
        }
        return (
            <Error message={error} onRetry={retry} />
        );
    }

    return (
        <Box sx={{ padding: 3, mt: 14 }}>
            <Grid container spacing={4}>
                {orders.map((order) => (
                    <Grid item xs={12} md={6} lg={4} key={order._id}>
                        <StyledCard>
                            <StyledCardContent>
                                <Header>
                                    <StoreAvatar>
                                        <StorefrontIcon />
                                    </StoreAvatar>
                                    <Typography variant="h6" noWrap>
                                        {order.store ? order.store.name : "STORE NAME NOT AVAILABLE"}
                                    </Typography>
                                </Header>

                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography variant="body2" color="textSecondary">
                                        {formatDistanceToNow(new Date(order.orderDate))} ago
                                    </Typography>
                                    <Chip
                                        label={order.status}
                                        color={order.status === 'completed' ? 'success' : 'warning'}
                                        variant="filled"
                                    />
                                </Box>

                                {order.status === 'completed' && (
                                    <Typography variant="h6" color="primary" gutterBottom>
                                        Total Amount: ${order.totalAmount}
                                    </Typography>
                                )}

                                <Divider sx={{ my: 2 }} />

                                <Typography variant="subtitle1" gutterBottom>
                                    Products List
                                </Typography>

                                <ScrollableContainer component={Paper}>
                                    <Table stickyHeader size="small" aria-label="products table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell><Typography variant="body2" fontWeight="bold">#</Typography></TableCell>
                                                <TableCell><Typography variant="body2" fontWeight="bold">Name</Typography></TableCell>
                                                <TableCell align="center"><Typography variant="body2" fontWeight="bold">Quantity</Typography></TableCell>
                                                {order.status === 'completed' && (
                                                    <TableCell align="right"><Typography variant="body2" fontWeight="bold">Price</Typography></TableCell>
                                                )}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {order.products.map((product, index) => (
                                                <TableRow key={product._id}>
                                                    <TableCell>
                                                        <Typography variant="body2" noWrap>{index + 1}</Typography>
                                                    </TableCell>
                                                    <TruncatedTextCell>
                                                        <Typography variant="body2" noWrap>{product.name}</Typography>
                                                    </TruncatedTextCell>
                                                    <TableCell align="center">
                                                        <Typography variant="body2" noWrap>{product.quantity} pcs</Typography>
                                                    </TableCell>
                                                    {order.status === 'completed' && (
                                                        <TableCell align="right">
                                                            <Typography variant="body2" noWrap>${product.price}</Typography>
                                                        </TableCell>
                                                    )}
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </ScrollableContainer>
                            </StyledCardContent>
                        </StyledCard>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default MyOrders;
