import React, { useState, useEffect } from 'react';
import axios from 'axios';
import noImage from "../assets/no-image.png";
import loadingGIF from "../assets/loadingGIF.gif";

function BookImage({ title }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true); // Set loading state to true when fetching starts
    setError(false); // Reset error state
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${title}&maxResults=1&key=AIzaSyBcHFHVa7S7nF29SWVVNRweeFbU3HKLjQY`);
        const imageLinks = response.data.items[0]?.volumeInfo.imageLinks;
        if (imageLinks && imageLinks.smallThumbnail) {
          setImageUrl(imageLinks.smallThumbnail);
        } else {
          setImageUrl(null);
        }
        setLoading(false); // Set loading state to false after fetching completes
      } catch (error) {
        console.error('Error fetching image:', error);
        setImageUrl(null);
        setError(true); // Set error state to true
        setLoading(false); // Set loading state to false after fetching completes
      }
    };

    fetchData();
  }, [title]); // useEffect will re-run whenever `title` prop changes

  if (loading) {
    return <img src={loadingGIF} alt="Loading..." />;
  }

  if (error) {
    return <img src={noImage} alt="Error" />;
  }

  return (
    <div>
      {imageUrl ? (
        <img src={imageUrl} alt="Book Cover" />
      ) : (
        <img src={noImage} alt="No Image" />
      )}
    </div>
  );
}

export default BookImage;
