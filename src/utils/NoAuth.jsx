// App.js
import React, { useContext, useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import axios from "axios";

const NoAuth = (props) => {
    const { user, setUser } = useContext(UserContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post("/api/v1/users/current");
                if (response.status == 200) {
                    setUser(response.data.user);
                }
            } catch (err) {
                console.log(err);
            }
            setLoading(false);
        }
        fetchData();
    }, []);

    if (loading) {
        return <div><h1>loading..</h1></div>
    }

    return user ? <Navigate to="/" /> : <>{props.children}</>
};

export default NoAuth;