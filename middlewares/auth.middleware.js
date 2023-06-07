const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
    if (req.method == "OPTIONS") return next();

    try {
        const token = req.headers.authorization.split(" ")[1];
        let isExpire = false;

        if (!token) {
            return res.status(401).json({ message: "User not authorized" });
        }

        jwt.verify(token, config.get("jwtSecret"), (err, decoded) => {
            if (err) {
                isExpire = err.message === 'jwt expired';
            } else {
                req.user = decoded;
            }
        });
        if (isExpire) {
            return res.status(200).json({ isExpire });
        } 

        next();
    } catch (err) {
        
    }
}