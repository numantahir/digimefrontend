import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "https://backend-brown-xi.vercel.app/api/";

// Create axios instance with default config
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Add request interceptor to handle token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("usertoken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Use the axios instance for all your API calls
export const register = newUser => {
    return axiosInstance
        .post('users/register', {
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
    return axiosInstance
        .post('users/login', {
            email: user.email,
            password: user.password
        })
        .then(response => {
            const token = response.data.token || response.data;
            localStorage.setItem("usertoken", token);
            return response.data;
        })
        .catch(err => {
            console.error("Login error:", err);
            throw err;
        });
};

export const ForgetPassword = user => {
    return axiosInstance
        .post('users/reset-password', {
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

export const getProfile = async () => {
    return await axiosInstance.get('users/profile');
};

export const updatePassword = async (payload) => {
    return await axiosInstance.post('users/resetpassword', payload);
};

export const sharedProfile = async (username) => {
    return await axiosInstance.get('users/share-profile', {
        params: { url: username }
    });
};

export const deleteSharedProfile = async (profileId) => {
    try {
        const token = localStorage.getItem("usertoken");
        if (!token) throw new Error("No auth token found");

        return await axiosInstance.delete(`saved-profiles/delete-profile/${profileId}`);
    } catch (error) {
        console.error("Error deleting profile:", error.response?.data || error.message);
        throw error;
    }
};

export const SaveSharedProfile = async (payload) => {
    return await axiosInstance.post('saved-profiles/save-profile', payload);
};

export const MySharedProfile = async () => {
    return await axiosInstance.get('saved-profiles/saved-profiles', {
        headers: {
            "Content-Type": "application/json"
        }
    });
};

export const getPlatforms = async () => {
    return await axiosInstance.get('social-media-platforms/platforms');
};

export const getSavedProfile = async () => {
    return await axiosInstance.get('saved-profiles/saved-profiles');
};

export const updateProfile = async (payload) => {
    return await axiosInstance.put('users/update', payload);
};

export const updateProfileImage = async (payload) => {
    return await axiosInstance.put('users/update-image', payload);
};

