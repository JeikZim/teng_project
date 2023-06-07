const config = require("config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const AuthMiddleware = require("../middlewares/auth.middleware");
const User = require("../models/User");

const removing = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Invalid user data",
            });
        }
        
        const { email } = req.body;
        const token = req.headers.authorization.split(" ")[1];

        jwt.verify(token, config.get("jwtSecret"), (err, decoded) => {
            if (err) {
                throw new Error('Access Denied') 
            } else {
                User.findOneAndDelete(email);
            }
        });

        res.status(200).json({ message: "User successfully deleted" })
    } catch (err) {
        res.staus(500).json({
            message: "Error removing admin",
        });
        console.error(err.message);
    }
};

module.exports = { removing } 