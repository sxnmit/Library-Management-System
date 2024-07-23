import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const RemoveBooks = ({ show, handleClose }) => {

  const [title, setTitle] = useState('')
  const [authors, setAuthors] = useState('')
  const [year, setYear] = useState('')
  const [copies, setCopies] = useState('')

  const removeBooks = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3002/books/remove", { title, authors, year, copies })
      console.log(title, authors, year, copies)
      setTitle('');
      setAuthors('');
      setYear('');
      setCopies('');

      alert('Book Removed successfully.');
    }
    catch (error) {
      console.log(error)
      alert("Unable to Remove book, check inputs.")
    }
  }
  return (
    <Modal className="popup" show={show} onHide={handleClose} centered>
      <Modal.Header className="popup-title" closeButton>
        <Modal.Title>Remove Books</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="popup-container">
          <form onSubmit={removeBooks} method="post">
            <label htmlFor="title">
              <p>Title</p>
              <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
            <label htmlFor="author">
              <p>Author</p>
              <input type="text" id="author" value={authors} onChange={(e) => setAuthors(e.target.value)} />
            </label>
            <label htmlFor="year">
              <p>Year of Publication</p>
              <input type="number" id="year" value={year} onChange={(e) => setYear(e.target.value)} />
            </label>
            <label htmlFor="copies">
              <p>Copies</p>
              <input type="number" id="copies" value={copies} onChange={(e) => setCopies(e.target.value)} />
            </label>
            <div>
              <button onClick={handleClose} className="submit" type="submit">Remove from Library</button>
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

export default RemoveBooks;
