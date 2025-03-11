import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";

import { Container, Button } from "react-bootstrap";
import "react-calendar/dist/Calendar.css";
import styles from "../../styles/Dashboard.module.css";

import axios from "axios";

const ProgressPage = () => {
    const history = useHistory();
    const { id } = useParams();
    const [habitStack, setHabitStack] = useState(null);
    const [habitLogs, setHabitLogs] = useState([]);
    const [predefinedHabits, setPredefinedHabits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            history.push("/login");
            return;
        }

        const fetchHabitStack = async () => {
            try {
                const response = await axios.get(
                    `https://habit-by-bit-django-afc312512795.herokuapp.com/habit-stacking/${id}/`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setHabitStack(response.data);
            } catch (error) {
                console.error("Error fetching habit stack:", error);
            }
        };

        const fetchHabitLogs = async () => {
            try {
                const response = await axios.get(
                    "https://habit-by-bit-django-afc312512795.herokuapp.com/habit-stacking-logs/",
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                const logs = response.data.results.filter(log => log.habit_stack.id === parseInt(id));
                setHabitLogs(logs);
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

        fetchHabitStack();
        fetchHabitLogs();
        fetchPredefinedHabits();
    }, [history, id]);

    const getHabitName = (habitId) => {
        if (!habitId) return "Unknown Habit";
        const habit = predefinedHabits.find(h => h.id === habitId);
        return habit ? habit.name : "Unknown Habit";
    };

    const getCompletedLogsForMonth = () => {
        const currentMonth = selectedDate.getMonth();
        const currentYear = selectedDate.getFullYear();
        return habitLogs.filter(log => {
            const logDate = new Date(log.date);
            return logDate.getMonth() === currentMonth && logDate.getFullYear() === currentYear;
        });
    };

    const changeMonth = (direction) => {
        const newDate = new Date(selectedDate);
        newDate.setMonth(selectedDate.getMonth() + direction);
        setSelectedDate(newDate);
    };

    const getDaysInMonth = (month, year) => {
        const date = new Date(year, month, 1);
        const days = [];
        while (date.getMonth() === month) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        return days;
    };

    return (
        <Container className={styles.pageContainer}>
            <div className={styles.wrapper}>

                {/* Habit Stack */}
                <div className={`${styles.progressContainer} ${styles.progressStackContainer}`}>
                    <Link
                        to="/dashboard" >
                        <i class="fa-solid fa-arrow-left"></i>
                    </Link>
                    {habitStack && (
                        <p className={styles.progressTitle}>{habitStack.custom_habit1 || getHabitName(habitStack.predefined_habit1)} & {habitStack.custom_habit2 || getHabitName(habitStack.predefined_habit2)}</p>
                    )}
                </div>

                {/* Calendar */}
                <div className={styles.calendarWrapper}>
                    <div className={`${styles.itemContainer} ${styles.timeContainer}`}>
                        <Button onClick={() => changeMonth(-1)} className={styles.arrowButton}>
                            <i className="fa-solid fa-arrow-left"></i>
                        </Button>
                        <p>
                            {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                        </p>
                        <Button onClick={() => changeMonth(1)} className={styles.arrowButton}>
                            <i className="fa-solid fa-arrow-right"></i>
                        </Button>
                    </div>

                    <div className={styles.calendarContainer}>
                        <div className={styles.calendarGrid}>
                            {getDaysInMonth(selectedDate.getMonth(), selectedDate.getFullYear()).map((day, index) => {
                                const dayString = day.toISOString().split("T")[0];
                                const logForDay = habitLogs.find(log => log.date === dayString);
                                const isCompleted = logForDay && logForDay.completed;
                                return (
                                    <div key={index} className={styles.calendarDay}>
                                        <div className={`${styles.dayCircle} ${isCompleted ? styles.completedCircle : styles.circle}`} />
                                        <span>{day.getDate()}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Progress Sections */}
                <div className={`${styles.progressContainer} ${styles.progressSectionsContainer}`}>
                    <p className={styles.progressTitle}><i class="fa-solid fa-chart-line"></i>Streaks</p>
                </div>
                <div className={`${styles.progressContainer} ${styles.progressSectionsContainer}`}>
                    <p className={styles.progressTitle}><i class="fa-solid fa-trophy"></i>Milestones</p>
                </div>
                <div className={`${styles.progressContainer} ${styles.progressSectionsContainer}`}>
                    <p className={styles.progressTitle}><i class="fa-solid fa-circle-check"></i>Total Completions</p>
                </div>
            </div>
        </Container>
    );
};

export default ProgressPage;