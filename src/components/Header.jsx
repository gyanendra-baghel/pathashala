import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import logo  from "../assets/logo.png"
import { UserContext } from '../context/UserContext'

function Header() {

  const {user} = useContext(UserContext);

  return (
    <header>
        <div className="container">
            <Link to="/" className="logo">
                <img src={logo}/>
                <p>EduTechIQ</p>
            </Link>
            <nav className="nav-links">
                <Link className='nav-link' to="/board">Board</Link>
                <Link className='nav-link' to="/ai">AI</Link>
                {/* <Link className='nav-link' to="/meeting">Meeting</Link> */}
                {!user && (
                  <>
                    <Link className='nav-link' to="/login">Login</Link>
                    <Link className='nav-link' to="/signup">Signup</Link>
                  </>
                )}
                {user && (
                  <>
                  {user.role == "Teacher" && (
                    <Link to="/create">Create</Link>
                  )}
                  <Link className='nav-link' to="/logout">Logout</Link>
                  </>
                )}
                
            </nav>
        </div>
    </header>
  )
}

export default Header