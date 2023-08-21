// public/js/authentication.js

// Sample user credentials for demonstration purposes
const validUser = {
    username: 'test',
    password: 'test'
};

// Function to handle user login
const handleLogin = (event) => {
    event.preventDefault();

    const loginForm = document.getElementById('login-form');
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    if (username === validUser.username && password === validUser.password) {
        // Store user data in localStorage
        const userData = { username };
        localStorage.setItem('user', JSON.stringify(userData));

        // Redirect to dashboard
        window.location.href = '/dashboard';
    } else {
        alert('Invalid username or password');
    }
};

// Function to handle user logout
const handleLogout = () => {
    // Remove user data from localStorage
    localStorage.removeItem('user');
    // Redirect to login page
    window.location.href = '/';
};

// Set up event listeners
document.addEventListener('DOMContentLoaded', () => {
    const logoutLink = document.getElementById('logout-link');
    const loginForm = document.getElementById('login-form');
    
    if (logoutLink) {
        logoutLink.addEventListener('click', handleLogout);
    }
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});
