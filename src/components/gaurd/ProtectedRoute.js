import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute(props) {
    if (localStorage.getItem('is_login') !== '1') {
        return <Navigate to='/' replace /> ; 
    }
    return <Outlet/> ;
}

export default ProtectedRoute;