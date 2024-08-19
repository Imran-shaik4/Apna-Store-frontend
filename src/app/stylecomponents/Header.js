import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    AppBar, Toolbar, IconButton, Typography, InputBase, Box,
    Drawer, List, Divider, Tooltip, ListItem, ListItemText, Button
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import { searchByCity, searchByName } from '../features/storeSlice'; // Import the search thunk
import { logout } from '../features/userSlice'; // Import the logout action
import logo from '../../assets/grocery.gif';
import { useHistory } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
    transition: 'all 0.3s ease-in-out',
}));

const SearchIconWrapper = styled(IconButton)(({ theme }) => ({
    padding: theme.spacing(1),
    height: '100%',
    color: 'inherit',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    flexGrow: 1,
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(2)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const drawerWidth = 260;

const SidebarListItem = ({ text, icon, onClick }) => (
    <ListItem
        button
        onClick={onClick}
        sx={{
            backgroundColor: '#2C3E50',
            color: '#ECF0F1',
            '&:hover': { backgroundColor: '#34495E' },
            '& .MuiListItemText-primary': { color: '#ECF0F1' }
        }}
    >
        <IconButton edge="start" color="inherit" sx={{ mr: 2 }}>
            {icon}
        </IconButton>
        <ListItemText primary={text} />
    </ListItem>
);

function Header() {
    const history = useHistory();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(''); // State to store search term
    const dispatch = useDispatch();

    // Retrieve token from Redux store or local storage
    const token = useSelector((state) => state.user.token);
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const handleSearchInputChange = (event) => {
        setSearchTerm(event.target.value); // Update search term state
    };

    const handleSearch = () => {
        if (searchTerm.trim()) {
            dispatch(searchByCity(searchTerm));
            dispatch(searchByName(searchTerm));
            setSearchTerm('');
            history.push('/searchedstores');
        }
    };

    const handleLogout = () => {
        dispatch(logout()); // Dispatch the logout action
        // Add any additional logout handling logic here (e.g., redirect to login page)
        history.push('/');
    };

    const menuItems = [
        { text: 'Home', icon: <HomeIcon />, onClick: () => history.push('/') },
        // { text: 'My Orders', icon: <ShoppingCartIcon />, onClick: () => history.push('/myorders') },
        // { text: 'My Stores', icon: <StoreMallDirectoryIcon />, onClick: () => history.push('/mystores') },
        ...(token ? [
            { text: 'My Orders', icon: <ShoppingCartIcon />, onClick: () => history.push('/myorders') },
            { text: 'My Stores', icon: <StoreMallDirectoryIcon />, onClick: () => history.push('/mystores') },
            { text: 'Profile', icon: <PersonIcon />, onClick: () => history.push('/profile') },
            { text: 'Logout', icon: <LogoutIcon />, onClick: handleLogout }, // Add onClick for logout
        ] : [
            { text: 'Login', icon: <PersonIcon />, onClick: () => history.push('/login') },// Redirect to login page
            { text: 'Register', icon: <PersonIcon />, onClick: () => history.push('/register') }
        ])
    ];

    const drawerList = () => (
        <Box
            sx={{ width: drawerWidth }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {menuItems.map(({ text, icon, onClick }) => (
                    <SidebarListItem key={text} text={text} icon={icon} onClick={onClick} />
                ))}
            </List>
            <Divider sx={{ backgroundColor: '#ECF0F1' }} />
            <List>
                <SidebarListItem text="Help" icon={<HelpIcon />} onClick={() => {
                    history.push('/appdiscription');
                }} />
            </List>
        </Box>
    );
    
  

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{ backgroundColor: '#1A252F', padding: 0 }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon sx={{ fontSize: 28 }} />
                    </IconButton>
                    <img
                        src={logo}
                        alt="Apna Store Logo"
                        style={{
                            height: 40,
                            marginRight: 16,
                            display: { xs: 'none', sm: 'inline-block' },
                            border: '2px solid #ECF0F1',
                            borderRadius: 8,
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                            transition: 'all 0.3s ease-in-out',
                            padding: 2,
                            backgroundColor: '#1A252F'
                        }}
                    />
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                            flexGrow: 1,
                            fontWeight: 'bold',
                            color: '#ECF0F1',
                            textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
                            display: { xs: 'none', sm: 'block' },
                            cursor: 'pointer',
                        }}
                        onClick={() => {
                            history.push('/');
                        }}
                    >
                        Apna Store
                    </Typography>

                    <Search>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            value={searchTerm}
                            onChange={handleSearchInputChange} // Handle input change
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // Handle Enter key
                        />
                        <Tooltip title="Search">
                            <SearchIconWrapper onClick={handleSearch}>
                                <SearchIcon />
                            </SearchIconWrapper>
                        </Tooltip>
                    </Search>

                    {/* Conditionally render Profile icon or Login link */}
                    {token ? (
                        <Box sx={{ display: { xs: 'none', sm: 'block' } }} onClick={() => history.push('/profile')}>
                            <Tooltip title="Profile">
                                <IconButton size="large" edge="end" color="inherit">
                                    <AccountCircleIcon sx={{ fontSize: 30 }} />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    ) : (
                        <Button
                            sx={{
                                color: '#ECF0F1',
                                fontWeight: 'bold',
                                marginLeft: 'auto',
                            }}
                            onClick={() => { history.push('/login') }} // Link to the login page
                        >
                            Login
                        </Button>
                    )}
                </Toolbar>
            </AppBar>

            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        backgroundColor: '#34495E',
                        color: '#ECF0F1',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
                        transition: 'transform 0.3s ease-in-out',
                    },
                }}
            >
                {drawerList()}
            </Drawer>
        </Box>
    );
}

export default Header;
