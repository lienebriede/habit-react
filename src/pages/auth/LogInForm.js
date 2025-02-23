import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import formStyles from "../../styles/Form.module.css";
import btnStyles from "../../styles/Button.module.css";
import { Form, Alert, Button, Container } from "react-bootstrap";

import axios from "axios";

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
        <Container className={formStyles.formContainer}>
            <div className={formStyles.formWrapper}>
                <h1>Log in</h1>

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
                        <Alert key={idx} variant="warning">
                            {message}
                        </Alert>
                    ))}

                    <Form.Group controlId="password" className={formStyles.formControl}>
                        <Form.Label>Password</Form.Label>
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

                    <Button
                        className={`${btnStyles.SignUp}`}
                        type="submit">
                        Sign In
                    </Button>

                    {errors.non_field_errors?.map((message, idx) => (
                        <Alert key={idx} variant="warning" className="mt-3">
                            {message}
                        </Alert>
                    ))}
                </Form>

                <Container className="mt-3">
                    <div className={formStyles.signUpText}>
                        Don't have an account?
                        <Link to="/signup">Sign up here</Link>
                    </div>
                </Container>
            </div>
        </Container>
    );
}

export default SignInForm;