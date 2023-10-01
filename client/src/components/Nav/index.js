import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import CategoryMenu from "../CategoryMenu";
import Cart from "../Cart";
import { Navbar, Container, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./navbar.css";

// Import necessary context and actions
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_CURRENT_CATEGORY } from '../../utils/actions';

function Navigation() {
  // Get the dispatch function from the global state
  const [, dispatch] = useStoreContext();

  // Function to handle the title click
  const handleTitleClick = () => {
    // Reset the current category
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: ""
    });
  }

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
          {/* Call the handleTitleClick function on clicking the title */}
          <Link to="/" className="text-decoration-none text-reset" onClick={handleTitleClick}>
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

