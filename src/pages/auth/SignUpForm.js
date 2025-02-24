import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import formStyles from "../../styles/Form.module.css";
import btnStyles from "../../styles/Button.module.css";
import { Form, Alert, Button, Container } from "react-bootstrap";

import axios from "axios";

const SignUpForm = () => {
    const [signUpData, setSignUpData] = useState({
        username: "",
        password1: "",
        password2: "",
    });
    const { username, password1, password2 } = signUpData;

    const [errors, setErrors] = useState({});
    const history = useHistory();

    const handleChange = (event) => {
        setSignUpData({
            ...signUpData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("https://habit-by-bit-django-afc312512795.herokuapp.com/dj-rest-auth/registration/", signUpData);
            history.push("/signin");
        } catch (err) {
            setErrors(err.response?.data);
        }
    };

    return (
        <Container className={formStyles.formContainer}>
            <div className={formStyles.formWrapper}>
                <h1>Sign up</h1>

                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="username" className={formStyles.formControl}>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Username"
                            name="username"
                            value={username}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    {errors.username?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>
                            {message}
                        </Alert>
                    ))}

                    <Form.Group controlId="password1" className={formStyles.formControl}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            name="password1"
                            value={password1}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    {errors.password1?.map((message, idx) => (
                        <Alert key={idx} variant="warning">
                            {message}
                        </Alert>
                    ))}

                    <Form.Group controlId="password2" className={formStyles.formControl}>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            name="password2"
                            value={password2}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    {errors.password2?.map((message, idx) => (
                        <Alert key={idx} variant="warning">
                            {message}
                        </Alert>
                    ))}

                    <Button
                        className={`${btnStyles.signUpBtn}`}
                        type="submit"
                    >
                        Sign Up
                    </Button>
                    {errors.non_field_errors?.map((message, idx) => (
                        <Alert key={idx} variant="warning" className="mt-3">
                            {message}
                        </Alert>
                    ))}
                </Form>

                <Container className="mt-3">
                    <div className={formStyles.signUpText}>
                        Already have an account?
                        <Link to="/signin">Log in here</Link>
                    </div>
                </Container>
            </div>
        </Container>
    );
};

export default SignUpForm;