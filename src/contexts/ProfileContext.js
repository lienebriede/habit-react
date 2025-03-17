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
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        setIsAuthenticated(false);
        history.push("/signin");
    }, [history]);

    const refreshToken = useCallback(async () => {
        try {
            const refreshToken = localStorage.getItem("refresh_token");
            if (!refreshToken) {
                handleLogout();
                return null;
            }

            const { data } = await axios.post(
                "https://habit-by-bit-django-afc312512795.herokuapp.com/dj-rest-auth/token/refresh/",
                { refresh: refreshToken }
            );

            localStorage.setItem("token", data.access);
            return data.access;
        } catch (error) {
            handleLogout();
            return null;
        }
    }, [handleLogout]);

    const fetchProfile = useCallback(async () => {
        let token = localStorage.getItem("token");
        if (!token) {
            handleLogout();
            return;
        }

        try {
            const userResponse = await axios.get(
                "https://habit-by-bit-django-afc312512795.herokuapp.com/dj-rest-auth/user/",
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const profileId = userResponse.data.pk;

            if (!profileId) {
                handleLogout();
                return;
            }

            const response = await axios.get(
                `https://habit-by-bit-django-afc312512795.herokuapp.com/profiles/${profileId}/`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setProfile(response.data);
        } catch (error) {
            if (error.response?.status === 401) {
                const newToken = await refreshToken();
                if (newToken) {
                    fetchProfile();
                }
            } else {
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