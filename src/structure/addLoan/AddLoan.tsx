import { Button, TextField, Snackbar, Alert } from "@mui/material";
import { Formik, FormikHelpers } from "formik";
import { useState } from "react";
import * as yup from "yup";
import axios from "axios";
import './AddLoan.css';
import { useTranslation } from "react-i18next";
import MenuIconButton from "../drawer/MenuIconButton";
import DrawerComponent from "../drawer/DrawerComponent";

interface addLoanValues {
    bookId: number | null;
    userId: number | null;
    dateOfLoan: string;
    deadlineOfLoan: string;
    dateOfReturn: string;
}

function AddLoan() {
    const { t } = useTranslation();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);

    const initialValues: addLoanValues = {
        bookId: null,
        userId: null,
        dateOfLoan: "",
        deadlineOfLoan: "",
        dateOfReturn: ""
    };

    const validationSchema = yup.object().shape({
        bookId: yup
            .number()
            .typeError("Must be a number")
            .required("Required"),
        userId: yup
            .number()
            .typeError("Must be a number")
            .required("Required"),
        dateOfLoan: yup.string().required("Required"),
        deadlineOfLoan: yup.string().required("Required"),
        dateOfReturn: yup.string().notRequired(),
    });

    const textFieldStyles = {
        '& label.Mui-focused': {
            color: 'white',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'white',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'white',
            },
            '&:hover fieldset': {
                borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'white',
            },
            '& input': {
                color: 'white',
            },
        },
        '& .MuiInputLabel-root': {
            color: 'white',
        },
    };

    const handleSubmit = async (values: addLoanValues, { setSubmitting, resetForm }: FormikHelpers<addLoanValues>) => {
        try {
            const response = await axios.post(
                "http://localhost:8080/loan/create",
                {
                    bookId: values.bookId,
                    userId: values.userId,
                    dateOfLoan: values.dateOfLoan,
                    deadlineOfLoan: values.deadlineOfLoan,
                    dateOfReturn: values.dateOfReturn
                }
            );

            console.log('Loan created successfully:', response.data);
            setError("");
            setSuccess("Loan created successfully");
            setOpenSnackbar(true);
            resetForm();
        } catch (error) {
            console.error("Error creating loan:", error);
            setError("Error creating loan. Please try again.");
            setOpenSnackbar(true);
        } finally {
            setSubmitting(false);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
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
                        <h1>{t('Here You can add a loan to the database')}</h1>
                        {error && <p className="error">{error}</p>}
                        <div className="FillIn1">
                            <TextField
                                required
                                id="bookId"
                                label={t('Book ID')}
                                name="bookId"
                                placeholder="Enter book ID"
                                value={formik.values.bookId || ""}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.bookId && Boolean(formik.errors.bookId)}
                                helperText={formik.touched.bookId && formik.errors.bookId}
                                sx={textFieldStyles}
                            />
                            <TextField
                                required
                                id="userId"
                                label={t('User ID')}
                                name="userId"
                                placeholder="Enter user ID"
                                value={formik.values.userId || ""}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.userId && Boolean(formik.errors.userId)}
                                helperText={formik.touched.userId && formik.errors.userId}
                                sx={textFieldStyles}
                            />
                        </div>
                        <div className="FillIn2">
                            <TextField
                                required
                                id="dateOfLoan"
                                label={t('Date of Loan')}
                                placeholder="Enter date (dd-mm-yyyy)"
                                value={formik.values.dateOfLoan}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.dateOfLoan && Boolean(formik.errors.dateOfLoan)}
                                helperText={formik.touched.dateOfLoan && formik.errors.dateOfLoan}
                                sx={textFieldStyles}
                            />
                            <TextField
                                required
                                id="deadlineOfLoan"
                                label={t('Deadline of Loan')}
                                placeholder="Enter date (dd-mm-yyyy)"
                                value={formik.values.deadlineOfLoan}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.deadlineOfLoan && Boolean(formik.errors.deadlineOfLoan)}
                                helperText={formik.touched.deadlineOfLoan && formik.errors.deadlineOfLoan}
                                sx={textFieldStyles}
                            />
                        </div>
                        <Button
                            variant="outlined"
                            type="submit"
                            disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
                        >
                            {t('Add Loan')}
                        </Button>
                    </form>
                )}
            </Formik>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                {error ? (
                    <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                        {error}
                    </Alert>
                ) : (
                    <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                        {success}
                    </Alert>
                )}
            </Snackbar>
        </div>
    );
}

export default AddLoan;
