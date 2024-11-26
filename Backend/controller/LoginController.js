const User = require('../models/User'); // Adjust the path to your User model

const verifyUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find the user with matching email and plaintext password
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Attach user to the request object
        // req.user = user;

    } catch (error) {
        console.error('Error in verifyUser:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = verifyUser;
