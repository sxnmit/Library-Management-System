import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const AddBooks = ({ show, handleClose }) => {

  const [title,setTitle] = useState('')
  const [authors, setAuthors] = useState('')
  const [genre, setGenre] = useState('')
  const [year, setYear] = useState('')
  const [copies, setCopies] = useState('')
  const [reviews, setReviews] = useState('')

  const addBooks = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3002/books/add", { title, authors, genre, year, copies, reviews })
      setTitle('');
      setAuthors('');
      setGenre('');
      setYear('');
      setCopies('');
      setReviews('');
    }
    catch (error) {
      alert("Unable to add book, check inputs.")
    }
  }
  return (
    <Modal className="popup" show={show} onHide={handleClose} centered>
      <Modal.Header className="popup-title" closeButton>
        <Modal.Title>Add Books</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="popup-container">
          <form onSubmit = {addBooks} method="post">
            <label htmlFor="title">
              <p>Title</p>
              <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
            <label htmlFor="author">
              <p>Author</p>
              <input type="text" id="author" value={authors} onChange={(e) => setAuthors(e.target.value)} />
            </label>
            <label htmlFor="genre">
              <p>Genre</p>
              <input type="text" id="genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
            </label>
            <label htmlFor="year">
              <p>Year of Publication</p>
              <input type="number" id="year" value={year} onChange={(e) => setYear(e.target.value)} />
            </label>
            <label htmlFor="copies">
              <p>Copies</p>
              <input type="number" id="copies" value={copies} onChange={(e) => setCopies(e.target.value)} />
            </label>
            <label htmlFor="reviews">
              <p>Reviews (0-10)</p>
              <input type="number" id="reviews" value={reviews} onChange={(e) => setReviews(e.target.value)} />
            </label>
            <div>
              <button className="submit" type="submit">Add to Library</button>
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

export default AddBooks;
