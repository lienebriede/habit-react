import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Form, Button, Container, Modal } from "react-bootstrap";
import btnStyles from "../../styles/Button.module.css";
import formStyles from "../../styles/Form.module.css";

import axios from "axios";

const CreateStack = () => {
    const history = useHistory();
    const [predefinedHabits, setPredefinedHabits] = useState([]);
    const [selectedHabit1, setSelectedHabit1] = useState("");
    const [selectedHabit2, setSelectedHabit2] = useState("");
    const [customHabit1, setCustomHabit1] = useState("");
    const [customHabit2, setCustomHabit2] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState(null);

    // Fetch predefined habits from the backend
    useEffect(() => {
        const fetchPredefinedHabits = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setErrors({ name: "Authorization token is missing." });
                    return;
                }

                const response = await axios.get(
                    "https://habit-by-bit-django-afc312512795.herokuapp.com/predefined-habits/",
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                console.log("Predefined Habits API Response:", response.data);

                if (Array.isArray(response.data.results)) {
                    setPredefinedHabits(response.data.results);
                } else {
                    console.error("Expected 'results' to be an array:", response.data);
                    setPredefinedHabits([]);
                }
            } catch (err) {
                console.error("Error fetching predefined habits:", err);
                setErrors({ name: "Failed to load predefined habits." });
                setPredefinedHabits([]);
            }
        };
        fetchPredefinedHabits();

    }, []);


    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate
        if (!customHabit1 && !selectedHabit1) {
            setErrors({ name: "Please select or enter a habit for Habit 1." });
            return;
        }
        if (!customHabit2 && !selectedHabit2) {
            setErrors({ name: "Please select or enter a habit for Habit 2." });
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
                predefined_habit1: selectedHabit1 || "",
                custom_habit1: customHabit1 || "",
                predefined_habit2: selectedHabit2 || "",
                custom_habit2: customHabit2 || "",

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
            setErrors({
                name: err.response?.data?.custom_habit1?.[0] || err.response?.data?.custom_habit2?.[0] || "An error occurred while creating the habit stack."
            });
        }
    };

    return (
        <Container className={formStyles.formContainer}>
            <div className={formStyles.formWrapper}>
                <Form onSubmit={handleSubmit}>

                    {/* Habit 1 */}
                    <Form.Group className={formStyles.formControl}>
                        <h4>Habit 1</h4>
                        <p className={formStyles.tinyText}>Select a habit from the list or type your own</p>
                        <Form.Control
                            as="select"
                            value={selectedHabit1}
                            onChange={(e) => {
                                setSelectedHabit1(e.target.value);
                                setCustomHabit1("");
                            }}
                        >
                            <option value="">Select a predefined habit</option>
                            {predefinedHabits.map((habit) => (
                                <option key={habit.id} value={habit.id}>
                                    {habit.name}
                                </option>
                            ))}
                        </Form.Control>

                        <Form.Control
                            type="text"
                            placeholder="Type here"
                            value={customHabit1}
                            onChange={(e) => {
                                setCustomHabit1(e.target.value);
                                setSelectedHabit1("");
                            }}
                            disabled={selectedHabit1 !== ""}
                        />
                    </Form.Group>

                    {/* Habit 2*/}
                    <Form.Group className={formStyles.formControl}>
                        <h4>Habit 2</h4>
                        <p className={formStyles.tinyText}>Select a habit from the list or type your own</p>
                        <Form.Control
                            as="select"
                            value={selectedHabit2}
                            onChange={(e) => {
                                setSelectedHabit2(e.target.value);
                                setCustomHabit2("");
                            }}
                        >
                            <option value="">Select a predefined habit</option>
                            {predefinedHabits.map((habit) => (
                                <option key={habit.id} value={habit.id}>
                                    {habit.name}
                                </option>
                            ))}
                        </Form.Control>
                        <Form.Control
                            type="text"
                            placeholder="Type here"
                            value={customHabit2}
                            onChange={(e) => {
                                setCustomHabit2(e.target.value);
                                setSelectedHabit2("");
                            }}
                            disabled={selectedHabit2 !== ""}
                        />
                    </Form.Group>

                    {/* Error Message */}
                    {errors && <p className="text-danger">{errors.name}</p>}
                    <div className="d-flex justify-content-center">

                        {/* Create Button */}
                        <Button className={`${btnStyles.mainBtn} ${btnStyles.btnOrange} w-100`}
                            type="submit">
                            Create
                        </Button>
                    </div>
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