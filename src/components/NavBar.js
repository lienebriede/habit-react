import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        <Navbar bg="light" expand="md" fixed="top">
            <Container>
                <NavLink to="/" className="navbar-brand">
                    Habit by Bit
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link as={NavLink} exact to="/">
                            Home
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/signin">
                            Sign in
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/signup">
                            Sign up
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;