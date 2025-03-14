import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const ProfileContext = createContext();
export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const history = useHistory();

    const handleLogout = useCallback(() => {
        console.log("Logging out user...");
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        setIsAuthenticated(false);
        history.push("/signin");
    }, [history]);

    const refreshToken = useCallback(async () => {
        try {
            const refreshToken = localStorage.getItem("refresh_token");
            if (!refreshToken) {
                console.error("No refresh token found!");
                handleLogout();
                return null;
            }

            console.log("Refreshing token...");

            const { data } = await axios.post(
                "https://habit-by-bit-django-afc312512795.herokuapp.com/dj-rest-auth/token/refresh/",
                { refresh: refreshToken }
            );

            console.log("Token refreshed:", data);

            localStorage.setItem("token", data.access);
            return data.access;
        } catch (error) {
            console.error("Token refresh failed! Logging out...");
            handleLogout();
            return null;
        }
    }, [handleLogout]);

    const fetchProfile = useCallback(async () => {
        let token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found! Redirecting...");
            handleLogout();
            return;
        }

        console.log("Stored Token:", token);

        try {
            const userResponse = await axios.get(
                "https://habit-by-bit-django-afc312512795.herokuapp.com/dj-rest-auth/user/",
                { headers: { Authorization: `Bearer ${token}` } }
            );

            console.log("User Response:", userResponse.data);
            const profileId = userResponse.data.pk;

            if (!profileId) {
                console.error("Profile ID missing! Logging out...");
                handleLogout();
                return;
            }

            console.log("Profile ID:", profileId);

            const response = await axios.get(
                `https://habit-by-bit-django-afc312512795.herokuapp.com/profiles/${profileId}/`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            console.log("Profile Data:", response.data);
            setProfile(response.data);
        } catch (error) {
            if (error.response?.status === 401) {
                console.warn("Token expired, attempting refresh...");
                const newToken = await refreshToken();
                if (newToken) {
                    fetchProfile();
                }
            } else {
                console.error("Error fetching profile:", error.response?.status);
                handleLogout();
            }
        }
    }, [handleLogout, refreshToken]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchProfile();
        }
    }, [isAuthenticated, fetchProfile]);

    return (
        <ProfileContext.Provider value={{ profile, setProfile }}>
            {children}
        </ProfileContext.Provider>
    );
};