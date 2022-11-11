import React, { useState } from 'react';
/* CUSTOM HOOKS */
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext();
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        // prevent refresh
        e.preventDefault();

        const workout = { title, load, reps };

        // Req to post a new workout
        const res = await fetch('http://localhost:4000/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const json = await res.json();

        if (!res.ok) {
            setError(json.error);
        }

        if (res.ok) {
            // Clear form
            setTitle('');
            setLoad('');
            setReps('');
            // Clear err
            setError(null);
            console.log('New Workout Added:', json);
            dispatch({ type: 'CREATE_WORKOUT', payload: json });
        }
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add A New Workout</h3>

            <label>Excercise Title:</label>
            <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} />

            <label>Load (in kg):</label>
            <input type="number" onChange={(e) => setLoad(e.target.value)} value={load} />

            <label>Reps:</label>
            <input type="number" onChange={(e) => setReps(e.target.value)} value={reps} />

            <button type="submit">Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default WorkoutForm;
