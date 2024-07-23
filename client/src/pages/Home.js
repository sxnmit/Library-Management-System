import React from 'react';
import '../App.css';
import NavBar from '../components/Navbar';
import BookCarousel from '../components/BookCarousel';
import NewsCarousel from '../components/News';

function Home() {
  return (
    <div className="Home">
      <NavBar />
      <div className="InfoCentre">
        <div className="FamousReads">
          <div className="BookSubtitle">Top Ten Books of the Year</div>
          <BookCarousel />
        </div>
        <div className="NewsCentre">
          <div className = "Title">Announcements</div>
          <NewsCarousel />
        </div>
      </div>
    </div >
  )
}

export default Home