const handleLogin = async (credentials) => {
    try {
        const response = await login(credentials);
        // Make sure we're getting a string token
        const token = response.token || response;
        if (typeof token === 'object') {
            localStorage.setItem('usertoken', token.token || JSON.stringify(token));
        } else {
            localStorage.setItem('usertoken', token);
        }
        // Handle successful login
    } catch (error) {
        console.error('Login failed:', error);
        // Handle login error
    }
}; 