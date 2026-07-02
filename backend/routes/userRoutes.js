const express = require('express');
const UserController = require('../controllers/userController.js');

const router = express.Router();

router.post('/cadastrar', UserController.cadastrar);

const authMiddleware = require('../middlewares/authMiddleware');
router.get('/perfil', authMiddleware, UserController.perfil);

module.exports = router;
