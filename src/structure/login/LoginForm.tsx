import './LoginForm.css'
import {Button, TextField} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import {Formik} from "formik";
import {useCallback, useMemo} from "react";
import * as yup from 'yup';

function LoginForm(){
    const initialValues = {username: "", password: ""};
    const onSubmit = useCallback((values: { username: string; password: string}, formik: any) => {console.log(values)}, []);
    const validationschema = useMemo(() =>
        () => yup.object().shape({
            username: yup.string().required('Required'),
            password: yup.string().required('Required').min(5, 'Your password is to short! (min. 5 characters)'),
    }), [])

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationschema} validateOnChange validateOnBlur>
            {(formik: any) => (
                <form className="LoginForm" id="signForm" onSubmit={formik.handleSubmit} noValidate>
                    <TextField
                        id="username"
                        label="Username"
                        variant="standard"
                        name="username"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}/>
                    <TextField
                        id="password"
                        label="Password"
                        variant="standard"
                        type="password"
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}/>
                    <Button
                        variant="contained"
                        endIcon={<LoginIcon/>}
                        type="submit"
                        form="signForm"
                        disabled={!formik.isValid || !formik.touched.password || !formik.touched.username}
                    >
                        Sign in
                    </Button>
                </form>
            )}
        </Formik>
    )
}

export default LoginForm