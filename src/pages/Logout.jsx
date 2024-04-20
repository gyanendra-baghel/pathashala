import React, { useContext, useEffect } from 'react'
import axios from "axios"
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom';

function Logout() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(()=> {
        setUser(null);
        try {
            const response = axios.post("/api/v1/users/logout");
            navigate("/login");
        } catch (err) {
            navigate("/login");
        }
    })
  return (
    <div>Logout</div>
  )
}

export default Logout