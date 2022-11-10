const express = require('express');
// Create router
const router = express.Router();

/* ROUTES */
// Get all workouts
router.get('/', (req, res) => {
    res.json({ msg: '[GET] all workouts ' });
});
// Get a single workout
router.get('/:id', (req, res) => {
    res.json({ msg: '[GET] a single workout' });
});
// Post a new workout
router.post('/', (req, res) => {
    // req.body()
    res.json({ msg: '[POST] a new workout' });
});
// Delete a workout
router.delete('/:id', (req, res) => {
    res.json({ msg: '[DELETE] a workout' });
});
// Update a workout
router.patch('/:id', (req, res) => {
    res.json({ msg: '[UPDATE] a workout' });
});

// Export router with above routes
module.exports = router;
