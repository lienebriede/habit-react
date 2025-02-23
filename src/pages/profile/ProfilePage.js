import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import styles from "../../styles/Profile.module.css";
import btnStyles from "../../styles/Button.module.css";
import formStyles from "../../styles/Form.module.css";
import { Container, Alert, Button, Form, Modal } from "react-bootstrap";

import axios from "axios";

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [errors, setErrors] = useState(null);
    const [username, setUsername] = useState("");
    const [image, setImage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    history.push("/signin");  // Redirect to login if no token
                    return;
                }

                // Try fetching the user profile
                const userResponse = await axios.get("https://habit-by-bit-django-afc312512795.herokuapp.com/dj-rest-auth/user/", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const profileId = userResponse.data.pk;
                const profileResponse = await axios.get(`https://habit-by-bit-django-afc312512795.herokuapp.com/profiles/${profileId}/`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setProfile(profileResponse.data);
                setUsername(profileResponse.data.username || "");
            } catch (err) {
                // If there's an error fetching profile (like token expired or invalid)
                setErrors("Session expired or invalid. Please log in again.");
                history.push("/signin");  // Redirect to login on error
            }
        };

        fetchProfile();
    }, [history]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const profileId = profile.id;

            const formData = new FormData();
            formData.append("username", username);
            if (image) formData.append("image", image);

            await axios.patch(
                `https://habit-by-bit-django-afc312512795.herokuapp.com/profiles/${profileId}/`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setProfile((prevProfile) => ({ ...prevProfile, username, image: URL.createObjectURL(image) }));
            setShowModal(true);
        } catch (err) {
            setErrors(err.response?.data || "Error updating profile");
        }
    };

    // If the profile is null, do not render the form or any other content
    if (!profile) return null;

    return (
        <Container className={styles.profileContainer}>
            {errors && <Alert variant="danger">{errors}</Alert>}

            <div className={styles.welcomeMessage}>
                <h1>Welcome, {profile.user}!</h1>
                <p><i class="fa-regular fa-circle-user"></i>Member since {profile.created_at}</p>
            </div>
            <div className={formStyles.formWrapper}>

                <Form onSubmit={handleUpdate}>


                    <Form.Group controlId="image">
                        <p><strong>Update your profile image:</strong></p>
                        <Form.Control
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                            accept="image/*"
                        />
                    </Form.Group>

                    <Button className={`${btnStyles.SignUp}`} type="submit">
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
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default ProfilePage;