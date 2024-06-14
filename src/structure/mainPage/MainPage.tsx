import './MainPage.css';
import * as React from 'react';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import DrawerComponent from '../Drawer/DrawerComponent';
import TranslateButton from '../../locales/TranslateButton';

function MainPage() {
    const [open, setOpen] = React.useState(false);
    const { t } = useTranslation();

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    return (
        <div className="MainPage">
            <div className="TranslateButton">
                <TranslateButton />
            </div>
            <h1>{t('Welcome to library service')}</h1>
            <div>
                <Button onClick={toggleDrawer(true)} variant="outlined">
                    {t('What would You like to do?')}
                </Button>
                <DrawerComponent open={open} toggleDrawer={toggleDrawer} />
            </div>
        </div>
    );
}

export default MainPage;
