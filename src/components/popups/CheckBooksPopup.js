import React, { useState, useEffect } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import axios from 'axios';

const CheckBooks = ({ show, handleClose }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3002/books/');
        setData(response.data);
      } catch (error) {
        alert(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Modal className="popup" show={show} onHide={handleClose} centered>
      <Modal.Header className="popup-title">
        <Modal.Title>Check Stock</Modal.Title>
      </Modal.Header>
      <Modal.Body className="popup-body">
        <BookTable data={data} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const BookTable = ({ data }) => {
  if (!data) {
    return <p>No books found</p>;
  }

  const headers = Object.keys(data[0]).slice(1, 7);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {headers.map((header) => (
              <td key={header}>{item[header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CheckBooks;
