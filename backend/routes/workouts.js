const express = require('express');
const { createWorkout, getWorkouts, getWorkout, deleteWorkout, updateWorkout } = require('../controllers/workoutController');

// Middleware
const requireAuth = require('../middleware/requireAuth');

// Create router
const router = express.Router();

// Fires auth checking function before all other routes (middleware)
router.use(requireAuth);

/* ROUTES */
// Get all workouts
router.get('/', getWorkouts);
// Get a single workout
router.get('/:id', getWorkout);
// Post a new workout
router.post('/', createWorkout);
// Delete a workout
router.delete('/:id', deleteWorkout);
// Update a workout
router.patch('/:id', updateWorkout);

// Export router with above routes
module.exports = router;
