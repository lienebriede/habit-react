import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Container, Button, ListGroup } from "react-bootstrap";
import styles from "../../styles/MyStacks.module.css";

import axios from "axios";

const MyStacks = () => {
    const history = useHistory();
    const [stacks, setStacks] = useState([]);
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

    const handleCreateStack = () => {
        history.push("mystacks/create");
    };

    return (
        <Container className={styles.stacksContainer}>
            <div className={styles.stacksWrapper}>
                <h1>My Habit Stacks</h1>

                <Button onClick={handleCreateStack} className={`${styles.listItem} ${styles.customBtn}`}>
                    <i class="fa-solid fa-plus"></i>Create a Habit Stack
                </Button>

                {/* Display stacks list or a message if no stacks */}
                {loading ? (
                    <p>Loading...</p>
                ) : stacks.length === 0 ? (
                    <p>No habit stacks created yet.</p>
                ) : (
                    <ListGroup >
                        {stacks.map((stack) => (
                            <ListGroup.Item className={styles.listItem} key={stack.id}>
                                <i class="fa-solid fa-cubes-stacked"></i>
                                {stack.custom_habit1} & {stack.custom_habit2}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </div>
        </Container>
    );
};

export default MyStacks;