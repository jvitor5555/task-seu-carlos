const express = require('express');
const router = express.Router();

const authcontroller = require('../auth/authController');

router.post('/register', authcontroller.register);
router.post('/login',authcontroller.login);

module.exports = router