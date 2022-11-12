import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

/* Returns value of context which is the value of the provider component wrapping
   the entire App, therefore the entire app has access to the context (state, dispatch) */
export const useAuthContext = () => {
    const ctx = useContext(AuthContext);

    if (!ctx) {
        throw Error('useAuthContext must be used inside a AuthContextProvider');
    }

    return ctx;
};
