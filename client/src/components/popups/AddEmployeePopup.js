import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const AddEmployee = ({ show, handleClose }) => {
  const [name, setName] = useState('')
  const [birthday, setBirthday] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userType, setUser] = useState('Employee')

  const addEmployee = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/register", { userType, email, password, account: { name, birthday, verified: true } })
      setName('');
      setBirthday('');
      setEmail('');
      setPassword('');
      setUser('');
    }
    catch (error) {
      alert("Unable to add employee, check inputs.")
    }
  }
  return (
    <Modal className="popup" show={show} onHide={handleClose}>
      <Modal.Header className="popup-title">
        <Modal.Title>Add Employees</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="popup-container">
          <form onSubmit={addEmployee} method="post">
            <label htmlFor="name">
              <p>Name</p>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label htmlFor="birthday">
              <p>Birthday</p>
              <input value={birthday} type="date" onChange={(e) => setBirthday(e.target.value)} />
            </label>
            <label htmlFor="email">
              <p>Email</p>
              <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label htmlFor="password">
              <p>Password</p>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <p>User Type</p>
            <select id="user" name="user" value={userType} onChange={(e) => setUser(e.target.value)}>
              <option value="Employee">Employee</option>
              <option value="Admin">Admin</option>
            </select>
            <div>
              <button onClick={handleClose} className="submit" type="submit">Add to Staff</button>
            </div>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEmployee;
