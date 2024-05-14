import './LoginForm.css'
import {Button, TextField} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import {Formik} from "formik";
import {useCallback, useMemo} from "react";
import * as yup from 'yup';
import {Key} from "@mui/icons-material";
import PersonIcon from '@mui/icons-material/Person';
import {useNavigate} from "react-router-dom";

function LoginForm(){
    const initialValues = {username: "", password: ""};
    const navigate  = useNavigate()
    const onSubmit = useCallback(
        (values: { username: string; password: string}, formik: any) => {
            navigate('/BookList');
            console.log('/BookList')
        },
        [navigate]);
    const validationschema = useMemo(() =>
        () => yup.object().shape({
            username: yup.string().required('Required'),
            password: yup.string().required('Required').min(5, 'Your password is to short! (min. 5 characters)'),
    }), [])

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationschema} validateOnChange validateOnBlur>
            {(formik: any) => (
                <form className="LoginForm" id="signForm" onSubmit={formik.handleSubmit} noValidate>
                    <h1 title={"Log in"}>Log in</h1>
                    <div style={{display: 'flex', alignItems: 'center', marginRight: '10px'}}>
                        <PersonIcon style={{
                            marginRight: '10px',
                            color: 'white',
                            marginTop: '16px'
                        }}/>
                        <TextField
                            id="username"
                            label="Username"
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
                            label="Password"
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
                        Sign in
                    </Button>
                </form>
            )}
        </Formik>
    )
}

export default LoginForm