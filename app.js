const express = require('express');
const config = require('config');
// const path = require('path');
// const mongoose = require('mongoose');

const PORT = config.get('PORT') || 5000;

const app = express();

// Middlewares use
app.use(express.json({extended: true}));

app.get('/', () => {

});

app.listen(PORT, () => {
    console.log(`Server start on port: ${PORT}`);
})
