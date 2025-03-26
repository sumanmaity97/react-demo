import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import './App.css'
import Login from './screens/Login';
import Home from './screens/Home';
import Register from './screens/Register';
import PrivateRoute from './utils/PrivateRoute';

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate replace to="/login" />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Register />} />
                    <Route path="/home" element={<PrivateRoute Component={Home}/>} />
                </Routes>
            </Router>
            <ToastContainer />
        </>
    )
}

export default App
