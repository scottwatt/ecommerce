import React, { useState } from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import CategoryMenu from "../CategoryMenu";
import Cart from "../Cart";
import { Navbar, Container, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./navbar.css"

function Navigation() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <Nav className="nav-right">
          <Nav.Link as={Link} to="/orderHistory">
            Order History
          </Nav.Link>
          <Nav.Link href="/" onClick={() => Auth.logout()}>
            Logout
          </Nav.Link>
        </Nav>
      );
    } else {
      return (
        <Nav className="nav-right login">
          <Nav.Link as={Link} to="/signup">
            Signup
          </Nav.Link>
          <Nav.Link as={Link} to="/login">
            Login
          </Nav.Link>
        </Nav>
      );
    }
  }

  return (
    <Navbar className="sticky" bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link to="/" className="text-decoration-none text-reset">
            Game Center
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="nav-left me-auto">
            <CategoryMenu />
          </Nav>
          {showNavigation()}
          <Cart />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
