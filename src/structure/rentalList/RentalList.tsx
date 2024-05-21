import './RentalList.css';
import DataTable from "react-data-table-component";
import {useState} from "react";


function RentalList() {

    const columns = [
        {
            name: "Rental ID",
            selector: (row: any) => row.id,
            sortable: true,
        },
        {
            name: "Book ID",
            selector: (row: any) => row.bookId,
            sortable: true,
        },
        {
            name: "User ID",
            selector: (row: any) => row.userId,
            sortable: true,
        },
        {
            name: "Date of Loan",
            selector: (row: any) => row.dateOfLoan,
            sortable: true,
        },
        {
            name: "Deadline of loan",
            selector: (row: any) => row.deadlineOfLoan,
            sortable: true,
        },
        {
            name: "Date of return",
            selector: (row: any) => row.dateOfReturn,
            sortable: true,
        },
    ];

    const loansData = [
        { id: 1, bookId: 3, userId: 101, dateOfLoan: "2024-03-01", deadlineOfLoan: "2024-05-01", dateOfReturn: "2024-04-15" },
        { id: 2, bookId: 5, userId: 102, dateOfLoan: "2024-02-20", deadlineOfLoan: "2024-04-20", dateOfReturn: "-" },
        { id: 3, bookId: 7, userId: 103, dateOfLoan: "2024-01-10", deadlineOfLoan: "2024-03-10", dateOfReturn: "2024-03-05" },
        { id: 4, bookId: 1, userId: 104, dateOfLoan: "2024-04-15", deadlineOfLoan: "2024-06-15", dateOfReturn: "-" },
        { id: 5, bookId: 8, userId: 105, dateOfLoan: "2024-03-30", deadlineOfLoan: "2024-05-30", dateOfReturn: "2024-05-25" },
        { id: 6, bookId: 2, userId: 106, dateOfLoan: "2024-02-05", deadlineOfLoan: "2024-04-05", dateOfReturn: "2024-03-30" },
        { id: 7, bookId: 9, userId: 107, dateOfLoan: "2024-01-25", deadlineOfLoan: "2024-03-25", dateOfReturn: "-" },
    ];

    const [data, setData] = useState(loansData);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchText = e.target.value.toLowerCase();
        const newRows = loansData.filter((row: any) => {
            const idValue = row.id.toString().includes(searchText);
            const bookIdValue = row.bookId.toLowerCase().includes(searchText);
            const userIdValue = row.userId.includes(searchText);

            return idValue || bookIdValue || userIdValue;
        });

        setData(newRows);
    };

    return (
        <form className="RentalList">
            <h1> List of ongoing rentals</h1>
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

export default RentalList;