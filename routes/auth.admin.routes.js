const { Router } = require('express');
const { check } = require("express-validator"); 
const admin = require('../controllers/auth.admin.controllers')
const AuthMiddleware = require("../middleware/auth.admin.middleware");


const router = Router();

router.post('/root-check', [], admin.rootCheck);

router.post('/login', [], admin.login);

router.post('/creation', [], admin.creation);

router.delete('/removing', [], admin.removing);

router.put('/update', [], admin.update);