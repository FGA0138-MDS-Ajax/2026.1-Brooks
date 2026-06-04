const express = require('express');
const AuthController = require('../controllers/authController.js');

const router = express.Router();

router.post('/login', AuthController.login); //rota pubicla nao precisa de token
 
module.exports = router;