import { Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import './AddBook.css';

const AddBook = () => {
    const initialValues = {
        isbn: "",
        title: "",
        author: "",
        publisher: "",
        yearOfPublish: "",
        availableCopies: "",
    };

    const validationSchema = yup.object().shape({
        isbn: yup.string().required("Required").typeError("Must be a number"),
        title: yup.string().required("Required"),
        author: yup.string().required("Required"),
        publisher: yup.string().required("Required"),
        yearOfPublish: yup
            .number()
            .typeError("Must be a number")
            .required("Required")
            .max(4, 'It has to be year a full year')
            .min(3, 'It has to be year a full year'),
        availableCopies: yup
            .number()
            .typeError("Must be a number")
            .required("Required"),
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

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => {

            }}
        >
            {(formik) => (
                <form className="AddBook" onSubmit={formik.handleSubmit} noValidate>
                    <h1>Here You can add book to database</h1>
                    <div className="FillIn1">
                        <TextField
                            required
                            id="isbn"
                            label="Isbn"
                            name="isbn"
                            value={formik.values.isbn}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.isbn && Boolean(formik.errors.isbn)}
                            helperText={formik.touched.isbn && formik.errors.isbn}
                            sx={textFieldStyles}
                        />
                        <TextField
                            required
                            id="title"
                            label="Title"
                            name="title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.title && Boolean(formik.errors.title)}
                            helperText={formik.touched.title && formik.errors.title}
                            sx={textFieldStyles}
                        />
                    </div>
                    <div className="FillIn2">
                        <TextField
                            required
                            id="author"
                            label="Author"
                            name="author"
                            value={formik.values.author}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.author && Boolean(formik.errors.author)}
                            helperText={formik.touched.author && formik.errors.author}
                            sx={textFieldStyles}
                        />
                        <TextField
                            required
                            id="publisher"
                            label="Publisher"
                            name="publisher"
                            value={formik.values.publisher}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.publisher && Boolean(formik.errors.publisher)}
                            helperText={formik.touched.publisher && formik.errors.publisher}
                            sx={textFieldStyles}
                        />
                    </div>
                    <div className="FillIn3">
                        <TextField
                            required
                            id="yearOfPublish"
                            label="Year of publish"
                            name="yearOfPublish"
                            value={formik.values.yearOfPublish}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.yearOfPublish && Boolean(formik.errors.yearOfPublish)}
                            helperText={formik.touched.yearOfPublish && formik.errors.yearOfPublish}
                            sx={textFieldStyles}
                        />
                        <TextField
                            required
                            id="availableCopies"
                            label="Available Copies"
                            name="availableCopies"
                            value={formik.values.availableCopies}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.availableCopies && Boolean(formik.errors.availableCopies)}
                            helperText={formik.touched.availableCopies && formik.errors.availableCopies}
                            sx={textFieldStyles}
                        />
                    </div>
                    <Button
                        variant="outlined"
                        type="submit"
                        disabled={!formik.isValid || !formik.dirty}
                    >
                        Add Book
                    </Button>
                </form>
            )}
        </Formik>
    );
};

export default AddBook;