const userModel = require('../models/userModel');
const User = require('../models/userModel');

// Login User
const loginUser = async (req, res) => {
    res.json({ msg: 'Login User' });
};

// Sign Up User
const signupUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.signup(email, password);

        res.status(200).json({ email, user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { loginUser, signupUser };
