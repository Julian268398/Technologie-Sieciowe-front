import './BookList.css';
import DataTable from "react-data-table-component";
import {useEffect, useState} from "react";
import axios from "axios";

interface Book {
    id: number;
    title: string;
    isbn: string;
    author: string;
    availableCopies: number;
}

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

    const [data, setData] = useState<Book[]>([]);
    const [searchText, setSearchText] = useState("");


    useEffect(() => {
        axios.get('http://localhost:8080/book/getAll')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the data!", error);
            });
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchText = e.target.value.toLowerCase();
        setSearchText(searchText);
    };

    const filteredData = data.filter((row) => {
        const titleValue = row.title.toLowerCase().includes(searchText);
        const isbnValue = row.isbn.includes(searchText);
        const authorValue = row.author.toLowerCase().includes(searchText);

        return titleValue || isbnValue || authorValue;
    });

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
                data={filteredData}
                fixedHeader
                pagination
                selectableRows
            />
        </form>
    )
}

export default BookList