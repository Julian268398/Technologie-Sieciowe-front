import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

interface MenuIconButtonProps {
    ariaLabel?: string;
    onClick?: () => void;
}

const MenuIconButton: React.FC<MenuIconButtonProps> = ({ ariaLabel = "menu", onClick }) => {
    return (
        <IconButton aria-label={ariaLabel} onClick={onClick}>
            <MenuIcon style={{ color: 'white' }}/>
        </IconButton>
    );
};

export default MenuIconButton;
