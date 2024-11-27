const express = require('express');
require('dotenv').config();
require('./models/RelationshipMapping');

const userRoute = require('./routes/user');
const roleRoute = require('./routes/role');
const loginRoute = require('./routes/login');
const authRoute = require('./routes/auth');
const permissionRoute = require('./routes/permission');
const cors = require('cors');
const app = express();
const session = require('express-session');

app.use(cors({
    origin: 'http://localhost:5173',  // Allow frontend to make requests
    credentials: true,               // Allow cookies to be sent with requests
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        sameSite: 'lax', // Helps with CSRF protection
        maxAge: 1000 * 60 * 60 * 24,//After 1 day, expiry!
    }
}))


app.use('/role', roleRoute);
app.use('/permission', permissionRoute);
app.use('/user', userRoute);
app.use('/login', loginRoute);
app.use('/auth', authRoute);



app.listen(process.env.SERVER_PORT, () => {
    console.log("Server Connection Built!", process.env.SERVER_PORT);

});