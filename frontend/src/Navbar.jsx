import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
    const navigate = useNavigate();

    return (
      <nav className="navbar">
        <div className="nav-logo">💪 GymManager</div>
        <div className="nav-links">
          <button className="nav-item" onClick={() => navigate('/home')}>Home</button>
          <button className="nav-item" onClick={() => navigate('/editprofile')}>Edit Profile</button>
          <button className="nav-item logout" onClick={() => { localStorage.removeItem('user'); navigate('/login'); }}>Logout</button>
        </div>
      </nav>
    )
}

export default Navbar
