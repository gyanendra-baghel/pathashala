import React, { useContext, useEffect } from 'react'
import axios from "axios"
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom';

function Logout() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("/api/v1/users/logout");
        if (response.status == 200) {
          navigate("/login");
        }
      } catch (err) {
        navigate("/login");
      }
      setUser(null);
    }
    fetchData();
  })
  return (
    <div>Logout</div>
  )
}

export default Logout