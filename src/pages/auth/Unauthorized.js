import React from "react";
import { Link } from "react-router-dom";

import formStyles from "../../styles/Form.module.css";
import { Container } from "react-bootstrap";

const Unauthorized = () => {
    return (
        <Container className={formStyles.formContainer}>
            <div className={formStyles.formWrapper}>
                <h3>Oops, something went wrong!</h3>
                <div className={formStyles.signUpText}>
                    Please log in to access this page!
                    <Link to="/signin">Log in here</Link>
                </div>
            </div>
        </Container>
    );
};

export default Unauthorized;