import React, { useState, MouseEvent } from 'react';
import TranslateIcon from '@mui/icons-material/Translate';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import i18n from 'i18next';

const TranslateButton: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        handleClose();
    };

    return (
        <>
            <IconButton aria-label="language" onClick={handleClick}>
                <TranslateIcon style={{ color: 'white' }} />
            </IconButton>
            <Menu
                id="menu-appbar-lang"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => changeLanguage('en')}>English</MenuItem>
                <MenuItem onClick={() => changeLanguage('pl')}>Polski</MenuItem>
            </Menu>
        </>
    );
};

export default TranslateButton;
