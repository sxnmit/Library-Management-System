import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

const NavBar = () => {
  const SignedIn = !!localStorage.getItem('token')
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token')
    navigate('/')
    alert('You have been signed out.')
  }
  return (
    <nav className="navbar-custom">
      <div className="navbar-logo">
        <Link to="/">My Library</Link>
      </div>
      <div className="navbar-buttons">
        {SignedIn ? (
          <>
            <Link to='/dashboard' className="navbar-link">Dashboard</Link>
            <button className="btn-signout" onClick={handleSignOut}>Sign Out</button>
          </>
        ) : (
          <>
            <Link to='/login' className="navbar-link">Login</Link>
            <Link to='/signup' className="navbar-link">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
