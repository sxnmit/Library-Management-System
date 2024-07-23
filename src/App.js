import './App.css';
import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import GuestDashboard from "./pages/GuestDashboard";
import Signup from "./pages/Signup";
import { useState, useEffect } from "react";

const decodeToken = (token) => {
  if (!token) return null;

  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decodedData = JSON.parse(atob(base64));
    return decodedData;
  } catch (error) {
    console.error('Error decoding token:', error.message);
    return null;
  }
};

function App() {
  const [isAdminSignedIn, setIsAdminSignedIn] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken && (decodedToken.userType === 'Admin' || decodedToken.userType==="Employee")) {
        setIsAdminSignedIn(true);
      }
    }
  }, []);

  return (
    <div className="App">
      <header>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {isSignedIn && (
              <>
                {isAdminSignedIn ? (
                  <Route path="/dashboard" element={<Dashboard />} />
                ) : (
                  <Route path="/dashboard" element={<GuestDashboard />} />
                )}
              </>
            )}
            {isAdminSignedIn && <Route path = "/guest-mode" element = {<GuestDashboard/>}/>}
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
