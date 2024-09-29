import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const Navigation: React.FC = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Study Mate</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#tasks">Tasks</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
