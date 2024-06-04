import './RentalList.css';
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import axios from "axios";

interface Loan {
    id: number;
    bookId: number;
    userId: number;
    dateOfLoan: Date;
    deadlineOfLoan: Date;
    dateOfReturn?: Date;
}

function RentalList() {
    const columns = [
        {
            name: "Rental ID",
            selector: (row: Loan) => row.id ? row.id.toString() : '',
            sortable: true,
        },
        {
            name: "Book ID",
            selector: (row: Loan) => row.bookId ? row.bookId.toString() : '',
            sortable: true,
        },
        {
            name: "User ID",
            selector: (row: Loan) => row.userId ? row.userId.toString() : '',
            sortable: true,
        },
        {
            name: "Date of Loan",
            selector: (row: Loan) => row.dateOfLoan ? row.dateOfLoan.toString() : '',
            sortable: true,
        },
        {
            name: "Deadline of Loan",
            selector: (row: Loan) => row.deadlineOfLoan ? row.deadlineOfLoan.toString() : '',
            sortable: true,
        },
        {
            name: "Date of Return",
            selector: (row: Loan) => row.dateOfReturn ? row.dateOfReturn.toString() : 'Not returned yet',
            sortable: true,
        },
    ];

    const [data, setData] = useState<Loan[]>([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        axios.get('http://localhost:8080/loan/getAll')
            .then(response => {
                setData(response.data);
                console.log(response.data);
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
        const idValue = row.id ? row.id.toString().includes(searchText) : false;
        const bookIdValue = row.bookId ? row.bookId.toString().includes(searchText) : false;
        const userIdValue = row.userId ? row.userId.toString().includes(searchText) : false;

        return idValue || bookIdValue || userIdValue;
    });

    return (
        <form className="RentalList">
            <h1>List of ongoing rentals</h1>
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

export default RentalList;
