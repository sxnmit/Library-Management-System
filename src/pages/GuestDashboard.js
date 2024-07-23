import React, { useState } from 'react';
import axios from 'axios';
import NavBar from '../components/Navbar';
import BookImage from '../components/Image';
import { Modal, Button } from 'react-bootstrap';

function GuestDashboard() {
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3002/books/search', {
        title_parameter: title,
        authors_parameter: authors,
        genre_parameter: genre,
        year_parameter: year,
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching for books', error);
    }
  };

  const handleAddToCart = (book) => {
    setCart((prevCart) => {
      const existingBook = prevCart.find((item) => item.book.id === book.id);
      if (existingBook) {
        return prevCart.map((item) =>
          item.book.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { book, quantity: 1 }];
      }
    });
  };

  const handleCartButtonClick = () => {
    setIsCartOpen(true);
  };

  const closeModal = () => {
    setIsCartOpen(false);
  };

  return (
    <div>
      <button className="cart-button" onClick={handleCartButtonClick}>
        Cart {cart.length > 0 && <span>({cart.reduce((acc, item) => acc + item.quantity, 0)})</span>}
      </button>
      <NavBar />
      <div className="guestdashboard-container">
        <form className="guestdashboard-search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Authors"
            value={authors}
            onChange={(e) => setAuthors(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
          <button type="submit">Search</button>
        </form>

        <div className="guestdashboard-results-container">
          {searchResults.length === 0 && <p>No books found</p>}
          {searchResults.map((book) => (
            <div className="guestdashboard-book-result" key={book.id}>
              <button className="add-to-cart" onClick={() => handleAddToCart(book)}>Add</button>
              <BookImage title={book.title} />
              <p>{book.title}</p>
              <p>{book.authors}</p>
              <p>{book.genre}</p>
              <p>{book.year}</p>
            </div>
          ))}
        </div>
      </div>

      <Modal
        show={isCartOpen}
        onHide={closeModal}
        centered
        className="cart-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Your Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cart.length === 0 ? (
            <p>No items in the cart.</p>
          ) : (
            <ul>
              {cart.map((item, index) => (
                <li key={index}>
                  {item.book.title} - {item.book.authors} ({item.quantity})
                </li>
              ))}
            </ul>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary">Hold Items</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default GuestDashboard;
