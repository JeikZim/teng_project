const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = async (req, res, next) => {
    if (req.method == "OPTIONS") return next();

    try {
        const role = req.body.role

        if ( role !== 'admin' || role !== 'user' ) {
            return res.status(400)
            .json({ message: "Invalid role" })
        }

        next();
    } catch (err) {
        return res.status(400).json({ messsage: "Something was wrong in role checking" })
    }
}