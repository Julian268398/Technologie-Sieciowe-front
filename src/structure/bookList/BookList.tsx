import './BookList.css';
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import { useApi } from "../../api/ApiProvider";
import { useTranslation } from "react-i18next";
import MenuIconButton from "../drawer/MenuIconButton";
import DrawerComponent from "../drawer/DrawerComponent";

interface Book {
    id: number;
    title: string;
    isbn: string;
    author: string;
    availableCopies: number;
}

function BookList() {
    const { t } = useTranslation();
    const [openDrawer, setOpenDrawer] = useState(false);

    const columns = [
        {
            name: t('Book ID'),
            selector: (row: Book) => row.id,
            sortable: true,
        },
        {
            name: t('Title'),
            selector: (row: Book) => row.title,
            sortable: true,
        },
        {
            name: "Isbn",
            selector: (row: Book) => row.isbn,
            sortable: true,
        },
        {
            name: t('Author'),
            selector: (row: Book) => row.author,
            sortable: true,
        },
        {
            name: t('Available Copies'),
            selector: (row: Book) => row.availableCopies,
            sortable: true,
        },
    ];

    const [data, setData] = useState<Book[]>([]);
    const [searchText, setSearchText] = useState("");
    const apiClient = useApi();

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await apiClient.getBooks();
            if (response.success) {
                setData(response.data);
            } else {
                console.error("There was an error fetching the data!");
            }
        };

        fetchBooks();
    }, [apiClient]);

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

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpenDrawer(newOpen);
    };

    return (
        <div>
            <MenuIconButton ariaLabel="open drawer" onClick={toggleDrawer(true)} />
            <DrawerComponent open={openDrawer} toggleDrawer={toggleDrawer} />
            <form className="BookList">
                <h1>{t('List of Books')}</h1>
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

export default BookList;
