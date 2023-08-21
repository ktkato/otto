// server.js

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

// Sample user credentials for demonstration purposes
const validUser = {
    username: 'test',
    password: 'test'
};

// Middleware to check if a user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/');
    }
};

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === validUser.username && password === validUser.password) {
        req.session.user = username;
        res.redirect('/dashboard');
    } else {
        res.send('Invalid username or password');
    }
});

app.get('/dashboard', isAuthenticated, (req, res) => {
    res.send(`Welcome to the dashboard, ${req.session.user}!`);
});

app.use(express.static('public'));

app.get('/', (req, res) => {
    if (req.session.user) {
        res.redirect('/dashboard');
    } else {
        res.sendFile(__dirname + '/public/index.html');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
