import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchUsers();
  }, [])

  const fetchUsers = () => {
    axios
      .get('http://localhost:3001/register')
      .then((res) => {
        console.log(res.data)
      })
  }


  const handleSignup = (event) => {
    event.preventDefault();
    try {
      axios
        .post('http://localhost:3001/register', { userType: "General", email, password, account: { name, verified: false } })
        .then((res) => {
          setEmail('')
          setPassword('')
          setName('')
          fetchUsers()
          navigate('/login')
        })
    }
    catch (error) {
      console.log("Unable to register user")
    }

  }
  return (
    <div className="signupContainer">
      <form onSubmit={handleSignup} method="post">
        <label htmlFor="password">
          <p>Name</p>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label htmlFor="email">
          <p>Email</p>
          <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label htmlFor="password">
          <p>Password</p>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
          <ul className="switch">
            <li><Link to="/login">Already have an account?</Link></li>
          </ul>
        </div>
      </form>
    </div>
  )
}

export default Signup