const express              = require('express');
const dashboardController  = require('../controllers/dashboardController');
const authMiddleware       = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/dashboard/saldo',    authMiddleware, dashboardController.getSaldoMensal);
router.get('/dashboard/receita',  authMiddleware, dashboardController.getReceitaMensal);
router.get('/dashboard/despesa',  authMiddleware, dashboardController.getDespesaMensal);

module.exports = router;