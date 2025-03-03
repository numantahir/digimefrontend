import axios from "axios";

const API_BASE_URL = "https://backend-brown-xi.vercel.app/api/";

export const register = newUser => {
    return axios
        .post(`${API_BASE_URL}users/register`, {
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email,
            password: newUser.password
        })
        .then(response => {
            console.log("Registered");
            return response;
        });
};

export const login = user => {
    return axios
        .post(`${API_BASE_URL}users/login`, {
            email: user.email,
            password: user.password
        })
        .then(response => {
            // Store token as string
            const token = response.data.token || response.data;
            localStorage.setItem("usertoken", token);
            return response.data;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

export const ForgetPassword = user => {
    return axios
        .post(`${API_BASE_URL}users/reset-password`, {
            email: user.email
        })
        .then(response => {
            console.log("Email Sent");
            return response;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

// Helper function to get auth header
const getAuthHeader = () => {
    const token = localStorage.getItem("usertoken");
    return {
        Authorization: `Bearer ${token}`
    };
};

export const getProfile = async () => {
    return await axios.get(`${API_BASE_URL}users/profile`, {
        headers: getAuthHeader()
    });
};

export const updatePassword = async (payload) => {
    return await axios.post(`${API_BASE_URL}users/resetpassword`, 
        payload, 
        { headers: getAuthHeader() }
    );
};

export const sharedProfile = async (username) => {
    return await axios.get(`${API_BASE_URL}users/share-profile`, {
        params: { url: username }
    });
};

export const deleteSharedProfile = async (profileId) => {
    try {
        const token = localStorage.getItem("usertoken");
        if (!token) throw new Error("No auth token found");

        return await axios.delete(
            `${API_BASE_URL}saved-profiles/delete-profile/${profileId}`,
            { headers: getAuthHeader() }
        );
    } catch (error) {
        console.error("Error deleting profile:", error.response?.data || error.message);
        throw error;
    }
};

export const SaveSharedProfile = async (payload) => {
    return await axios.post(
        `${API_BASE_URL}saved-profiles/save-profile`,
        payload,
        { headers: getAuthHeader() }
    );
};

export const MySharedProfile = async () => {
    return await axios.get(
        `${API_BASE_URL}saved-profiles/saved-profiles`,
        {
            headers: {
                ...getAuthHeader(),
                "Content-Type": "application/json"
            }
        }
    );
};

export const getPlatforms = async () => {
    return await axios.get(
        `${API_BASE_URL}social-media-platforms/platforms`,
        { headers: getAuthHeader() }
    );
};

export const getSavedProfile = async () => {
    return await axios.get(
        `${API_BASE_URL}saved-profiles/saved-profiles`,
        { headers: getAuthHeader() }
    );
};

export const updateProfile = async (payload) => {
    return await axios.put(
        `${API_BASE_URL}users/update`,
        payload,
        { headers: getAuthHeader() }
    );
};

export const updateProfileImage = async (payload) => {
    return await axios.put(
        `${API_BASE_URL}users/update-image`,
        payload,
        { headers: getAuthHeader() }
    );
};

