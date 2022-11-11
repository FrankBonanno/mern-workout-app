import { WorkoutsContext } from '../context/WorkoutContext';
import { useContext } from 'react';

/* Returns value of context which is the value of the provider component wrapping
   the entire App, therefore the entire app has access to the context (state, dispatch) */
export const useWorkoutsContext = () => {
    const ctx = useContext(WorkoutsContext);

    if (!ctx) {
        throw Error('useWorkoutsContext must be used inside a WorkoutsContextProvider');
    }

    return ctx;
};
