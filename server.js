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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'test' && password === 'test') {
        req.session.user = username;
        res.redirect('/dashboard');
    } else {
        res.send('Invalid username or password');
    }
});

app.get('/dashboard', (req, res) => {
    if (req.session.user) {
        res.send(`Welcome to the dashboard, ${req.session.user}!`);
    } else {
        res.redirect('/');
    }
});

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});
