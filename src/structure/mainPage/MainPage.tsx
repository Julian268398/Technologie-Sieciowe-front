import './MainPage.css'
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import {useNavigate} from "react-router-dom";

function MainPage() {

    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };
    const handleNavigation = (path:any) => () => {
        navigate(path);
        setOpen(false);
    };
    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {[
                    { text: 'Book list', icon: <MenuBookIcon />, path: '/bookList' },
                    { text: 'Log in', icon: <PersonIcon />, path: '/login' },
                    { text: 'Rental list', icon: <RecentActorsIcon />, path: '/rentalList' }
                ].map((item, index) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton
                            onClick={handleNavigation(item.path)}>
                            <ListItemIcon>
                                {index === 0 ? <MenuBookIcon /> : index === 1 ? <PersonIcon /> : <RecentActorsIcon />}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div className="MainPage">
            <h1>Welcome to library service</h1>
            <div>
                <Button
                    onClick={toggleDrawer(true)}
                    variant="outlined"
                >
                    What would You like to do?
                </Button>
                <Drawer
                    open={open}
                    onClose={toggleDrawer(false)}
                >
                    {DrawerList}
                </Drawer>
            </div>
        </div>
    );

}

export default MainPage;