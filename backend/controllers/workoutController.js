const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

// get all workouts
const getWorkouts = async (req, res) => {
    const user_id = req.user._id;

    // store all workouts created with the provided user_id in an array sorted by which was created most recently
    const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });
    // Return response of 200 and workouts as a JSON object
    res.status(200).json(workouts);
};

// get a single workout
const getWorkout = async (req, res) => {
    // get id from req params
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Could not find a workout with that ID!' });
    }

    const workout = await Workout.findById(id);
    if (!workout) {
        return res.status(404).json({ error: 'Could not find a workout with that ID!' });
    }

    res.status(200).json(workout);
};

// create a new workout
const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body;

    let emptyFields = [];
    if (!title) {
        emptyFields.push('title');
    }
    if (!load) {
        emptyFields.push('load');
    }
    if (!reps) {
        emptyFields.push('reps');
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields!', emptyFields });
    }

    // Create new workout with model and add to DB
    try {
        const user_id = req.user._id;
        const workout = await Workout.create({ title, load, reps, user_id });
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Could not delete a workout with that ID!' });
    }

    const workout = await Workout.findOneAndDelete({ _id: id });
    if (!workout) {
        return res.status(400).json({ error: 'Could not delete workout with that ID!' });
    }

    res.status(200).json(workout);
};

// update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Could not update a workout with that ID!' });
    }

    const workout = await Workout.findOneAndUpdate(
        { _id: id },
        {
            ...req.body,
        }
    );
    if (!workout) {
        return res.status(400).json({ error: 'Could not delete workout with that ID!' });
    }

    res.status(200).json(workout);
};

module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout,
};
