import React from 'react';
/* CUSTOM HOOKS */
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';

/* DATE FNS */
import formatDistancetoNow from 'date-fns/formatDistanceToNow';

import DeleteIcon from '../assets/delete.svg';

const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();

    const handleClick = async () => {
        if (!user) {
            return;
        }

        const res = await fetch('/api/workouts/' + workout._id, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
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
            <p>{formatDistancetoNow(new Date(workout.createdAt), { addSuffix: true })}</p>
            <span onClick={handleClick}>
                <img src={DeleteIcon} />
            </span>
        </div>
    );
};

export default WorkoutDetails;
