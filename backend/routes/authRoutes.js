const express = require('express');
const AuthController = require('../controllers/authController.js');

const router = express.Router();

router.post('/login', AuthController.login); //rota pubicla nao precisa de token
router.post('/forgot_password', AuthController.forgotPassword);
router.post('/reset_password', AuthController.resetPassword);
module.exports = router;