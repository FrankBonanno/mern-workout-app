const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// static signup method
// must be normal function to use 'this.'
userSchema.statics.signup = async function (email, password) {
    // input validation
    if (!email || !password) {
        throw Error('All fields must be filled!');
    }
    if (!validator.isEmail(email)) {
        throw Error('Please enter a valid email!');
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough!');
    }

    // check if email is signed up already
    const emailExists = await this.findOne({ email });
    if (emailExists) {
        throw Error('That email is already signed up!');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ email, password: hash });

    return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
    // input validation
    if (!email || !password) {
        throw Error('All fields must be filled!');
    }

    // check if email is signed up already
    const user = await this.findOne({ email });
    if (!user) {
        throw Error('Incorrect Email!');
    }

    // Try to match hashed version of passwords
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw Error('Incorrect Password!');
    }

    return user;
};

module.exports = mongoose.model('User', userSchema);
