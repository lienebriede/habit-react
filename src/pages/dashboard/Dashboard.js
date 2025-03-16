import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";

import { Container, ListGroup, Button, Modal } from "react-bootstrap";
import "react-calendar/dist/Calendar.css";
import styles from "../../styles/Dashboard.module.css";
import btnStyles from "../../styles/Button.module.css";

import axios from "axios";

const Dashboard = () => {
    const history = useHistory();
    const [stacks, setStacks] = useState([]);
    const [habitLogs, setHabitLogs] = useState({});
    const [predefinedHabits, setPredefinedHabits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [errors, setErrors] = useState({});
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [streakMessage, setStreakMessage] = useState('');
    const [milestoneMessage, setMilestoneMessage] = useState('');

    useEffect(() => {
        // Redirect to login page if no token is found
        const token = localStorage.getItem("token");
        if (!token) {
            history.push("/signin");
            return;
        }

        // Fetch habit stacks data
        const fetchStacks = async () => {
            try {
                const response = await axios.get(
                    "https://habit-by-bit-django-afc312512795.herokuapp.com/habit-stacking/",
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setStacks(response.data.results);
            } catch (error) {
                console.error("Error fetching stacks:", error);
            }
        };

        // Fetch habit logs, handle pagination
        const fetchHabitLogs = async () => {
            try {
                const token = localStorage.getItem("token");
                let allLogs = new Map();
                let nextPage = "https://habit-by-bit-django-afc312512795.herokuapp.com/habit-stacking-logs/";

                while (nextPage) {
                    const response = await axios.get(nextPage, {
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    response.data.results.forEach(log => {
                        allLogs.set(log.id, log);
                    });

                    nextPage = response.data.next;
                }

                // Group logs by habit stack
                let logsData = {};
                Array.from(allLogs.values()).forEach(log => {
                    const stackId = log.habit_stack.id;
                    if (!logsData[stackId]) {
                        logsData[stackId] = [];
                    }
                    logsData[stackId].push(log);
                });

                setHabitLogs(logsData);
                console.log("Fetched all habit logs:", logsData);
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

    // Get habit name by id
    const getHabitName = (habitId) => {
        if (!habitId) return "Unknown Habit";
        const habit = predefinedHabits.find(h => h.id === habitId);
        return habit ? habit.name : "Unknown Habit";
    };

    // Check stack's active_until
    const isExpiringSoon = (activeUntil) => {
        const today = new Date();
        const endDate = new Date(activeUntil);

        today.setHours(0, 0, 0, 0);
        endDate.setHours(0, 0, 0, 0);

        const diffInDays = (endDate - today) / (1000 * 3600 * 24);

        return diffInDays >= 0 && diffInDays <= 2;
    };

    // Get logs for the selected date
    const getLogsForSelectedDate = () => {
        const formattedDate = selectedDate.toISOString().split("T")[0];
        let logsForDate = new Map();

        Object.values(habitLogs).forEach(logs => {
            logs.forEach(log => {
                if (log.date === formattedDate) {
                    logsForDate.set(log.id, log);
                }
            });
        });
        console.log("Logs for selected date:", formattedDate, Array.from(logsForDate.values()));
        return Array.from(logsForDate.values());
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

    // Completion status
    const toggleCompletion = async (log) => {
        const today = new Date().toISOString().split("T")[0];

        if (log.date > today) {
            setErrors({ [log.id]: { futureDate: "Oops, you can't complete a habit stack in the future!" } });
            return;
        }

        setErrors({});

        const token = localStorage.getItem("token");
        if (!token) {
            history.push("/login");
            return;
        }

        try {
            const updatedLog = await axios.patch(
                `https://habit-by-bit-django-afc312512795.herokuapp.com/habit-stacking-logs/${log.id}/`,
                { completed: !log.completed },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const { milestone_message, streak_message } = updatedLog.data;

            // Set messages
            if (milestone_message) {
                setMilestoneMessage(milestone_message);
                setStreakMessage('');
            } else if (streak_message) {
                setStreakMessage(streak_message);
                setMilestoneMessage('');
            }

            // Show success modal if there are messages
            if (milestone_message || streak_message) {
                setShowSuccessModal(true);
            }

            // Update habit log
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
                            <p className={styles.noLogsText}>You haven't created any habit stacks for this day yet!</p>
                        ) : (
                            getLogsForSelectedDate().map(log => {
                                // Check if expiry is soon
                                const isExpiring = isExpiringSoon(log.habit_stack.active_until);

                                return (
                                    <React.Fragment key={log.id}>
                                        <ListGroup.Item className={styles.stackItem}>
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

                                        {/* Reminder Message */}
                                        {isExpiring && (
                                            <div key={`reminder-${log.id}`} className={styles.reminderMessageContainer}>
                                                <div className={styles.reminderMessage}>
                                                    Keep going! Go to "My Stacks" to extend this habit stack!
                                                </div>
                                            </div>
                                        )}

                                        {/* Progress Button */}
                                        <Link to={`/habit-stacking/${log.habit_stack.id}/progress`}>
                                            <Button className={`${btnStyles.mainBtn} ${btnStyles.editStackBtn} ${btnStyles.btnOrange}`}>
                                                <i class="fa-solid fa-chart-simple"></i>
                                                View Progress
                                            </Button>
                                        </Link>
                                        {errors[log.id] && errors[log.id].futureDate && (
                                            <p className={styles.errorMessage}>{errors[log.id].futureDate}</p>
                                        )}
                                    </React.Fragment>
                                );
                            })
                        )}
                    </ListGroup>
                )}

            </div>

            {/* Streak & Milestone message */}
            <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Congrats!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {streakMessage && !milestoneMessage ? (
                        <p>{streakMessage}</p>
                    ) : milestoneMessage ? (
                        <p>{milestoneMessage}</p>
                    ) : null}
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default Dashboard;