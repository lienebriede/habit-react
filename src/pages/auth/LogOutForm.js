import React, { useState } from "react";

import formStyles from "../../styles/Form.module.css";
import btnStyles from "../../styles/Button.module.css";
import { Alert, Button, Container } from "react-bootstrap";

import axios from "axios";

function LogOutForm() {
    const [errors, setErrors] = useState(null);

    const handleLogout = async () => {
        try {
            await axios.post("https://habit-by-bit-django-afc312512795.herokuapp.com/dj-rest-auth/logout/");
            localStorage.removeItem("token");
            window.location.href = "/signin";
        } catch (err) {
            setErrors(err.response?.data);
        }
    };

    return (
        <Container className={formStyles.formContainer}>
            <div className={formStyles.formWrapper}>
                <h1>Log out</h1>
                <p className={`text-center ${formStyles.logoutMessage}`}>Are you sure you want to log out?</p>

                {errors && (
                    <Alert variant="warning">
                        {errors.non_field_errors || "Something went wrong. Please try again."}
                    </Alert>
                )}

                <Button
                    className={`${btnStyles.mainBtn} ${btnStyles.largeBtn} ${btnStyles.btnOrange}`}
                    onClick={handleLogout}>
                    Log Out
                </Button>
            </div>
        </Container>
    );
}

export default LogOutForm;