import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const UserNavbar = ({user, onHandleLogout}) => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">TennisPal</Navbar.Brand>
        <Navbar.Collapse className="justify-content-center">
            <Navbar.Text>
              Signed in as: {user.email}
            </Navbar.Text>
          </Navbar.Collapse>
        <Nav className="me-auto">
          <Nav.Link onClick={onHandleLogout}>logout</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default UserNavbar;