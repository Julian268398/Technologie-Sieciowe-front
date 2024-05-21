import React from 'react';
import './App.css';
import LoginForm from "./structure/login/LoginForm";
import BookList from "./structure/bookList/BookList";
import { Route, Navigate, Routes } from 'react-router-dom';
import RentalList from "./structure/rentalList/RentalList";
import MainPage from "./structure/mainPage/MainPage";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/bookList" element={<BookList />} />
            <Route path="/rentalList" element={<RentalList />} />
            <Route path="/mainPage" element={<MainPage />} />
        </Routes>
    );
}

export default App;
