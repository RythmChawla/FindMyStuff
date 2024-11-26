const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: true
}));

// Placeholder for user data
let users = [];

app.post('/login-action', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email);

    if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
        res.redirect('/index.html');
    } else {
        res.send('Invalid email or password');
    }
});

app.post('/signup-action', (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    users.push({ name, email, password: hashedPassword });
    res.redirect('/login.html');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});