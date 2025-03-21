import React, { useState } from "react";
import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import profilePlaceholder from "../assets/profile-placeholder.png";
import styles from "../styles/NavBar.module.css";
import { useProfile } from "../contexts/ProfileContext";

const NavBar = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const { profile } = useProfile();
    const profileImage = profile?.image || profilePlaceholder;

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <Navbar className={styles.navBar} expand="md" fixed="top">
            <Container fluid className="d-flex justify-content-between align-items-center">
                <Navbar.Brand as={NavLink} to="/dashboard">
                    <img src={logo} alt="Logo" height="45" />
                </Navbar.Brand>

                <div className="d-flex align-items-center">
                    <Nav.Link as={NavLink} to="/mystacks" className="mr-3 mr-lg-5">
                        <i className="fa-solid fa-cubes-stacked"></i>My Stacks
                    </Nav.Link>
                    <Dropdown show={showDropdown} onToggle={setShowDropdown} alignRight>
                        <Dropdown.Toggle as="div" onClick={toggleDropdown} className={styles.toggle}>
                            <div className={styles.profileImage}>
                                <img
                                    src={profileImage}
                                    alt="Profile"
                                />
                            </div>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className={styles.dropdownMenu}>
                            <NavLink
                                to="/profile"
                                onClick={toggleDropdown}
                                className={styles.dropdownItem}
                                activeClassName={styles.activeDropdownItem}
                            >
                                My Profile
                            </NavLink>
                            <Dropdown.Divider />
                            <NavLink
                                to="/logout"
                                onClick={toggleDropdown}
                                className={styles.dropdownItem}
                                activeClassName={styles.activeDropdownItem}
                            >
                                Log out
                            </NavLink>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </Container>
        </Navbar>
    );
};


export default NavBar;