const config = require("config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator"); 
const AuthMiddleware = require("../middleware/auth.admin.middleware");

const rootId = config.get("rootId");
const rootName = config.get("rootName");
const rootPassword = config.get("rootPassword");
const hashedRootPassword = bcrypt.hash(rootPassword, 24);

// TODO: Реализовать количество попыток для входа с одного IP адреса в определённый временной промежуток

export const login = async (req, res) => {
    let isRoot = false;
    const isMatch = false;
    try {
        // TODO: Добавить валидацию 

        const { nickName, password } = req.body;

        if (nickName === rootName) {
            isMatch = await bcrypt.compare(password, hashedRootPassword);
            isRoot = true;
        } else {
            const admin = await Admin.findOne({ nickName });
            isMatch = await bcrypt.compare(password, admin.password);
        }

        if (!isMatch) {
            return res.status(400).json({
                message: "User with this email or password does not exist",
            });
        }

        const id = isRoot ? rootId : admin.id;

        const token = jwt.sign(
            { adminId: id, isRoot },
            config.get("jwtSecret"), {
            expiresIn: "1h",
        });

        res.status(200).json({ token, adminId: id });
    } catch (err) {
        res.staus(500).json({
            message: "Error with authentication",
        });
        console.error(err.message);
    }
};

export const creation = async (req, res) => {
    try {
        // const { nickName, password } = req.body;

        // if (nickName === rootName) {
        //     isMatch = await bcrypt.compare(password, hashedRootPassword);
        //     isRoot = true;
        // } else {
        //     const admin = await Admin.findOne({ nickName });
        //     isMatch = await bcrypt.compare(password, admin.password);
        // }

        // if (!isMatch) {
        //     return res.status(400).json({
        //         message: "User with this email or password does not exist",
        //     });
        // }

        // const id = isRoot ? rootId : admin.id;

        // const token = jwt.sign(
        //     { adminId: id, isRoot },
        //     config.get("jwtSecret"), {
        //     expiresIn: "1h",
        // });

        // res.status(200).json({ token, adminId: id });
    } catch (err) {
        res.staus(500).json({
            message: "Error creating admin",
        });
        console.error(err.message);
    }
};

export const removing = async (req, res) => {
    try {

    } catch (err) {
        res.staus(500).json({
            message: "Error removing admin",
        });
        console.error(err.message);
    }
};

export const update = async (req, res) => {
    try {
        
    } catch (err) {
        res.staus(500).json({
            message: "Error updating admin data",
        });
        console.error(err.message);
    }
};


export const rootCheck = async (req, res) => {

    try {
        // TODO: Добавить валидацию 

        const { password } = req.body;

        isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            AuthMiddleware(req, res, () => {})
            return res.status(400).json({
                message: "User with this email or password does not exist",
                error: "Wrong password"
            });
        }

        res.status(200).json({ adminId: config.get('rootId') });
    } catch (err) {
        res.staus(500).json({
            message: "Error with authentication",
        });
        console.error(err.message);
    }
};
