// App.js
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Auth = () => {
    const { user } = useContext(UserContext);
    
    return user ? <Outlet/> :  <Navigate to="/login"/>
};

export default Auth;