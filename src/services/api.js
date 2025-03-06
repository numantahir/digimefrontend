import axios from "axios";
// console.log('Testing ENV Getting or Not>>>>', process.env.REACT_APP_Frontend_Url);
// const API_BASE_URL = process.env.REACT_APP_API_URL || "https://digime.novatore-solutions.com/api/";
const API_BASE_URL = process.env.REACT_APP_API_URL || "https://backend-brown-xi.vercel.app/api/";

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const logout = () => {
    try {
        localStorage.removeItem("usertoken");
        return true;
    } catch (error) {
        console.error("Logout error:", error);
        return false;
    }
};

export const register = newUser => {
    return axios
        .post(API_BASE_URL + "users/register", {
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email,
            password: newUser.password
        })
        .then(response => {
            console.log("Registered");
        });
};

export const login = async(user) => {
    return axios.post(`${API_BASE_URL}users/login`, {
        email: user.email,
        password: user.password
    })
    .then((response) => {
        // console.log("Login response data:", response.data.data.token); 
        let token = response.data.data.token;

        if (!token || typeof token !== 'string') {
            console.error("Received invalid token:", token);
            throw new Error('Invalid token received from server');
        }
        console.log('User Login Working');
        localStorage.setItem("usertoken", JSON.stringify(response.data.data.token));

        // console.log("Token stored:", token);

        return response.data;
    })
    .catch((err) => {
        console.error("Login error:", err);
        throw err;
    });
};



// export const login = (user) => {
//     return axios.post(`${API_BASE_URL}users/login`, {
//         email: user.email,
//         password: user.password
//     })
//     .then((response) => {
//         let token;
//         console.log("Login response data:", response.data);
//         if (response.data.data && response.data.data.token) {
//             token = response.data.data.token;
//         } else if (response.data.token) {
//             token = response.data.token;
//         }

//         if (token) {
//             localStorage.setItem("usertoken", token);
//             console.log("Token stored:", token);
//         } else {
//             console.error("No token in response:", response.data);
//             throw new Error('No token received from server');
//         }

//         return response.data;
//     })
//     .catch((err) => {
//         console.error("Login error:", err);
//         throw err;
//     });
// };

export const ForgetPassword = user => {
    return axios
        .post(API_BASE_URL + "users/reset-password", {
            email: user.email
        })
        .then(response => {
            console.log("Email Send.");
        })
        .catch(err => {
            console.log(err);
        });
};

const getAuthHeader = () => {
    const token = localStorage.getItem("usertoken");
    if (!token) return {};

    return {
        Authorization: `Bearer ${token}`
    };
};

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("usertoken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// export const getProfile = async () => {
//     try {
//         // alert('GetProfileSection');
//         // const token = localStorage.getItem("usertoken");
//         console.log("Secret Key:", process.env.SECRET_KEY);
//         const token_new = localStorage.getItem("usertoken");
// const decoded = JSON.parse(atob(token_new.split('.')[1])); 
// console.log("Decoded Token:", decoded);
// console.log("Token Expiry:", new Date(decoded.exp * 1000).toUTCString());

//         let token = localStorage.getItem("usertoken")?.trim();
//         console.log('Token ...> ',token);
//         try {
//             // token = JSON.parse(token); // Convert back to object if necessary
//         } catch (e) {
//             console.warn("Token is already a string.");
//         }
//         if (!token) {
//             throw new Error("No auth token found");
//         }

//         const response = await axios.get(`${API_BASE_URL}users/profile`, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         });
//         return response.data;
//     } catch (error) {
//         console.error("Profile fetch error:", error);
//         if (error.response?.status === 401) {
//             logout();
//         }
//         throw error;
//     }
// };

export const getProfile = async () => {
        // const token_new = localStorage.getItem("usertoken");
        // const decoded = JSON.stringify(token_new); 
    return await axios
        .get(API_BASE_URL + "users/profile", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("usertoken")}`
            }
        })
}

export const updatePassword = async (payload) => {
    return await axios
        .post(API_BASE_URL + "users/resetpassword", payload, {
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
        console.log("Token in API function:", token);

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
        .post(API_BASE_URL + "saved-profiles/save-profile", payload, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("usertoken")}`
            }
        })
}

export const MySharedProfile = async () => {
    return await axios.get(
        API_BASE_URL + "saved-profiles/saved-profiles",
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
        .get(API_BASE_URL + "social-media-platforms/platforms", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("usertoken")}`
            }
        })
}
export const getSavedProfile = async () => {
    return await axios
        .get(API_BASE_URL + "saved-profiles/saved-profiles", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("usertoken")}`
            }
        })
}

export const updateProfile = async (payload) => {
    try {
        const response = await getProfile(); // First get current profile to get the ID
        const userId = response.data.id; // Extract user ID from profile data

        // Add the ID to the payload
        const updatedPayload = {
            ...payload,
            id: userId
        };

        return await axios.put(
            `${API_BASE_URL}users/update`,
            updatedPayload,
            { headers: getAuthHeader() }
        );
    } catch (error) {
        console.error("Error updating profile:", error);
        throw error;
    }
};

export const updateProfileImage = async (payload) => {
    return await axios
        .put(API_BASE_URL + "users/update-image", payload, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("usertoken")}`
            }
        })
}

export const checkToken = () => {
    const token = localStorage.getItem("usertoken");
    console.log('Stored token:', token);
    console.log('Token type:', typeof token);
    return token;
};

