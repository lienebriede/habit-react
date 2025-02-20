import React, { useState } from "react";
import axios from "axios";
import { Form, Alert, Button, Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

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
        <Container className="mt-5">
            <h1 className="mb-4">Sign Up</h1>

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                    <Form.Label className="d-none">Username</Form.Label>
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

                <Form.Group controlId="password1">
                    <Form.Label className="d-none">Password</Form.Label>
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

                <Form.Group controlId="password2">
                    <Form.Label className="d-none">Confirm Password</Form.Label>
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
                    className="mt-3 w-100"
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
                <Link to="/signin">
                    Already have an account? <span>Sign in</span>
                </Link>
            </Container>
        </Container>
    );
};

export default SignUpForm;