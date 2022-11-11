require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const workoutRoutes = require('./routes/workouts');

// Express App
const app = express();

const cors = require('cors');

/* Middlewares */
app.use(cors());
// Sees if a req has a body, if so it passes and attaches it to the req object
app.use(express.json());
// Request Logger
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Routes
app.use('/api/workouts', workoutRoutes);

// Connect to db
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        // Listen for requests on port from .env once connected to db
        app.listen(process.env.PORT, () => {
            console.log('Connected to MongoDB > Listening On Port 4000 ...');
        });
    })
    .catch((error) => {
        console.log(error);
    });
