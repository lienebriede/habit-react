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
                setErrors({ name: "Oops, something went wrong. Please try again." });
                setPredefinedHabits([]);
            }
        };
        fetchPredefinedHabits();

    }, []);


    const handleSubmit = async (event) => {
        event.preventDefault();

        setErrors({});

        // Validate habit fields
        if (!customHabit1 && !selectedHabit1) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                habit1: "Oops, please select or enter a habit for Habit 1."
            }));
            return;
        }
        if (!customHabit2 && !selectedHabit2) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                habit2: "Oops, please select or enter a habit for Habit 2."
            }));
            return;
        }
        if (
            (selectedHabit1 && selectedHabit2 && selectedHabit1 === selectedHabit2) ||
            (customHabit1 && customHabit2 && customHabit1 === customHabit2) ||
            (selectedHabit1 && customHabit2 && selectedHabit1 === customHabit2) ||
            (selectedHabit2 && customHabit1 && selectedHabit2 === customHabit1)
        ) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                sameHabit: "Oops, Habit 1 and Habit 2 can’t be the same. Please choose different habits for both!"
            }));
            return;
        }
        try {
            const token = localStorage.getItem("token");

            // Check if token available
            if (!token) {
                setErrors({ name: "Oops, it looks like you are not logged in. Please log in and try again." });
                return;
            }

            const requestData = {
                predefined_habit1: selectedHabit1 || "",
                custom_habit1: customHabit1 || "",
                predefined_habit2: selectedHabit2 || "",
                custom_habit2: customHabit2 || "",

            };

            console.log("Submitting habits:", requestData);

            // Check if already exists
            const response = await axios.post(
                "https://habit-by-bit-django-afc312512795.herokuapp.com/habit-stacking/",
                requestData,
                { headers: { Authorization: `Bearer ${token}` } }
            );


            setShowModal(true);
        } catch (err) {
            const backendErrors = err.response?.data || {};

            const newErrors = {};
            if (backendErrors.custom_habit1) {
                newErrors.habit1 = backendErrors.custom_habit1[0] || "Oops, something went wrong with Habit 1. Please try again.";
            }
            if (backendErrors.custom_habit2) {
                newErrors.habit2 = backendErrors.custom_habit2[0] || "Oops, something went wrong with Habit 2. Please try again.";
            }
            if (backendErrors.name) {
                newErrors.general = backendErrors.name[0] || "Oops, something went wrong. Please try again.";
            }
            if (backendErrors.non_field_errors?.includes("This habit stack already exists.")) {
                newErrors.duplicateStack = "Oops, it looks like this habit stack already exists. Try creating a different combination of habits!";
            }
            if (backendErrors.non_field_errors?.includes("Habit1 and Habit2 cannot be the same.")) {
                newErrors.sameHabit = "Oops, Habit 1 and Habit 2 can’t be the same. Please choose different habits for both!";
            }
            setErrors(newErrors);
        }
    };

    return (
        <Container className={formStyles.formContainer}>
            <div className={formStyles.formWrapper}>
                <Form onSubmit={handleSubmit}>

                    {/* Habit 1 */}
                    <Form.Group className={formStyles.formControl}>
                        <h4>Habit 1</h4>
                        <p className="mb-2">Select a habit from the list or type your own</p>
                        <Form.Control
                            as="select"
                            value={selectedHabit1}
                            onChange={(e) => {
                                setSelectedHabit1(e.target.value);
                                setCustomHabit1("");
                            }}
                        >
                            <option value="">Select a habit</option>
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
                        {/* Habit missing error */}
                        {errors && errors.habit1 && <p className={`${formStyles.errorMessage} mb-0`}>{errors.habit1}</p>}
                    </Form.Group>

                    {/* Habit 2*/}
                    <Form.Group className={formStyles.formControl}>
                        <h4>Habit 2</h4>
                        <p className="mb-2">Select a habit from the list or type your own</p>
                        <Form.Control
                            as="select"
                            value={selectedHabit2}
                            onChange={(e) => {
                                setSelectedHabit2(e.target.value);
                                setCustomHabit2("");
                            }}
                        >
                            <option value="">Select a habit</option>
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
                        {/* Habit missing error */}
                        {errors && errors.habit2 && <p className={`${formStyles.errorMessage} mb-0`}>{errors.habit2}</p>}
                    </Form.Group>

                    {/* Error if same habits for both */}
                    {errors && errors.sameHabit && <p className={`${formStyles.errorMessage} mb-0`}>{errors.sameHabit}</p>}
                    {/* Error if stack exists */}
                    {errors && errors.duplicateStack && <p className={`${formStyles.errorMessage} mb-0`} > {errors.duplicateStack}</p>}
                    {/* General error message */}
                    {errors && <p className={`${formStyles.errorMessage} mb-0`}>{errors.name}</p>}
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