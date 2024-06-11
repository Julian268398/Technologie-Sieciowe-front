import './RentalList.css';
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import { useApi } from "../../api/ApiProvider";
import { useTranslation } from "react-i18next";
import MenuIconButton from "../Drawer/MenuIconButton";
import DrawerComponent from "../Drawer/DrawerComponent";

interface Loan {
    id: number;
    book: number;
    user: number;
    dateOfLoan: Date;
    deadlineOfLoan: Date;
    dateOfReturn?: Date;
}

function RentalList() {
    const { t } = useTranslation();
    const [openDrawer, setOpenDrawer] = useState(false);

    const columns = [
        {
            name: "Rental ID",
            selector: (row: Loan) => row.id ? row.id.toString() : '',
            sortable: true,
        },
        {
            name: "Book ID",
            selector: (row: Loan) => row.book ? row.book.toString() : '',
            sortable: true,
        },
        {
            name: "User ID",
            selector: (row: Loan) => row.user ? row.user.toString() : '',
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
    const apiClient = useApi();

    useEffect(() => {
        const fetchLoans = async () => {
            const response = await apiClient.getLoans();
            if (response.success) {
                setData(response.data);
            } else {
                console.error("There was an error fetching the data!");
            }
        };

        fetchLoans();
    }, [apiClient]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchText = e.target.value.toLowerCase();
        setSearchText(searchText);
    };

    const filteredData = data.filter((row) => {
        const idValue = row.id ? row.id.toString().includes(searchText) : false;
        const bookIdValue = row.book ? row.book.toString().includes(searchText) : false;
        const userIdValue = row.user ? row.user.toString().includes(searchText) : false;

        return idValue || bookIdValue || userIdValue;
    });

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpenDrawer(newOpen);
    };

    return (
        <div>
            <MenuIconButton ariaLabel="open drawer" onClick={toggleDrawer(true)} />
            <DrawerComponent open={openDrawer} toggleDrawer={toggleDrawer} />
            <form className="RentalList">
                <h1>{t('List of ongoing rentals')}</h1>
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
        </div>
    )
}

export default RentalList;
