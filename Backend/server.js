const express = require('express');
require('dotenv').config();
require('./models/RelationshipMapping');
const app = express();

app.listen(process.env.SERVER_PORT, () => {
    console.log("Server Connection Built!", process.env.SERVER_PORT);

})