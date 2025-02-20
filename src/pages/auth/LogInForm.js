import React, { useState } from "react";
import axios from "axios";
import { Form, Alert, Button, Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

function SignInForm() {
    const [signInData, setSignInData] = useState({
        username: "",
        password: "",
    });
    const { username, password } = signInData;

    const [errors, setErrors] = useState({});
    const history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await axios.post("https://habit-by-bit-django-afc312512795.herokuapp.com/dj-rest-auth/login/", signInData);
            localStorage.setItem("token", data.access_token);
            history.push("/profile");
        } catch (err) {
            setErrors(err.response?.data);
        }
    };

    const handleChange = (event) => {
        setSignInData({
            ...signInData,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <Container className="mt-5">
            <h2 className="mb-4">Sign In</h2>

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
                    <Alert key={idx} variant="warning">
                        {message}
                    </Alert>
                ))}

                <Form.Group controlId="password">
                    <Form.Label className="d-none">Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                {errors.password?.map((message, idx) => (
                    <Alert key={idx} variant="warning">
                        {message}
                    </Alert>
                ))}

                <Button className="mt-3" variant="primary" type="submit">
                    Sign In
                </Button>

                {errors.non_field_errors?.map((message, idx) => (
                    <Alert key={idx} variant="warning" className="mt-3">
                        {message}
                    </Alert>
                ))}
            </Form>

            <Container className="mt-3">
                <Link to="/signup">Don't have an account? <span>Sign up now!</span></Link>
            </Container>
        </Container>
    );
}

export default SignInForm;