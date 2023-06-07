const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = async (req, res, next) => {
    if (req.method == "OPTIONS") return next();

    try {
        const user = await User.findOne({ email: req.body.email })

        if (user.role !== 'admin') {
            return res.status(403)
            .json({ message: "Access Denied" })
        }

        next();
    } catch (err) {
        return res.status(403).json({ messsage: "Something was wrong in accesss checking" })
    }
}