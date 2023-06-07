const { Router } = require("express");
const { check } = require("express-validator");
const { login, registration } = require("../controllers/auth.controllers");
const AuthMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/adminData.middleware");
const checkRoleMiddleware = require("../middlewares/checkRole.middleware");
const isRootMiddleware = require("../middlewares/isRoot.middleware");

const router = Router();

router.post(
    "/login/admin",
    [
        check("email", "Invalid email").normalizeEmail().isEmail(),
        check("password", "Enter password").exists(),
        adminMiddleware,
    ],
    login
);

router.post(
    "/login/user",
    [
        check("email", "Invalid email").normalizeEmail().isEmail(),
        check("password", "Enter password").exists(),
    ],
    login
);

router.post(
    "/registration/admin",
    [
        check("email", "Invalid email").isEmail(),
        check("password", "Too short password").isLength({ min: 6 }),
        checkRoleMiddleware,
        isRootMiddleware,
    ],
    registration
);

router.post(
    "/registration/user",
    [
        check("email", "Invalid email").isEmail(),
        check("password", "Too short password").isLength({ min: 6 }),
        checkRoleMiddleware,
    ],
    registration
);

module.exports = router;
