'use strict';
const express = require("express");
const cors = require("cors");
const fs = require("fs-extra");
const helmet = require("helmet");
const path = require('path');
const rateLimit = require("express-rate-limit");
const getIP = require('ipware')().get_ip;
const checkIPBlocked = require('./blockIp.js');

const app = express();
const server = require("./server.js");

const blockedIPs = JSON.parse(fs.readFileSync('./blockedIP.json', { encoding: 'utf-8' }));

// Rate limiting and IP blocking
const handleBlockIP = rateLimit({
    windowMs: 60 * 1000,
    max: 650,
    handler: function (req, res, next) {
        const ipInfo = getIP(req);
        const ip = ipInfo.clientIp;
        if (!blockedIPs.includes(ip)) {
            blockedIPs.push(ip);
            fs.writeFileSync('./blockedIP.json', JSON.stringify(blockedIPs, null, 2));
            console.log(`[ RATE LIMIT ] → Đã block IP: ${ip}`);
        }
        next();
    }
});

// Middleware setup
app.use(handleBlockIP);
app.use(checkIPBlocked);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  // To parse form data
app.use(cors());

// Path to the users file
const usersFilePath = path.join(__dirname, 'web', 'login', 'users.json');

// Initialize users as an empty array
let users = [];
try {
    // Read and parse the JSON file
    const usersData = fs.readFileSync(usersFilePath, 'utf-8');
    users = JSON.parse(usersData);
} catch (err) {
    console.error("Error reading users file:", err);
}

// Ensure users is an array
if (!Array.isArray(users)) {
    console.error("Users data is not an array");
    users = [];
}

// Static file serving
app.use(express.static(path.join(__dirname, 'web', 'login')));

// Routes
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'web', 'login', 'login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'web', 'login', 'register.html'));
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Simple authentication logic
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        res.redirect('/dash');  // Redirect to dashboard page on successful login
    } else {
        res.redirect('/login?error=1');  // Redirect with error parameter on login failure
    }
});

app.post('/register', (req, res) => {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        res.redirect('/register?error=1');  // Redirect with error parameter
        return;
    }

    // Add new user
    const newUser = { username, password };
    users.push(newUser);
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    res.redirect('/login?success=1');  // Redirect with success parameter
});

app.get('/dash', (req, res) => {
    res.sendFile(path.join(__dirname, 'web', 'login', 'dash.html'));
});

app.use("/", server);

// Error handling
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({ message: error.message });
});

// Server setup
app.set('port', (process.env.PORT || 8080));
app.listen(app.get('port'), function() {
    console.log(`Server running on port ${app.get('port')}`);
});
