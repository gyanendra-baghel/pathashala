import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import Header from '../components/Header';
import Footer from '../components/Footer';


function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("/api/v1/users/login", {username, password});
      if(response.data.statusCode == 200) {
        console.log(response.data.user);
        setUser(response.data.user);
      }
      navigate("/");
    } catch (err) {
      console.log(err);
      setError('Invalid username or password');
    }
  }

  return (
    <>
    <Header/>
    <main className='screen-main center'>
      <div className='login'>
        <form action="" onSubmit={submitHandler}>
          <h1>Log in</h1>
          <label htmlFor="">username</label>
          <input type="text" onChange={(e)=>{ setUsername(e.target.value) }}/>
          <label htmlFor="">Password</label>
          <input type="password"  onChange={(e)=>{ setPassword(e.target.value) }}/>
          <button className='button'>
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </form>
        {error && <div className="error">{error}</div>}
      </div>
    </main>
    <Footer/>
    </>
  )
}

export default Login