import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";

import { Container, Button, ListGroup } from "react-bootstrap";
import styles from "../../styles/MyStacks.module.css";
import btnStyles from "../../styles/Button.module.css";
import formStyles from "../../styles/Form.module.css";

import axios from "axios";

const MyStacks = () => {
    const history = useHistory();
    const [stacks, setStacks] = useState([]);
    const [predefinedHabits, setPredefinedHabits] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check token
        const token = localStorage.getItem("token");
        if (!token) {
            console.log("No token found. Redirecting to login...");
            history.push("/login");
            return;
        }

        const fetchStacks = async () => {
            try {
                const response = await axios.get("https://habit-by-bit-django-afc312512795.herokuapp.com/habit-stacking/", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log("API response:", response.data);
                setStacks(response.data.results);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching stacks:", error);
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

    return (
        <Container className={formStyles.formContainer}>
            <div className={styles.stacksWrapper}>
                <h1>My Habit Stacks</h1>

                <Button onClick={handleCreateStack} className={`${styles.listItem} ${styles.createHabitBtn}`}>
                    <i class="fa-solid fa-plus"></i>Create a new habit stack
                </Button>

                {/* Stacks list */}
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <ListGroup>
                        {stacks.map((stack) => (
                            <div key={stack.id}>

                                {/* Habit Stack */}
                                <ListGroup.Item className={styles.listItem}>
                                    <i className="fa-solid fa-cubes-stacked"></i>
                                    {stack.custom_habit1 || getHabitName(stack.predefined_habit1)} {" & "}
                                    {stack.custom_habit2 || getHabitName(stack.predefined_habit2)}
                                </ListGroup.Item>

                                {/* Edit Button */}
                                <div>
                                    <Link to={`/habit-stacking/${stack.id}`} className={`${btnStyles.mainBtn} ${btnStyles.viewBtn} ${btnStyles.btnGreen}`}>
                                        <i className="fa-solid fa-pencil"></i>
                                        Edit
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </ListGroup>
                )}
            </div>
        </Container >
    );
};

export default MyStacks;