import axios from "axios";

const API_BASE_URL = "https://backend-brown-xi.vercel.app/api/";

export const register = newUser => {
    return axios
        .post("https://backend-brown-xi.vercel.app/api/users/register", {
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email,
            password: newUser.password
        })
        .then(response => {
            console.log("Registered");
        });
};

export const login = user => {
    return axios
        .post("https://backend-brown-xi.vercel.app/api/users/login", {
            email: user.email,
            password: user.password
        })
        .then(response => {
            localStorage.setItem("usertoken", response.data);
            return response.data;
        })
        .catch(err => {
            console.log(err);
        });
};

export const ForgetPassword = user => {
    return axios
        .post("https://backend-brown-xi.vercel.app/api/users/reset-password", {
            email: user.email
        })
        .then(response => {
            console.log("Email Send.");
        })
        .catch(err => {
            console.log(err);
        });
};

export const getProfile = async () => {
    return await axios
        .get("https://backend-brown-xi.vercel.app/api/users/profile", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("usertoken")}`
            }
        })
}

export const updatePassword = async (payload) => {
    return await axios
        .post("https://backend-brown-xi.vercel.app/api/users/resetpassword", payload, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("usertoken")}`
            }
        })
}

export const sharedProfile = async (username) => {
    return await axios.get(`https://backend-brown-xi.vercel.app/api/users/share-profile`, {
        params: { url: username }
    });
};

export const deleteSharedProfile = async (profileId) => {
    try {
        const token = localStorage.getItem("authToken");
        // alert(' > ' + profileId + ' --- ' + token);
        console.log("Token in API function:", token); // Debugging

        if (!token) throw new Error("No auth token found");

        const response = await axios.delete(
            `https://backend-brown-xi.vercel.app/api/saved-profiles/delete-profile/${profileId}`,
            {
                headers: {
                     Authorization: `Bearer ${localStorage.getItem("usertoken")}`
                },
            }
        );

        console.log("API response:", response.data);
        return response;
    } catch (error) {
        console.error("Error deleting profile:", error.response?.data || error.message);
        throw error;
    }
};


export const SaveSharedProfile = async (payload) => {
    return await axios
        .post("https://backend-brown-xi.vercel.app/api/saved-profiles/save-profile", payload, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("usertoken")}`
            }
        })
}

export const MySharedProfile = async () => {
    return await axios.get(
        "https://backend-brown-xi.vercel.app/api/saved-profiles/saved-profiles",
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
                "Content-Type": "application/json",
            }
        }
    );
};

export const getPlatforms = async () => {
    return await axios
        .get("https://backend-brown-xi.vercel.app/api/social-media-platforms/platforms", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("usertoken")}`
            }
        })
}
export const getSavedProfile = async () => {
    return await axios
        .get("https://backend-brown-xi.vercel.app/api/saved-profiles/saved-profiles", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("usertoken")}`
            }
        })
}

export const updateProfile = async (payload) => {
    return await axios
        .put("https://backend-brown-xi.vercel.app/api/users/update", payload, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("usertoken")}`
            }
        })
}

export const updateProfileImage = async (payload) => {
    return await axios
        .put("https://backend-brown-xi.vercel.app/api/users/update-image", payload, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("usertoken")}`
            }
        })
}

