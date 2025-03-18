import React from 'react'
import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';



function NavbarComp() {
  return (
    <div>
        <Navbar  bg = "dark" variant = {"dark"} expand="lg" >
    <Container>
      {/* <Navbar.Brand href="http://localhost:5173/">
      </Navbar.Brand> */}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
        <Nav.Link href="/login">Login</Nav.Link>
        <Nav.Link href="/register">Register</Nav.Link>
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/logoutt">Logout</Nav.Link>

        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  </div>
  )
}

export default NavbarComp;