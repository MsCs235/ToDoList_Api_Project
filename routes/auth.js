const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');

// Sign up route
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
    // Check if the email already exists
    let user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ msg: 'User already exists' });
    }

    // Create a new user
    const hashedPassword = await bcrypt.hash(password, 10);  // Hash the password
    user = new User({
        name,
        email,
        password: hashedPassword
    });

    await user.save();
    res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
    res.status(500).json({ msg: 'Server error' });
    }
});


// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Store user information in session
        req.session.user = {
        id: user._id,
        username: user.username,
        email: user.email
        };

        res.status(200).json({ msg: 'Login successful', user: req.session.user });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});


// Logout route
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ msg: 'Logout failed' });
        }

        res.clearCookie('connect.sid'); // Clear the session cookie
        res.status(200).json({ msg: 'Logout successful' });
    });
});


module.exports = router;
