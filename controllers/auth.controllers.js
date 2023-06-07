const config = require("config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const AuthMiddleware = require("../middlewares/auth.middleware");
const User = require("../models/User");

const root = {
    id: config.get("rootId"),
    email: config.get("rootName"),
    password: bcrypt.hash(config.get("rootPassword"), 24),
    role: "root",
};

// TODO: Реализовать количество попыток для входа с одного IP адреса в определённый временной промежуток

const login = async (req, res) => {
    let isRoot = false;
    const isMatch = false;
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Invalid user data",
            });
        }

        const { email, password } = req.body;

        if (email === root.email) {
            isRoot = true;
            isMatch = await bcrypt.compare(password, root.password);
        } else {
            const user = await User.findOne({ email });
            isMatch = await bcrypt.compare(password, user.password);
        }

        if (!isMatch) {
            return res.status(400).json({
                message: "User with this email or password does not exist",
            });
        }

        const id = isRoot ? root.id : user.id;
        const role = isRoot ? root.role : user.role;

        const token = jwt.sign({ id, role }, config.get("jwtSecret"), {
            expiresIn: "1h",
        });

        res.status(200).json({ token, id });
    } catch (err) {
        res.staus(500).json({
            message: "Error with authentication",
        });
        console.error(err.message);
    }
};

const registration = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Invalid user data",
            });
        }

        const { email, password, role } = req.body;

        if (await User.findOne({ email })) {
            return res.status(409).json({ message: "User alredy exist" });
        }

        const hashedPassword = bcrypt.hash(password, 24);
        const newUser = new User({
            email,
            password: hashedPassword,
            role,
        });

        await newUser.save();

        res.status(201).json({
            message: `User succesfully created with ${role} role.`,
        });
    } catch (err) {
        res.staus(500).json({
            message: "Error creating",
        });
        console.error(err.message);
    }
};

module.exports = { login, registration } 





// export const rootCheck = async (req, res) => {
//     try {
//         // TODO: Добавить валидацию

//         const { password } = req.body;

//         isMatch = await bcrypt.compare(password, admin.password);

//         if (!isMatch) {
//             AuthMiddleware(req, res, () => {});
//             return res.status(400).json({
//                 message: "User with this email or password does not exist",
//                 error: "Wrong password",
//             });
//         }

//         res.status(200).json({ adminId: root.id });
//     } catch (err) {
//         res.staus(500).json({
//             message: "Error with authentication",
//         });
//         console.error(err.message);
//     }
// };
