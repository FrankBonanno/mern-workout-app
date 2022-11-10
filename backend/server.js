require('dotenv').config();
const express = require('express');

const workoutRoutes = require('./routes/workouts');

// Express App
const app = express();

/* Middlewares */
// Sees if a req has a body, if so it passes and attaches it to the req object
app.use(express.json());
// Request Logger
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Routes
app.use('/api/workouts', workoutRoutes);

// Listen for requests on port from .env
app.listen(process.env.PORT, () => {
    console.log('Listening On Port 4000 ...');
});
