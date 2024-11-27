const session = require('express-session');
const User = require('../models/User'); // Adjust the path to your User model
const Role = require('../models/Role');
const Permission = require('../models/Permission');

const verifyUser = async (req, res, next) => {
    try {
        const { email, passwordHash } = req.body;
        console.log(req.body);

        // Validate input
        if (!email || !passwordHash) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find the user with matching email and plaintext password
        const user = await User.findOne({ where: { email, passwordHash } });
        // console.log(user);

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Attach user to the session object
        req.session.user = user;
        console.log(req.session.user);

        const userData = User.findAll({ where: { email } }, { include: [Role, Permission] });
        return res.status(200).json(userData);


    } catch (error) {
        console.error('Error in verifyUser:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { verifyUser };
