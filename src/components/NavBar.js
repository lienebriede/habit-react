import React, { useState } from "react";
import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import profilePlaceholder from "../assets/profile-placeholder.png";

const NavBar = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <Navbar bg="white" expand="md" fixed="top" className="px-3 shadow-sm">
            <Container fluid className="d-flex justify-content-between align-items-center">
                <Navbar.Brand as={NavLink} to="/">
                    <img src={logo} alt="Logo" height="45" />
                </Navbar.Brand>

                <div className="d-flex align-items-center">
                    <Nav.Link as={NavLink} to="/mystacks" className="mr-4">My Stacks</Nav.Link>
                    <Dropdown show={showDropdown} onToggle={setShowDropdown} alignRight>
                        <Dropdown.Toggle as="div" onClick={toggleDropdown} className="profile-placeholder-container">
                            <img
                                src={profilePlaceholder}
                                alt="Profile"
                                height="45"
                                style={{ cursor: 'pointer' }}
                            />
                        </Dropdown.Toggle>
                        <Dropdown.Menu
                            className="dropdown-menu-right p-3 border-0 shadow"
                            style={{ minWidth: "150px", position: "absolute", right: 0, top: "100%", zIndex: 1000 }}>
                            <Dropdown.Item as={NavLink} to="/profile" onClick={toggleDropdown}>My Profile</Dropdown.Item>
                            <Dropdown.Item as={NavLink} to="/signup" onClick={toggleDropdown}>Register</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item as={NavLink} to="/logout" onClick={toggleDropdown}>Log Out</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </Container>
        </Navbar>
    );
};


export default NavBar;