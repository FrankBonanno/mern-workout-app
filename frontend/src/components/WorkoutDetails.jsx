import React from 'react';
/* CUSTOM HOOKS */
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

import DeleteIcon from '../assets/delete.svg';

const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutsContext();

    const handleClick = async () => {
        const res = await fetch('http://localhost:4000/api/workouts/' + workout._id, {
            method: 'DELETE',
        });

        const json = await res.json();

        if (res.ok) {
            dispatch({ type: 'DELETE_WORKOUT', payload: json });
        }
    };

    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p>
                <strong>Load (kg): </strong>
                {workout.load}
            </p>
            <p>
                <strong>Reps: </strong>
                {workout.reps}
            </p>
            <p>{workout.createdAt}</p>
            <span onClick={handleClick}>X</span>
        </div>
    );
};

export default WorkoutDetails;
