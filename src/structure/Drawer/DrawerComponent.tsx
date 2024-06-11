import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface DrawerComponentProps {
    open: boolean;
    toggleDrawer: (open: boolean) => () => void;
}

function DrawerComponent({ open, toggleDrawer }: DrawerComponentProps) {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleNavigation = (path: string) => () => {
        navigate(path);
        toggleDrawer(false)();
    };

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {[
                    { text: t('List of Books'), icon: <MenuBookIcon />, path: '/bookList' },
                    { text: t('Add Book'), icon: <MenuBookIcon />, path: '/addBook' },
                    { text: t('List of ongoing rentals'), icon: <RecentActorsIcon />, path: '/rentalList' },
                    { text: t('Add Loan'), icon: <RecentActorsIcon />, path: '/addLoan' },
                ].map((item, index) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton onClick={handleNavigation(item.path)}>
                            <ListItemIcon>
                                {index === 0 ? <MenuBookIcon /> : index === 1 ? <MenuBookIcon /> : <RecentActorsIcon />}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Drawer open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
        </Drawer>
    );
}

export default DrawerComponent;
