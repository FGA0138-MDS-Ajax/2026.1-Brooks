const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/cursoController');
const auth = require('../middlewares/authMiddleware');

router.get('/', auth, cursoController.listar);
router.put('/:id/concluir', auth, cursoController.concluir);

module.exports = router;