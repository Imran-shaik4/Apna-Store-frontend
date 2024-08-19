import {
    Card, CardContent, Typography, Grid, Box, CardActionArea,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import { styled } from '@mui/system';
import { formatDistanceToNow } from 'date-fns';
import { useEffect } from 'react';
import { clearSearchedStores } from '../features/storeSlice';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Error from './Error';
import Load from './Load';
import NoMatchingStores from './NoMatchingStores ';
const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const StoreCard = styled(Card)(({ theme, color }) => ({
    maxWidth: 345,
    margin: theme.spacing(2),
    boxShadow: theme.shadows[3],
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: theme.shadows[8],
    },
    backgroundColor: color,
    color: theme.palette.getContrastText(color),
    overflow: 'hidden',
}));

const LetterBadge = styled(Box)(({ theme, color }) => ({
    width: 60,
    height: 60,
    borderRadius: '50%',
    backgroundColor: theme.palette.getContrastText(color),
    color: color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    margin: theme.spacing(2, 'auto'),
}));

const CardContentStyled = styled(CardContent)(({ theme }) => ({
    color: theme.palette.getContrastText(theme.palette.background.paper),
    '& .MuiTypography-root': {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
}));

const StoreItem = ({ store }) => {
    const color = generateRandomColor(); // Generate a unique color for each store

    return (
        <CardActionArea component="a" href={`/store/${store._id}`}>
            <StoreCard color={color}>
                <LetterBadge color={color}>
                    {store.name.charAt(0)}
                </LetterBadge>
                <CardContentStyled>
                    <Typography gutterBottom variant="h5" component="div">
                        {store.name}
                    </Typography>
                    <Typography variant="body2">
                        {`${store.address.street}, ${store.address.city}, ${store.address.state}`}
                    </Typography>
                    <Typography variant="body2">
                        Owner: {store.owner.name}
                    </Typography>
                    <Typography variant="body2">
                        Email: {store.owner.email}
                    </Typography>
                    <Typography variant="body2">
                        Mobile: {store.owner.phone}
                    </Typography>
                    <Typography variant="body2">
                        Available for: {formatDistanceToNow(new Date(store.date), { addSuffix: true })}
                    </Typography>
                </CardContentStyled>
            </StoreCard>
        </CardActionArea>
    );
};

const SearchedStores = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { searchedStores, status, error } = useSelector((state) => state.store);
    useEffect(() => {

        dispatch(clearSearchedStores());

    }, [dispatch]);

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
    if (searchedStores.length === 0) {
        return <NoMatchingStores />
    }
    return (
        <Box sx={{ flexGrow: 1, p: 3, mt: 14 }}>
            <Grid container spacing={3} justifyContent="center">
                {searchedStores.map(store => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={store._id}>
                        <StoreItem store={store} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default SearchedStores;
