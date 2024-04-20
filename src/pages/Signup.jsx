import React, { useContext, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

function Signup() {
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState("Student");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:8080/api/v1/users/signup', {
        fullname,
        email,
        username,
        password,
        role 
      });
      console.log(response.data);
      if(response.data.statusCode == 200) {
        console.log(response.data.user);
        setUser(response.data.user);
        navigate("/login");
      }
      // Handle successful signup, e.g., redirect user to dashboard
    } catch (err) {
      console.error(err);
      setError('Failed to sign up. Please try again.');
    }
    setLoading(false);
  };

  return (
    <>
      <Header />
      <div className="screen-main center">
        <div className="login">
          <form onSubmit={handleSubmit}>
            <h1>Signup</h1>
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              value={fullname}
              onChange={(e) => setFullName(e.target.value)}
            />
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="role">Password</label>
            <select id="role" value={role} onChange={(e) => { setRole(e.target.value)}}>
              <option>Student</option>
              <option>Teacher</option>
            </select>
            {error && <div className="error">{error}</div>}
            <button className="button" type="submit" disabled={loading}>
              {loading ? 'Signing up...' : 'Sign up'}
            </button>
            <p>If you alraedy have account the <Link to="/login">Login</Link></p>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Signup;