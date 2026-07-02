const express = require('express');
const CategoryController = require('../controllers/categoryController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.use(authMiddleware);

router.post('/', CategoryController.criarCategory);
router.get('/', CategoryController.listarCategory);
router.get('/:id', CategoryController.buscarCategory);
router.delete('/:id', CategoryController.excluirCategory);

module.exports = router;