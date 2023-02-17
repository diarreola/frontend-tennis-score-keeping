import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const MatchControlFooter = () => {
  return (
    <div>
    <Navbar fixed="bottom" bg="dark" variant="dark">
    <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <button>End Match</button>
            <button>Pause Match</button>
            <button>Stats</button>
          </Nav>
        </Navbar.Collapse>
      </Container>

    </Navbar>
    </div>
  )
}

export default MatchControlFooter