import React from 'react';
import './App.css';
import LoginForm from "./structure/login/LoginForm";
import BookList from "./structure/bookList/BookList";
import { Route, Navigate, Routes } from 'react-router-dom';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/bookList" element={<BookList />} />
        </Routes>
    );
}

export default App;
