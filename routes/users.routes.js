const { Router } = require("express");
const { check } = require("express-validator");
const { removing } = require("../controllers/users.controllers");
const AuthMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/adminData.middleware");
const checkRoleMiddleware = require("../middlewares/checkRole.middleware")
const isRootMiddleware = require("../middlewares/isRoot.middleware")

const router = Router();


router.delete(
    "/removing", 
    [
        check("email", "Invalid email").isEmail(),
        isRootMiddleware
    ], 
    removing
);

module.exports = router;
