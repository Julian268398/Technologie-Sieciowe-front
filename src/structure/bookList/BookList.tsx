import './BookList.css';
import DataTable from "react-data-table-component";
import { useState } from "react";

function BookList() {
    const columns = [
        {
            name: "Book ID",
            selector: (row: any) => row.id,
            sortable: true,
        },
        {
            name: "Title",
            selector: (row: any) => row.title,
            sortable: true,
        },
        {
            name: "Isbn",
            selector: (row: any) => row.isbn,
            sortable: true,
        },
        {
            name: "Author",
            selector: (row: any) => row.author,
            sortable: true,
        },
        {
            name: "Available Copies",
            selector: (row: any) => row.availableCopies,
            sortable: true,
        },
    ];

    const initialData = [
        { id: 1, title: "Book 1", isbn: "123456789", author: "Author 1", availableCopies: 5 },
        { id: 2, title: "Book 2", isbn: "987654321", author: "Author 2", availableCopies: 3 },
        { id: 3, title: "Book 3", isbn: "456789123", author: "Author 3", availableCopies: 8 },
        { id: 4, title: "Book 4", isbn: "789123456", author: "Author 4", availableCopies: 10 },
        { id: 5, title: "Book 5", isbn: "321654987", author: "Author 5", availableCopies: 2 },
        { id: 6, title: "Book 6", isbn: "654987321", author: "Author 6", availableCopies: 7 },
        { id: 7, title: "Book 7", isbn: "987321654", author: "Author 7", availableCopies: 4 },
        { id: 8, title: "Book 8", isbn: "321987654", author: "Author 8", availableCopies: 6 },
        { id: 9, title: "Book 9", isbn: "654321987", author: "Author 9", availableCopies: 9 },
        { id: 10, title: "Book 10", isbn: "789654123", author: "Author 10", availableCopies: 12 },
        { id: 11, title: "Book 11", isbn: "456123789", author: "Author 11", availableCopies: 3 },
        { id: 12, title: "Book 12", isbn: "987456321", author: "Author 12", availableCopies: 15 },
        { id: 13, title: "Book 13", isbn: "321789654", author: "Author 13", availableCopies: 20 }
    ];

    const [data, setData] = useState(initialData);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchText = e.target.value.toLowerCase();
        const newRows = initialData.filter((row: any) => {
            const idValue = row.id.toString().includes(searchText);
            const titleValue = row.title.toLowerCase().includes(searchText);
            const isbnValue = row.isbn.includes(searchText);
            const authorValue = row.author.toLowerCase().includes(searchText);
            const availableCopiesValue = row.availableCopies.toString().includes(searchText);

            return idValue || titleValue || isbnValue || authorValue || availableCopiesValue;
        });

        setData(newRows);
    };


    return (
        <form className="BookList">
            <h1>List of Books</h1>
            <div className="input-group mb-3">
                <input
                    type="search"
                    className="form-control border ps-3"
                    placeholder="Search"
                    onChange={handleSearch}
                />
            </div>
            <DataTable
                columns={columns}
                data={data}
                fixedHeader
                pagination
                selectableRows
            />
        </form>
    )
}

export default BookList;
