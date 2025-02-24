import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create a context to store and provide profile data
const ProfileContext = createContext();

// Custom hook to access the profile context
export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
    // State to store the user's profile information
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        // Function to fetch the user's profile data from the API
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    // Fetch user details to get profile ID
                    const userResponse = await axios.get(
                        "https://habit-by-bit-django-afc312512795.herokuapp.com/dj-rest-auth/user/",
                        {
                            headers: { Authorization: `Bearer ${token}` },
                        }
                    );
                    const profileId = userResponse.data.pk;

                    // Fetch profile data using the retrieved profile ID
                    const response = await axios.get(
                        `https://habit-by-bit-django-afc312512795.herokuapp.com/profiles/${profileId}/`,
                        {
                            headers: { Authorization: `Bearer ${token}` },
                        }
                    );

                    // Store profile data in state
                    setProfile(response.data);
                }
            } catch (error) {
            }
        };

        fetchProfile();
    }, []);

    return (
        <ProfileContext.Provider value={{ profile, setProfile }}>
            {children}
        </ProfileContext.Provider>
    );
};