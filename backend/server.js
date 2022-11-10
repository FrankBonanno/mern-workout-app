require('dotenv').config();
const express = require('express');

// Express App
const app = express();

// Middlewares
app.use((req, res, next) => {
    // Request Logger
    console.log(req.path, req.method);
    next();
});

// Routes
app.get('/', (req, res) => {
    res.json({ msg: 'Welcome to the app' });
});

// Listen for requests on port from .env
app.listen(process.env.PORT, () => {
    console.log('Listening On Port 4000 ...');
});
