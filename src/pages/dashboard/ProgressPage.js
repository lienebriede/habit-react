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
    const [progress, setProgress] = useState(null);

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

        const fetchProgress = async () => {
            try {
                const response = await axios.get(
                    `https://habit-by-bit-django-afc312512795.herokuapp.com/habit-stacking/${id}/progress/`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setProgress(response.data);
            } catch (error) {
                console.error("Error fetching progress data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHabitStack();
        fetchHabitLogs();
        fetchPredefinedHabits();
        fetchProgress();
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

    // Highlights the number inside the milestone message
    const highlightNumbers = (text) => {
        return text.replace(/(\d+)/g, '<span style="color: #4CAF50; font-size: 18px; font-weight: 600;">$1</span>');
    };


    return (
        <Container className={styles.pageContainer}>
            <div className={styles.wrapper}>

                {/* Habit Stack */}
                <div className={`${styles.progressStackContainer}`}>
                    <Link
                        to="/dashboard">
                        <i class="fa-solid fa-arrow-left"></i>
                    </Link>
                    {habitStack && (
                        <p className={styles.progressStackTitle}>{habitStack.custom_habit1 || getHabitName(habitStack.predefined_habit1)} & {habitStack.custom_habit2 || getHabitName(habitStack.predefined_habit2)}</p>
                    )}
                </div>

                {/* Calendar */}
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
                                <div key={index} className={`${styles.calendarDay} ${isCompleted ? styles.completedDay : styles.notCompletedDay}`}>
                                    <span>{day.getDate()}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Progress Sections */}
                <div className={`${styles.progressContainer} ${styles.progressSectionsContainer}`}>
                    <p className={styles.progressTitle}>
                        <i class="fa-solid fa-chart-line"></i>Streaks
                    </p>
                    <p className={`${styles.progressNumbers} ${styles.numberOrange}`}>
                        <span className={styles.numberOrange}>
                            {progress?.current_streak ?? 0}
                        </span>
                        <span> DAYS</span>
                    </p>
                </div>

                <div className={`${styles.progressContainer} ${styles.progressSectionsContainer}`}>
                    <p className={styles.progressTitle}>
                        <i class="fa-solid fa-trophy"></i>Milestones
                    </p>
                    {progress?.milestones?.length > 0 ? (
                        <ul className={styles.milestoneList}>
                            {progress.milestones.map((milestone, index) => (
                                <li key={index} className={styles.milestoneItem}>
                                    <span className={styles.milestoneText} dangerouslySetInnerHTML={{ __html: highlightNumbers(milestone.description) }}></span>
                                    <span className={styles.milestoneDate}>{milestone.date_achieved}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className={styles.milestoneText}>
                            <span>
                                No milestones achieved yet.
                            </span>
                            <span>Keep it up!</span>
                        </p>
                    )}
                </div>
                <div className={`${styles.progressContainer} ${styles.progressSectionsContainer}`}>
                    <p className={styles.progressTitle}>
                        <i class="fa-solid fa-circle-check"></i>Total Completions
                    </p>
                    <p className={`${styles.progressNumbers} ${styles.numberGreen}`}>
                        {progress?.total_completions ?? 0}
                    </p>
                </div>
            </div>
        </Container>
    );
};

export default ProgressPage;