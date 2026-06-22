const express = require('express');
const reportController = require('../controllers/reportController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/relatorio', reportController.gerarRelatorio);
router.get('/receitas', reportController.listarReceitas);
router.get('/despesas', reportController.listarDespesas);
router.get('/saldo', reportController.getSaldo);
router.get('/categorias-resumo', reportController.getCategoriasresumo);

module.exports = router;