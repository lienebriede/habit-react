import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import { Container, Button } from "react-bootstrap";
import styles from "../../styles/MyStacks.module.css";
import formStyles from "../../styles/Form.module.css";
import btnStyles from "../../styles/Button.module.css";

import axios from "axios";

const StackDetail = () => {
    const { id } = useParams();
    const [stack, setStack] = useState(null);
    const [isEditingHabit1, setIsEditingHabit1] = useState(false);
    const [isEditingHabit2, setIsEditingHabit2] = useState(false);
    const [updatedHabit1, setUpdatedHabit1] = useState("");
    const [updatedHabit2, setUpdatedHabit2] = useState("");

    useEffect(() => {
        // Fetch stack detail
        const fetchStackDetail = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.get(
                    `https://habit-by-bit-django-afc312512795.herokuapp.com/habit-stacking/${id}/`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setStack(response.data);
                setUpdatedHabit1(response.data.custom_habit1);
                setUpdatedHabit2(response.data.custom_habit2);
            } catch (error) {
                console.error("Error fetching stack detail:", error);
            }
        };

        fetchStackDetail();
    }, [id]);

    const handleEditClickHabit1 = () => {
        setIsEditingHabit1(true);
    };

    const handleEditClickHabit2 = () => {
        setIsEditingHabit2(true);
    };

    const handleChangeHabit1 = (e) => {
        setUpdatedHabit1(e.target.value);
    };

    const handleChangeHabit2 = (e) => {
        setUpdatedHabit2(e.target.value);
    };

    const handleUpdateHabit1 = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.patch(
                `https://habit-by-bit-django-afc312512795.herokuapp.com/habit-stacking/${id}/`,
                {
                    custom_habit1: updatedHabit1,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setStack(response.data);
            setIsEditingHabit1(false);
        } catch (error) {
            console.error("Error updating Habit 1:", error);
        }
    };

    const handleUpdateHabit2 = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.patch(
                `https://habit-by-bit-django-afc312512795.herokuapp.com/habit-stacking/${id}/`,
                {
                    custom_habit2: updatedHabit2,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setStack(response.data);
            setIsEditingHabit2(false);
        } catch (error) {
            console.error("Error updating Habit 2:", error);
        }
    };

    const handleDeleteClick = async () => {
        const token = localStorage.getItem("token");
        try {
            await axios.delete(
                `https://habit-by-bit-django-afc312512795.herokuapp.com/habit-stacking/${id}/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            window.location.href = "/mystacks";
        } catch (error) {
            console.error("Error deleting stack:", error);
        }
    };

    const handleCancelEditHabit1 = () => {
        setIsEditingHabit1(false);
        setUpdatedHabit1(stack.custom_habit1);
    };

    const handleCancelEditHabit2 = () => {
        setIsEditingHabit2(false);
        setUpdatedHabit2(stack.custom_habit2);
    };

    if (!stack) {
        return <p>Loading...</p>;
    }

    return (
        <Container className={formStyles.formContainer} >
            <div className={formStyles.formWrapper}>

                {/* Habit 1 */}
                <div>
                    <div className="mb-3">
                        <h4>Habit 1</h4>
                    </div>
                    <div>
                        {isEditingHabit1 ? (
                            <div>
                                <input
                                    type="text"
                                    value={updatedHabit1}
                                    onChange={handleChangeHabit1}
                                    className="form-control"
                                />
                            </div>
                        ) : (
                            <p>{stack.custom_habit1}</p>
                        )}
                    </div>
                    {isEditingHabit1 ? (
                        <div className={styles.inputBtnWrapper}>
                            <Button
                                className={`${btnStyles.mainBtn} ${btnStyles.smallBtn} ${btnStyles.btnOrange}`}
                                onClick={handleUpdateHabit1}>
                                Update
                            </Button>
                            <Button
                                className={`${btnStyles.mainBtn} ${btnStyles.smallBtn} ${btnStyles.btnGray}`}
                                onClick={handleCancelEditHabit1}>
                                Cancel
                            </Button>
                        </div>
                    ) : (
                        <div>
                            <Button
                                className={`${btnStyles.mainBtn} ${btnStyles.editBtn} ${btnStyles.btnGreen}`}
                                onClick={handleEditClickHabit1}>
                                <i className="fa-solid fa-pencil"></i>
                                Edit Habit
                            </Button>
                        </div>
                    )}
                </div>

                {/* Habit 2 */}
                <div>
                    <div className="mt-5">
                        <h4 className="mb-3">Habit 2</h4>
                    </div>
                    <div>
                        {isEditingHabit2 ? (
                            <div>
                                <input
                                    type="text"
                                    value={updatedHabit2}
                                    onChange={handleChangeHabit2}
                                    className="form-control"
                                />
                            </div>
                        ) : (
                            <p>{stack.custom_habit2}</p>
                        )}
                    </div>
                    {isEditingHabit2 ? (
                        <div className={styles.inputBtnWrapper}>
                            <Button
                                className={`${btnStyles.mainBtn} ${btnStyles.smallBtn} ${btnStyles.btnOrange}`}
                                onClick={handleUpdateHabit2}
                            >
                                Update
                            </Button>
                            <Button
                                className={`${btnStyles.mainBtn} ${btnStyles.smallBtn} ${btnStyles.btnGray}`}
                                onClick={handleCancelEditHabit2}>
                                Cancel
                            </Button>
                        </div>
                    ) : (
                        <div>
                            <Button
                                className={`${btnStyles.mainBtn} ${btnStyles.editBtn} ${btnStyles.btnGreen}`}
                                onClick={handleEditClickHabit2}>
                                <i className="fa-solid fa-pencil"></i>
                                Edit Habit
                            </Button>
                        </div>
                    )}
                </div>

                {/* Active until */}
                <div className="mt-5 mb-3">
                    <p>Active until {stack.active_until}</p>
                </div>

                {/* Delete Section */}
                <div>
                    <p className={`${formStyles.tinyText} text-danger mb-0`}>Delete this habit stack</p>
                    <div className={styles.inputBtnWrapper}>
                        <Button
                            className={`${btnStyles.mainBtn} ${btnStyles.editBtn} ${btnStyles.btnRed} mt-1`}
                            onClick={handleDeleteClick}>
                            <i class="fa-solid fa-trash-can"></i>Delete
                        </Button>
                    </div>
                </div>

                {/* Go Back Button */}
                <Link to="/my-stacks" className={`${btnStyles.mainBtn} ${btnStyles.btnOrange} d-flex justify-content-center`}>
                    Back to My Stacks
                </Link>

            </div>
        </Container >
    );
};

export default StackDetail;