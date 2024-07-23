import React, { useState, useEffect } from 'react';
import NavBar from '../components/Navbar';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { Table, Card, Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import AddBooksPopup from '../components/popups/AddBooksPopup';
import RemoveBooksPopup from '../components/popups/RemoveBooksPopup';
import CheckBooksPopup from '../components/popups/CheckBooksPopup';
import AddEmployeePopup from '../components/popups/AddEmployeePopup';
import RemoveEmployeePopup from '../components/popups/RemoveEmployeePopup';

Chart.register(...registerables);

const chartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Sales',
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(75,192,192,0.6)',
      hoverBorderColor: 'rgba(75,192,192,1)',
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

function Dashboard() {
  const [PopupType, setPopupType] = useState('');
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();

  const calculateAge = (birthday) => {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Adjust age if the birthday hasn't occurred yet this year
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/register'); // Replace with your API endpoint
        const users = response.data.users;
        const transformedData = users.map((user, index) => ({
          id: index + 1,
          name: user.account.name,
          age: user.account.birthday ? calculateAge(user.account.birthday) : 'N/A',
          job: user.userType
        }));

        setTableData(transformedData);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  const guestMode = (event) => {
    event.preventDefault();
    navigate("/guest-mode");
  };

  const handleShowPopup = (type) => {
    setPopupType(type);
  };

  const handleClosePopup = () => {
    setPopupType('');
  };

  return (
    <div>
      <NavBar />
      <div className="dashboard">
        <header className="dashboard-header">
          Admin Dashboard
        </header>
        <div className="main">
          <div className="dashboard-content">
            <Container>
              <Row className="row">
                <Col>
                  <Card className="card-custom">
                    <Card.Body>
                      <Card.Title className="card-title-custom">Sales Chart</Card.Title>
                      <div className="small-chart">
                        <div>
                          <Bar data={chartData} />
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card className="card-custom">
                    <Card.Body>
                      <Card.Title className="card-title-custom">Employees</Card.Title>
                      <div className="small-table">
                        <Table striped bordered hover size="sm">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Name</th>
                              <th>Age</th>
                              <th>Job</th>
                            </tr>
                          </thead>
                          <tbody>
                            {tableData.slice(0, 6).map((employee) => (
                              <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.name}</td>
                                <td>{employee.age}</td>
                                <td>{employee.job}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card className="card-custom">
                    <Card.Title className="card-title-custom-widgets">Manage Stock</Card.Title>
                    <div className="library-management">
                      <Button className="button" onClick={() => handleShowPopup('AddBooks')}>Add Books</Button>
                      <Button className="button" onClick={() => handleShowPopup('RemoveBooks')}>Remove Books</Button>
                      <Button className="button" onClick={() => handleShowPopup('CheckBooks')}>Check Books</Button>
                    </div>
                  </Card>
                </Col>
                <Col>
                  <Card className="card-custom">
                    <Card.Title className="card-title-custom-widgets">Manage Staff</Card.Title>
                    <div className="staff-management">
                      <Button className="button" onClick={() => handleShowPopup('AddEmployee')}>Add Employee</Button>
                      <Button className="button" onClick={() => handleShowPopup('RemoveEmployee')}>Remove Employee</Button>
                      <Button className="button" onClick={guestMode}>Guest Mode</Button>
                    </div>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
        <footer className="dashboard-footer">
          © 2024 Your Library. All rights reserved.
        </footer>
      </div>
      <AddBooksPopup show={PopupType === 'AddBooks'} handleClose={handleClosePopup} />
      <RemoveBooksPopup show={PopupType === 'RemoveBooks'} handleClose={handleClosePopup} />
      <CheckBooksPopup show={PopupType === 'CheckBooks'} handleClose={handleClosePopup} />
      <AddEmployeePopup show={PopupType === 'AddEmployee'} handleClose={handleClosePopup} />
      <RemoveEmployeePopup show={PopupType === 'RemoveEmployee'} handleClose={handleClosePopup} />
    </div>
  );
}

export default Dashboard;
