const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

router.post('/cadastrar', UserController.cadastrar);

module.exports = router;