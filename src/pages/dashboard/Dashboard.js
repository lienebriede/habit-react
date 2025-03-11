import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Container, ListGroup, Button, } from "react-bootstrap";
import "react-calendar/dist/Calendar.css";
import styles from "../../styles/Dashboard.module.css";

import axios from "axios";

const Dashboard = () => {
    const history = useHistory();
    const [stacks, setStacks] = useState([]);
    const [habitLogs, setHabitLogs] = useState({});
    const [predefinedHabits, setPredefinedHabits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            history.push("/login");
            return;
        }

        const fetchStacks = async () => {
            try {
                const response = await axios.get(
                    "https://habit-by-bit-django-afc312512795.herokuapp.com/habit-stacking/",
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setStacks(response.data.results);

                console.log('Habit Stacks:', response.data.results);
                response.data.results.forEach(stack => {
                    console.log(`Stack ID: ${stack.id}`);
                });
            } catch (error) {
                console.error("Error fetching stacks:", error);
            }
        };

        const fetchHabitLogs = async () => {
            try {
                const response = await axios.get(
                    "https://habit-by-bit-django-afc312512795.herokuapp.com/habit-stacking-logs/",
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                let logsData = {};
                response.data.results.forEach((log) => {
                    const stackId = log.habit_stack.id;
                    if (!logsData[stackId]) {
                        logsData[stackId] = new Map();
                    }
                    logsData[stackId].set(log.id, log);
                });

                Object.keys(logsData).forEach(stackId => {
                    logsData[stackId] = Array.from(logsData[stackId].values());
                });

                setHabitLogs(logsData);
            } catch (error) {
                console.error("Error fetching habit logs:", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchPredefinedHabits = async () => {
            try {
                const response = await axios.get(
                    "https://habit-by-bit-django-afc312512795.herokuapp.com/predefined-habits/",
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setPredefinedHabits(response.data.results);
            } catch (error) {
                console.error("Error fetching predefined habits:", error);
            }
        };

        const fetchData = async () => {
            await fetchStacks();
            await fetchHabitLogs();
            await fetchPredefinedHabits();
        };

        fetchData();
    }, [history]);

    const getHabitName = (habitId) => {
        if (!habitId) return "Unknown Habit";
        const habit = predefinedHabits.find(h => h.id === habitId);
        return habit ? habit.name : "Unknown Habit";
    };

    const getLogsForSelectedDate = () => {
        const formattedDate = selectedDate.toISOString().split("T")[0];
        let logsForDate = [];
        Object.values(habitLogs).forEach(logs => {
            logs.forEach(log => {
                if (log.date === formattedDate) {
                    logsForDate.push(log);
                }
            });
        });
        return logsForDate;
    };

    const changeDay = (direction) => {
        const newDate = new Date(selectedDate);
        newDate.setDate(selectedDate.getDate() + direction);
        setSelectedDate(newDate);
    };

    const getWeekDays = () => {
        const startOfWeek = new Date(selectedDate);
        startOfWeek.setDate(selectedDate.getDate() - (selectedDate.getDay() === 0 ? 6 : selectedDate.getDay() - 1));

        return Array.from({ length: 7 }, (_, i) => {
            const day = new Date(startOfWeek);
            day.setDate(startOfWeek.getDate() + i);
            return day;
        });
    };

    const handleDayClick = (day) => {
        setSelectedDate(day);
    };

    const toggleCompletion = async (log) => {
        const today = new Date().toISOString().split("T")[0];

        if (log.date > today) {
            setErrors({ futureDate: "You cannot complete a habit for a future date." });
            return;
        }

        setErrors({});

        const token = localStorage.getItem("token");
        if (!token) {
            history.push("/login");
            return;
        }

        try {
            await axios.patch(
                `https://habit-by-bit-django-afc312512795.herokuapp.com/habit-stacking-logs/${log.id}/`,
                { completed: !log.completed },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const updatedLogs = { ...habitLogs };
            updatedLogs[log.habit_stack.id] = updatedLogs[log.habit_stack.id].map(item =>
                item.id === log.id ? { ...item, completed: !log.completed } : item
            );
            setHabitLogs(updatedLogs);
        } catch (error) {
            console.error("Error updating habit log:", error);
        }
    };

    return (
        <Container className={styles.pageContainer}>
            <div className={styles.wrapper}>
                <div className={`${styles.itemContainer} ${styles.timeContainer}`}>
                    <Button onClick={() => changeDay(-1)} className={styles.arrowButton}>
                        <i className="fa-solid fa-arrow-left"></i>
                    </Button>
                    <h1 className={styles.timeText}>
                        {selectedDate.toDateString() === new Date().toDateString()
                            ? "Today"
                            : new Intl.DateTimeFormat("en-GB", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                            }).format(selectedDate)}
                    </h1>
                    <Button onClick={() => changeDay(1)} className={styles.arrowButton}>
                        <i className="fa-solid fa-arrow-right"></i>
                    </Button>
                </div>

                <div className={styles.weekContainer}>
                    {getWeekDays().map((day) => (
                        <Button
                            key={day}
                            onClick={() => handleDayClick(day)}
                            className={`${styles.weekButton} 
                            ${day.toDateString() === selectedDate.toDateString() ? styles.activeButton : ""}`}
                        >
                            {new Intl.DateTimeFormat("en-GB", { weekday: "short" }).format(day)} <br /> {day.getDate()}
                        </Button>
                    ))}
                </div>

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <ListGroup>
                        {getLogsForSelectedDate().length === 0 ? (
                            <p className={styles.noLogsText}>You haven't scheduled any habit stacks for today yet!</p>
                        ) : (
                            getLogsForSelectedDate().map(log => (
                                <ListGroup.Item key={log.id} className={styles.stackItem}>
                                    <div className={styles.habitContainer}>
                                        {log.habit_stack.custom_habit1 || getHabitName(log.habit_stack.predefined_habit1)} & {" "}
                                        {log.habit_stack.custom_habit2 || getHabitName(log.habit_stack.predefined_habit2)}
                                    </div>
                                    <p className={log.completed ? styles.completedText : styles.notCompletedText}>
                                        {log.completed ? "Completed!" : "Not completed!"}
                                    </p>
                                    <div className={styles.tickboxContainer} onClick={() => toggleCompletion(log)}>
                                        <i className={`fa-solid fa-circle-check ${log.completed ? styles.checked : styles.unchecked}`} />
                                    </div>
                                </ListGroup.Item>
                            ))
                        )}
                    </ListGroup>
                )}<div>
                    {errors.futureDate && <p className={styles.errorMessage}>{errors.futureDate}</p>}
                </div>
            </div>
        </Container>
    );
};

export default Dashboard;