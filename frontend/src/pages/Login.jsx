import React, { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(email, password);
    };

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h3>Log In</h3>

            <label>Email:</label>
            <input type="email" onChange={(event) => setEmail(event.target.value)} value={email} />

            <label>Password:</label>
            <input type="password" onChange={(event) => setPassword(event.target.value)} value={password} />

            <button type="submit">Log In</button>
        </form>
    );
};

export default Login;
