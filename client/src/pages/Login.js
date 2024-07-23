import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/login", { email, password })
      const token = response.data
      setEmail('');
      setPassword('');
      localStorage.setItem('token', token)
      navigate('/dashboard')
      window.location.reload()
    }
    catch (error) {
      console.log("Unable to login")
    }
  }
  return (
    <div className="loginContainer">
      <form onSubmit={handleLogin} method="post">
        <label htmlFor="email">
          <p>Email</p>
          <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label htmlFor="password">
          <p>Password</p>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <div>
          <button className="submit" type="submit">Log In</button>
          <ul className="switch">
            <li><Link to="/signup">Don't have an account?</Link></li>
          </ul>
        </div>
      </form>
    </div>
  )
}

export default Login