import {Button, TextField} from "@mui/material";

function AddBook() {


    return(
        <div className="AddBook">
            <h1>Here You can add book to database</h1>
            <TextField
                required
                id="outlined-required"
                label="Required"
                defaultValue="Type in book isbn"
            />
            <TextField
                required
                id="outlined-required"
                label="Required"
                defaultValue="Type in book title"
            />
            <TextField
                required
                id="outlined-required"
                label="Required"
                defaultValue="Type in book author"
            />
            <TextField
                required
                id="outlined-required"
                label="Required"
                defaultValue="Type in publisher"
            />
            <TextField
                required
                id="outlined-required"
                label="Required"
                defaultValue="Type in year of publish"
            />
            <TextField
                required
                id="outlined-required"
                label="Required"
                defaultValue="available copies"
            />

                <Button variant="outlined">Add Book</Button>
        </div>
    )
}

export default AddBook;