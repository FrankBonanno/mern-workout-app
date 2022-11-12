const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuth = async (req, res, next) => {
    // verify authentication
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: 'Authorization Token Required!' });
    }

    // in form 'Bearer asdasdasd.ahagdbsa.asdsadsad' second part is token
    const token = authorization.split(' ')[1];

    try {
        const { _id } = jwt.verify(token, process.env.SECRET);

        // Add a user property to the req for all following middleware to use but only attach the _id
        req.user = await User.findOne({ _id }).select('_id');
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: 'Request Is Not Authorized!' });
    }
};

module.exports = requireAuth;
