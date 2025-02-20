import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Alert, Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [errors, setErrors] = useState(null);
    const [name, setName] = useState("");
    const history = useHistory();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("No token found, redirecting to sign in.");
                    history.push("/signin");
                    return;
                }

                console.log("Fetching user data...");
                const userResponse = await axios.get("https://habit-by-bit-django-afc312512795.herokuapp.com/dj-rest-auth/user/", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                console.log("User Response:", userResponse.data);
                const profileId = userResponse.data.pk;

                console.log(`Fetching profile for ID: ${profileId}`);
                const profileResponse = await axios.get(`https://habit-by-bit-django-afc312512795.herokuapp.com/profiles/${profileId}/`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                console.log("Profile Response:", profileResponse.data);
                setProfile(profileResponse.data);
                setName(profileResponse.data.name || "");
            } catch (err) {
                console.error("Error fetching profile:", err);
                setErrors(err.response?.data || "Error fetching profile");
            }
        };

        fetchProfile();
    }, [history]);


    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            const profileId = profile.id;

            await axios.patch(
                `https://habit-by-bit-django-afc312512795.herokuapp.com/profiles/${profileId}/`,
                { name },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            setProfile((prevProfile) => ({ ...prevProfile, name }));
        } catch (err) {
            setErrors(err.response?.data || "Error updating profile");
        }
    };

    return (
        <Container className="mt-5">
            {errors && <Alert variant="danger">{JSON.stringify(errors)}</Alert>}

            {profile ? (
                <div>
                    <h2>Welcome, {profile.user}</h2>
                    <p>Email: {profile.email}</p>
                    <p>Name: {profile.name}</p>

                    <Form onSubmit={handleUpdate}>
                        <Form.Group controlId="name">
                            <Form.Label>Update Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Button className="mt-3" type="submit">Update Profile</Button>
                    </Form>
                </div>
            ) : (
                <p>Loading profile...</p>
            )}
        </Container>
    );
};

export default ProfilePage;