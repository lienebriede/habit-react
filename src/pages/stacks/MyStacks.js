import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";

import { Container, Button, ListGroup, Modal } from "react-bootstrap";
import styles from "../../styles/MyStacks.module.css";
import btnStyles from "../../styles/Button.module.css";
import formStyles from "../../styles/Form.module.css";

import axios from "axios";

const MyStacks = () => {
    const history = useHistory();
    const [stacks, setStacks] = useState([]);
    const [predefinedHabits, setPredefinedHabits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDropdown, setShowDropdown] = useState(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        // Fetch Habit Stacks
        const token = localStorage.getItem("token");
        if (!token) {
            console.log("No token found. Redirecting to login...");
            history.push("/signin");
            return;
        }

        const fetchStacks = async () => {
            try {
                const response = await axios.get("https://habit-by-bit-django-afc312512795.herokuapp.com/habit-stacking/", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setStacks(response.data.results);
            } catch (error) {
                console.error("Error fetching stacks:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStacks();
    }, [history]);

    // Fetch predefined habits
    useEffect(() => {
        const fetchPredefinedHabits = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return;

                const response = await axios.get(
                    "https://habit-by-bit-django-afc312512795.herokuapp.com/predefined-habits/",
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                setPredefinedHabits(response.data.results);
            } catch (error) {
                console.error("Error fetching predefined habits:", error);
            }
        };

        fetchPredefinedHabits();
    }, []);

    // Convert ids to names
    const getHabitName = (habitId) => {
        if (!habitId) return "Unknown Habit";
        const habit = predefinedHabits.find(h => h.id === habitId);
        return habit ? habit.name : "Unknown Habit";
    };

    const handleCreateStack = () => {
        history.push("mystacks/create");
    };

    //Habit Extension
    const handleExtendHabit = async (habitId, extensionDays) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("You must be logged in to extend a habit stack.");
            return;
        }

        try {
            const response = await axios.put(
                `https://habit-by-bit-django-afc312512795.herokuapp.com/habit-stacking/${habitId}/extend/`,
                { extension_days: extensionDays },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                setSuccessMessage(`Habit extended until ${response.data.active_until}`);
                setShowSuccessModal(true);
                setStacks((prevStacks) =>
                    prevStacks.map((stack) =>
                        stack.id === habitId
                            ? { ...stack, active_until: response.data.active_until }
                            : stack
                    )
                );
                setShowDropdown(null);
            } else {
                alert(response.data.error);
            }
        } catch (error) {
            alert("Error extending habit.");
            console.error("Extend error:", error);
        }
    };

    // Extend btn visibility
    const isExtendable = (activeUntil) => {
        if (!activeUntil) return false;

        const today = new Date();
        const activeDate = new Date(activeUntil);

        if (isNaN(activeDate)) return false;

        const diffDays = (activeDate - today) / (1000 * 60 * 60 * 24);
        return diffDays <= 2 && diffDays >= 0;
    };

    return (
        <Container className={formStyles.formContainer}>
            <div className={styles.stacksWrapper}>
                <h1>My Habit Stacks</h1>

                {/* Create habit stack */}
                <Button onClick={handleCreateStack} className={`${styles.listItem} ${styles.createHabitBtn} mb-0`}>
                    <div><i class="fa-solid fa-plus"></i>Create a new habit stack</div>
                </Button>

                {/* Stacks list */}
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <ListGroup>
                        {stacks.map((stack) => (
                            <div key={stack.id}>

                                {/* Habit Stack */}
                                <ListGroup.Item className={`${styles.listItem} pt-4`}>
                                    <div className={styles.habitStack}>
                                        <i className="fa-solid fa-cubes-stacked"></i>
                                        <span className={styles.habitName}>
                                            {stack.custom_habit1 || getHabitName(stack.predefined_habit1)} {" & "}
                                            {stack.custom_habit2 || getHabitName(stack.predefined_habit2)}
                                        </span>
                                    </div>
                                    <p className={styles.stackDate}>
                                        Active until: {stack.active_until ? new Date(stack.active_until).toLocaleDateString() : "N/A"}
                                    </p>
                                </ListGroup.Item>

                                {/* Buttons */}
                                <div className={styles.buttonContainer}>
                                    <Link to={`/habit-stacking/${stack.id}`} className={`${btnStyles.mainBtn} ${btnStyles.editStackBtn} ${btnStyles.btnGreen}`}>
                                        <i className="fa-solid fa-pencil"></i>
                                        Edit
                                    </Link>
                                    {isExtendable(stack.active_until) && (
                                        <button
                                            onClick={() => setShowDropdown(showDropdown === stack.id ? null : stack.id)}
                                            className={`${btnStyles.mainBtn} ${btnStyles.editStackBtn} ${btnStyles.btnOrange}`}>
                                            <i className="fa-solid fa-circle-plus"></i>
                                            Extend
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </ListGroup>
                )}
            </div>

            {/* Extend Dropdown */}
            {showDropdown !== null && (
                <div className={styles.floatingDropdown} onClick={() => setShowDropdown(null)}>
                    <div className={styles.dropdownContent} onClick={(e) => e.stopPropagation()}>
                        <h5>Extend for</h5>
                        <div className={styles.dropdownItem} onClick={() => handleExtendHabit(showDropdown, 7)}>
                            7 days
                        </div>
                        <div className={styles.dropdownItem} onClick={() => handleExtendHabit(showDropdown, 14)}>
                            14 days
                        </div>
                    </div>
                </div>
            )}

            {/* Extend Success */}
            <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Success!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{successMessage}</p>
                </Modal.Body>
            </Modal>
        </Container >
    );
};

export default MyStacks;