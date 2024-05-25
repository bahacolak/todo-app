import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import TodoList from './pages/TodoList';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const setTokenAndLocalStorage = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setToken={setTokenAndLocalStorage} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/todos" element={token ? <TodoList token={token} /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
