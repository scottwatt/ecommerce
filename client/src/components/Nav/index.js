import React, { useState } from "react";
import Auth from "../../utils/auth";
import { Link, useNavigate } from "react-router-dom";
import CategoryMenu from "../CategoryMenu";
import { Navbar, Container, Nav as NavLink} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./navbar.css"


function Navigation() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/orderHistory">
              Order History
            </Link>
          </li>
          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/signup">
              Signup
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/login">
              Login
            </Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link to="/" className="text-decoration-none text-reset">
            Game Center
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <NavLink className="me-auto">
            <CategoryMenu />
          </NavLink>
          <NavLink>{showNavigation()}</NavLink>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
