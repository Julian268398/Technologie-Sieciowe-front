import React from 'react';
import './App.css';
import LoginForm from "./structure/login/LoginForm";
import BookList from "./structure/bookList/BookList";
import {Route, Navigate, Routes, BrowserRouter} from 'react-router-dom';
import RentalList from "./structure/rentalList/RentalList";
import MainPage from "./structure/mainPage/MainPage";
import ApiProvider from "./api/ApiProvider";
import AddBook from "./structure/addBook/AddBook";
import AddLoan from "./structure/addLoan/AddLoan";
import AddUser from "./structure/addUser/AddUser";
import {I18nextProvider} from 'react-i18next';
import i18n from "./i18n";

function App() {
    const token = localStorage.getItem("token");
    return (
        <BrowserRouter>
            <I18nextProvider i18n={i18n}>
            <ApiProvider>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/bookList" element={token ? <BookList />: <Navigate to="/login" />} />
                    <Route path="/rentalList" element={token ? <RentalList />: <Navigate to="/login" />} />
                    <Route path="/mainPage" element={<MainPage />} />
                    <Route path="/addBook" element={token ? <AddBook />: <Navigate to="/login" />} />
                    <Route path="/addLoan" element={token ? <AddLoan />: <Navigate to="/login" />} />
                    <Route path="/addUser" element={<AddUser />} />
                </Routes>
            </ApiProvider>
            </I18nextProvider>
        </BrowserRouter>


    );
}

export default App;
