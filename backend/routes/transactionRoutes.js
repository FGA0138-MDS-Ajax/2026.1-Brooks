const express               = require('express');
const TransactionController = require('../controllers/transactionController.js');
const authMiddleware        = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.post('/transacoes/gasto',   authMiddleware, TransactionController.salvarGasto);
router.post('/transacoes/receita', authMiddleware, TransactionController.salvarReceita);
router.get('/transacoes',          authMiddleware, TransactionController.listar);
router.get('/saldo', authMiddleware, TransactionController.saldo);

module.exports = router;
