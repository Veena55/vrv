const express = require('express');
require('dotenv').config();
require('./models/RelationshipMapping');

const userRoute = require('./routes/user');
const roleRoute = require('./routes/role');
const permissionRoute = require('./routes/permission');
const cors = require('cors');
const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/role', roleRoute);
app.use('/permission', permissionRoute);
app.use('/user', userRoute);

app.listen(process.env.SERVER_PORT, () => {
    console.log("Server Connection Built!", process.env.SERVER_PORT);

});