import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          FinPazar
        </Link>
        <div className="navbar-menu">
          {!user ? (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>
            </>
          ) : (
            <>
              <span className="nav-user">{user.firstName} ({user.role})</span>
              {user.role === 'admin' && (
                <Link to="/admin" className="nav-link">Admin Dashboard</Link>
              )}
              {user.role === 'customer' && (
                <Link to="/my-requests" className="nav-link">My Requests</Link>
              )}
              <button onClick={handleLogout} className="nav-link logout-btn">Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
