import './LoginForm.css'
import {Button, TextField} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import {Formik} from "formik";
import {useCallback, useMemo} from "react";
import * as yup from 'yup';
import {Key} from "@mui/icons-material";
import PersonIcon from '@mui/icons-material/Person';
import {useNavigate} from "react-router-dom";
import {useApi} from "../../api/ApiProvider";
import {useTranslation} from 'react-i18next';

function LoginForm(){
    const initialValues = {username: "", password: ""};
    const navigate  = useNavigate()
    const apiClient = useApi();
    const { t } = useTranslation();

    const onSubmit = useCallback(
        (values: { username: string; password: string }, formik: any) => {
            apiClient.login(values).then((response:any) => {
                if (response.success && response.data && response.data.token) {
                    localStorage.setItem("token", response.data.token);
                    navigate('/mainPage');
                } else {
                    formik.setFieldError('username', 'Invalid username or password');
                }
            });
        },
        [apiClient, navigate],
    );
    const validationschema = useMemo(() =>
        () => yup.object().shape({
            username: yup.string().required('Required'),
            password: yup.string().required('Required').min(5, 'Your password is to short! (min. 5 characters)'),
    }), [])

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationschema} validateOnChange validateOnBlur>
            {(formik: any) => (
                <form className="LoginForm" id="signForm" onSubmit={formik.handleSubmit} noValidate>
                    <h1 title={"Log in"}>
                        {t('Log in')}
                    </h1>
                    <div style={{display: 'flex', alignItems: 'center', marginRight: '10px'}}>
                        <PersonIcon style={{
                            marginRight: '10px',
                            color: 'white',
                            marginTop: '16px'
                        }}/>
                        <TextField
                            id="username"
                            label={t('Username')}
                            variant="standard"
                            name="username"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.username && Boolean(formik.errors.username)}
                            helperText={formik.touched.username && formik.errors.username}/>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', marginRight: '10px'}}>
                        <Key style={{marginRight: '10px', color: 'white', marginTop: '18px'}}/>
                        <TextField
                            id="password"
                            label={t('Password')}
                            variant="standard"
                            type="password"
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                    </div>
                    <Button
                        variant="contained"
                        endIcon={<LoginIcon/>}
                        type="submit"
                        form="signForm"
                        disabled={!formik.isValid && formik.dirty}
                    >
                        {t('Sign in')}
                    </Button>
                    <a href="/addUser" className="text-gray-300 mt-3  hover:cursor-pointer hover:underline ">
                        {t('Create an account')}
                    </a>
                </form>
            )}
        </Formik>
    )
}

export default LoginForm