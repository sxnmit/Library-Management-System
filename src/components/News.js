import Carousel from "react-multi-carousel";
import React from 'react';
import "react-multi-carousel/lib/styles.css";
import { Container, Col, Row } from 'react-bootstrap';
import news1 from "../assets/news1.jpeg";
import news2 from "../assets/news2.jpeg";


export const NewsCarousel = () => {
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
    <section className="news">
      <Container>
        <Row>
          <Col className = "column">
            <Carousel responsive={responsive} infinite={true} className="news-slider">
              <div className="item">
                <img src={news1} className="news1" alt="" />
              </div>
              <div className="item">
                <img src={news2} className="news2" alt="" />
              </div>
            </Carousel>
          </Col>
        </Row>
      </Container >
    </section >
  )


}

export default NewsCarousel;