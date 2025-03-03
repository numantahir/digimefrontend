const handleLogin = async (credentials) => {
    try {
        const response = await login(credentials);
        
        // Debug logs
        console.log('Login response:', response);
        
        if (response.status && response.data && response.data.token) {
            // Login successful
            const storedToken = localStorage.getItem("usertoken");
            console.log('Stored token:', storedToken);
            return true;
        } else {
            throw new Error(response.message || 'Login failed');
        }
    } catch (error) {
        console.error('Login failed:', error);
        // Handle login error (show error message to user)
        return false;
    }
}; 