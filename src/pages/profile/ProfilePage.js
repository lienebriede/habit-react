import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import styles from "../../styles/Profile.module.css";
import btnStyles from "../../styles/Button.module.css";
import formStyles from "../../styles/Form.module.css";
import { Container, Alert, Button, Form, Modal } from "react-bootstrap";

import axios from "axios";

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [errors, setErrors] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const history = useHistory();

    // Fetch user profile data on component mount
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    history.push("/signin");
                    return;
                }

                const userResponse = await axios.get(
                    "https://habit-by-bit-django-afc312512795.herokuapp.com/dj-rest-auth/user/",
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                const profileId = userResponse.data.pk;
                const profileResponse = await axios.get(
                    `https://habit-by-bit-django-afc312512795.herokuapp.com/profiles/${profileId}/`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                setProfile(profileResponse.data);
            } catch (err) {
                setErrors("Session expired or invalid. Please log in again.");
                history.push("/signin");
            }
        };

        fetchProfile();
    }, [history]);


    // Handle file selection, but do not upload yet
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setSelectedImage(file);
    };

    // Upload selected image when the user clicks the "Update Profile" button
    const handleUploadClick = async () => {
        if (!selectedImage) return;

        const formData = new FormData();
        formData.append("image", selectedImage);

        try {
            const token = localStorage.getItem("token");

            const response = await axios.patch(
                `https://habit-by-bit-django-afc312512795.herokuapp.com/profiles/${profile.id}/`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setProfile(response.data);
            setShowModal(true);
        } catch (err) {
            setErrors("Failed to upload image. Try again.");
        }
    };

    // Prevent rendering if profile data is not available
    if (!profile) return null;

    return (
        <Container className={styles.profileContainer}>
            {errors && <Alert variant="danger">{errors}</Alert>}

            <div className={styles.welcomeMessage}>
                <h1>Welcome, {profile.user}!</h1>
                <p>
                    <i className="fa-regular fa-circle-user"></i> Member since {profile.created_at}
                </p>
            </div>

            <div className={formStyles.formWrapper}>
                <Form>
                    <Form.Group controlId="image">
                        <div className={styles.profileImageWrapper}>
                            <img
                                src={profile.image || "../assets/profile-placeholder.png"}
                                alt="Profile"
                                className={styles.profileImage}
                            />
                            <p><strong>Update your profile image:</strong></p>
                        </div>
                        <Form.Control
                            type="file"
                            onChange={handleImageChange}
                            accept="image/*"
                        />
                    </Form.Group>

                    <Button className={`${btnStyles.signUpBtn}`} type="button" onClick={handleUploadClick}>
                        Update Profile
                    </Button>
                </Form>
            </div>

            {/* Modal Confirmation */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Profile Updated</Modal.Title>
                </Modal.Header>
                <Modal.Body>Your profile has been successfully updated.</Modal.Body>
                <Modal.Footer>
                    <Button className={btnStyles.modalBtn} onClick={() => setShowModal(false)}>
                        OK!
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default ProfilePage;