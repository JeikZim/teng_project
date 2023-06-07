const express = require('express');
const config = require('config');
const path = require('path');
const mongoose = require('mongoose');

const PORT = config.get('PORT') || 5000;

const app = express();

// Middlewares use
app.use(express.json({extended: true}));
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/users', require('./routes/users.routes'))

async function start() {
    try {
        await mongoose.connect(config.get('mongoUrl'), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        app.listen(PORT, () => {
            console.log(`Server start on port: ${PORT}`);
        })
    } catch (err) {
        console.log('Server error: ', err.message);
        process.exit(1);
    }
}

start()
