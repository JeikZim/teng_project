const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = async (req, res, next) => {
    if (req.method == "OPTIONS") return next();

    try {
        const token = req.headers.authorization.split(" ")[1];

        jwt.verify(token, config.get("jwtSecret"), (err, decoded) => {
            if (decoded.role !== root) {
                throw new Error("Access Denied");
            }
        });

        next();
    } catch (err) {
        return res.status(403).json({ messsage: "Access Denied" });
    }
};
