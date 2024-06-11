import { useState } from "react";
import * as yup from "yup";
import { Formik, FormikHelpers } from "formik";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import "./AddUser.css";
import { useNavigate } from "react-router-dom";
import MenuIconButton from "../Drawer/MenuIconButton";
import DrawerComponent from "../Drawer/DrawerComponent";

interface addUserValues {
    username: string;
    password: string;
    role: string;
    mail: string;
    name: string;
}

function AddUser() {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [openDrawer, setOpenDrawer] = useState(false);

    const initialValues: addUserValues = {
        username: "",
        password: "",
        role: "ROLE_READER",
        mail: "",
        name: ""
    };

    const validationSchema = yup.object().shape({
        username: yup.string().required("Required"),
        password: yup.string().required("Required").min(5, "Your password is too short! (min. 5 characters)"),
        role: yup.string().notRequired(),
        mail: yup.string().required("Required").email("Invalid email address"),
        name: yup.string().required("Required")
    });

    const textFieldStyles = {
        "& label.Mui-focused": {
            color: "white"
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "white"
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "white"
            },
            "&:hover fieldset": {
                borderColor: "white"
            },
            "&.Mui-focused fieldset": {
                borderColor: "white"
            },
            "& input": {
                color: "white"
            }
        },
        "& .MuiInputLabel-root": {
            color: "white"
        }
    };

    const handleSubmit = async (
        values: addUserValues,
        { setSubmitting, resetForm }: FormikHelpers<addUserValues>
    ) => {
        try {
            const response = await axios.post("http://localhost:8080/auth/register", {
                username: values.username,
                password: values.password,
                role: values.role,
                mail: values.mail,
                name: values.name
            });

            console.log("User created successfully:", response.data);
            setError("");
            navigate("/login");
        } catch (error) {
            console.error("Error creating user:", error);
            setError("Error creating user. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpenDrawer(newOpen);
    };

    return (
        <div>
            <MenuIconButton ariaLabel="open drawer" onClick={toggleDrawer(true)} />
            <DrawerComponent open={openDrawer} toggleDrawer={toggleDrawer} />
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {(formik) => (
                    <form className="AddLoan" onSubmit={formik.handleSubmit} noValidate>
                        <h1>Registration</h1>
                        {error && <p className="error">{error}</p>}
                        <TextField
                            required
                            id="username"
                            label="Username"
                            name="username"
                            value={formik.values.username || ""}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.username && Boolean(formik.errors.username)}
                            helperText={formik.touched.username && formik.errors.username}
                            sx={textFieldStyles}
                        />
                        <TextField
                            required
                            id="password"
                            label="Password"
                            name="password"
                            type="password"
                            value={formik.values.password || ""}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            sx={textFieldStyles}
                        />
                        <TextField
                            required
                            id="mail"
                            label="Email"
                            name="mail"
                            type="email"
                            value={formik.values.mail || ""}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.mail && Boolean(formik.errors.mail)}
                            helperText={formik.touched.mail && formik.errors.mail}
                            sx={textFieldStyles}
                        />
                        <TextField
                            required
                            id="name"
                            label="Name"
                            name="name"
                            value={formik.values.name || ""}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                            sx={textFieldStyles}
                        />
                        <Button
                            variant="outlined"
                            type="submit"
                            disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
                        >
                            Register
                        </Button>
                    </form>
                )}
            </Formik>
        </div>
    );
}

export default AddUser;
