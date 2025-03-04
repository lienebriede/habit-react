import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";

import { Container, Button, Form, Modal } from "react-bootstrap";
import styles from "../../styles/MyStacks.module.css";
import formStyles from "../../styles/Form.module.css";
import btnStyles from "../../styles/Button.module.css";

import axios from "axios";

const StackDetail = () => {
    const { id } = useParams();
    const history = useHistory();
    const [stack, setStack] = useState(null);
    const [predefinedHabits, setPredefinedHabits] = useState([]);
    const [selectedHabit1, setSelectedHabit1] = useState("");
    const [selectedHabit2, setSelectedHabit2] = useState("");
    const [customHabit1, setCustomHabit1] = useState("");
    const [customHabit2, setCustomHabit2] = useState("");
    const [errors, setErrors] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const habitsRes = await axios.get("https://habit-by-bit-django-afc312512795.herokuapp.com/predefined-habits/", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setPredefinedHabits(habitsRes.data.results);
                const stackRes = await axios.get(`https://habit-by-bit-django-afc312512795.herokuapp.com/habit-stacking/${id}/`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = stackRes.data;
                setStack(data);
                setSelectedHabit1(data.predefined_habit1 || "");
                setCustomHabit1(data.custom_habit1 || "");
                setSelectedHabit2(data.predefined_habit2 || "");
                setCustomHabit2(data.custom_habit2 || "");
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleUpdate = async (event) => {
        event.preventDefault();
        setErrors({});

        if (!customHabit1 && !selectedHabit1) {
            setErrors({ habit1: "Oops, please select or enter a habit for Habit 1." });
            return;
        }
        if (!customHabit2 && !selectedHabit2) {
            setErrors({ habit2: "Oops, please select or enter a habit for Habit 2." });
            return;
        }
        if (
            (selectedHabit1 && selectedHabit2 && selectedHabit1 === selectedHabit2) ||
            (customHabit1 && customHabit2 && customHabit1 === customHabit2) ||
            (selectedHabit1 && customHabit2 && selectedHabit1 === customHabit2) ||
            (selectedHabit2 && customHabit1 && selectedHabit2 === customHabit1)
        ) {
            setErrors({ sameHabit: "Oops, Habit 1 and Habit 2 can’t be the same. Please choose different habits for both!" });
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const requestData = {
                predefined_habit1: selectedHabit1 || "",
                custom_habit1: selectedHabit1 ? "" : customHabit1,
                predefined_habit2: selectedHabit2 || "",
                custom_habit2: selectedHabit2 ? "" : customHabit2,
            };
            await axios.patch(`https://habit-by-bit-django-afc312512795.herokuapp.com/habit-stacking/${id}/`, requestData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setShowSuccessModal(true);

            setTimeout(() => {
                history.push("/mystacks");
            }, 2000);

        } catch (error) {
            console.error("Error updating stack:", error);
        }
    };

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`https://habit-by-bit-django-afc312512795.herokuapp.com/habit-stacking/${id}/`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setShowSuccessModal(true);

            setTimeout(() => {
                history.push("/mystacks");
            }, 2000);

        } catch (error) {
            console.error("Error deleting stack:", error);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <Container className={formStyles.formContainer}>
            <div className={formStyles.formWrapper}>
                <Button className={`${btnStyles.deleteBtn} `} onClick={() => setShowDeleteModal(true)}>
                    <i className="fa-solid fa-trash-can"></i>
                </Button>
                <Link to="/mystacks" className={``}><i class="fa-solid fa-arrow-left"></i>
                </Link>
                <h1 className="mt-4">Edit habit stack</h1>


                <Form onSubmit={handleUpdate} className="mt-4">
                    <Form.Group>
                        <h4 className="pt-3">Habit 1</h4>
                        <Form.Control as="select" value={selectedHabit1} onChange={(e) => {
                            setSelectedHabit1(e.target.value);
                            setCustomHabit1("");
                        }}>
                            <option value="">Select a habit</option>
                            {predefinedHabits.map((habit) => (
                                <option key={habit.id} value={habit.id}>{habit.name}</option>
                            ))}
                        </Form.Control>
                        <Form.Control type="text" placeholder="Type your own" value={customHabit1} onChange={(e) => {
                            setCustomHabit1(e.target.value);
                            setSelectedHabit1("");
                        }} disabled={selectedHabit1 !== ""} />
                        {errors?.habit1 && <p className={formStyles.errorMessage}>{errors.habit1}</p>}
                    </Form.Group>
                    <Form.Group className="mt-4">
                        <h4>Habit 2</h4>
                        <Form.Control as="select" value={selectedHabit2} onChange={(e) => {
                            setSelectedHabit2(e.target.value);
                            setCustomHabit2("");
                        }}>
                            <option value="">Select a habit</option>
                            {predefinedHabits.map((habit) => (
                                <option key={habit.id} value={habit.id}>{habit.name}</option>
                            ))}
                        </Form.Control>
                        <Form.Control type="text" placeholder="Type your own" value={customHabit2} onChange={(e) => {
                            setCustomHabit2(e.target.value);
                            setSelectedHabit2("");
                        }} disabled={selectedHabit2 !== ""} />
                        {errors?.habit2 && <p className={formStyles.errorMessage}>{errors.habit2}</p>}
                    </Form.Group>


                    <Button
                        className={`${btnStyles.mainBtn} ${btnStyles.largeBtn} ${btnStyles.btnOrange}`}
                        type="submit">
                        Update
                    </Button>

                </Form>
            </div>

            <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Success!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {stack ? "Your habit stack has been successfully updated." : "Your habit stack has been successfully deleted."}
                </Modal.Body>
            </Modal>

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this habit stack?</Modal.Body>
                <Modal.Footer>
                    <Button className={`${btnStyles.mainBtn} ${btnStyles.smallBtn} ${btnStyles.btnGray}`} onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                    <Button className={`${btnStyles.mainBtn} ${btnStyles.smallBtn} ${btnStyles.btnRed}`} onClick={handleDelete}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </Container >
    )
};

export default StackDetail;

