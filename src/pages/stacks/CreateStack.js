import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Form, Button, Container, Modal } from "react-bootstrap";
import btnStyles from "../../styles/Button.module.css";
import formStyles from "../../styles/Form.module.css";

import axios from "axios";

const CreateStack = () => {
    const history = useHistory();
    const [customHabit1, setCustomHabit1] = useState("");
    const [customHabit2, setCustomHabit2] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate
        if (!customHabit1 || !customHabit2) {
            setErrors({ name: "Please enter a habit for both Habit 1 and Habit 2." });
            return;
        }

        try {
            const token = localStorage.getItem("token");

            // Check if token available
            if (!token) {
                setErrors({ name: "Authorization token is missing." });
                return;
            }

            const requestData = {
                custom_habit1: customHabit1,
                custom_habit2: customHabit2
            };

            console.log("Submitting habits:", requestData);

            // Send the request
            await axios.post(
                "https://habit-by-bit-django-afc312512795.herokuapp.com/habit-stacking/",
                requestData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setShowModal(true);
        } catch (err) {
            console.error("Error creating habit stack:", err.response?.data);
            setErrors(err.response?.data || { name: "An error occurred while creating the habit stack." });
        }
    };

    return (
        <Container className={formStyles.formContainer}>
            <div className={formStyles.formWrapper}>
                <Form onSubmit={handleSubmit}>
                    {/* Habit 1: Custom */}
                    <Form.Group className={formStyles.formControl}>
                        <h4>Habit 1</h4>
                        <p className={formStyles.tinyText}>Type your habit</p>
                        <Form.Control
                            type="text"
                            placeholder="Type here"
                            value={customHabit1}
                            onChange={(e) => setCustomHabit1(e.target.value)}
                        />
                    </Form.Group>

                    {/* Habit 2: Custom */}
                    <Form.Group className={formStyles.formControl}>
                        <h4>Habit 2</h4>
                        <p className={formStyles.tinyText}>Type your habit</p>
                        <Form.Control
                            type="text"
                            placeholder="Type here"
                            value={customHabit2}
                            onChange={(e) => setCustomHabit2(e.target.value)}
                        />
                    </Form.Group>

                    {/* Error Message */}
                    {errors && <p className="text-danger">{errors.name}</p>}

                    <Button className={`${btnStyles.mainBtn} ${btnStyles.signUpBtn}`}
                        type="submit">
                        Create
                    </Button>
                </Form>
            </div>

            {/* Modal Confirmation */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Habit Stack Created</Modal.Title>
                </Modal.Header>
                <Modal.Body>Your habit stack has been successfully created.</Modal.Body>
                <Modal.Footer>
                    <Button className={btnStyles.modalBtn} onClick={() => {
                        setShowModal(false);
                        history.push("/mystacks");
                    }}>
                        OK!
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container >
    );
};

export default CreateStack;