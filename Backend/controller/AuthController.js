const session = require('express-session');
const User = require('../models/User'); // Adjust the path to your User model
const Role = require('../models/Role');

const auth = async (req, res, next) => {

    try {
        if (!req.session.user) {
            return res.status(401).json("Please login");
        }
        next();
    } catch (e) {
        return res.status(500).json("Something went wrong!!");
    }
};

const getProfile = async (req, res, next) => {

    try {
        const data = await User.findOne({ where: { email: req.session.user.email }, include: [Role] })
        const transformedData = {
            name: data.username,
            email: data.email,
            role: data.Role && data.Role.dataValues ? data.Role.dataValues.roleName : 'No Role'
        };
        console.log(data);
        return res.status(200).json(transformedData);
    } catch (e) {
        return res.status(500).json("Something went wrong!!");
    }
}

const destroySession = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Failed to log out');
        }
        // Clear the session cookie from the client-side
        res.clearCookie('connect.sid');
        return res.status(200).json("Session Destroyed");
    });

}
module.exports = { auth, destroySession, getProfile };
