import React from 'react';
import './App.css';
import LoginForm from "./structure/login/LoginForm";
import BookList from "./structure/bookList/BookList";
import {Route, Navigate, Routes, BrowserRouter} from 'react-router-dom';
import RentalList from "./structure/rentalList/RentalList";
import MainPage from "./structure/mainPage/MainPage";
import ApiProvider from "./api/ApiProvider";
import AddBook from "./structure/addBook/AddBook";

function App() {
    return (
        <BrowserRouter>
            <ApiProvider>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/bookList" element={<BookList />} />
                    <Route path="/rentalList" element={<RentalList />} />
                    <Route path="/mainPage" element={<MainPage />} />
                    <Route path="/addBook" element={<AddBook />} />
                </Routes>
            </ApiProvider>
        </BrowserRouter>


    );
}

export default App;
