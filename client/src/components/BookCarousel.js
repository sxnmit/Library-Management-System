import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Container, Col, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import BookImage from "./Image";
import axios from 'axios';

export const BookCarousel = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3002/books/recommended")
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);


  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };


  return (
    <section className="books_sellers">
      <Container>
        <Row>
          <Col>
            <div className="books-box">
              <Carousel responsive={responsive} infinite={true} className="book-slider">
                {
                  data.map((book) => (
                    <div>
                      <div className = "imageCover">
                        <BookImage key={book.id} title={book.title} />
                      </div>
                      <div className = "item">{book.title}</div>
                    </div>
                  ))
                }
              </Carousel>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default BookCarousel;
