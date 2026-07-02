const express               = require('express');
const TransactionController = require('../controllers/transactionController.js');
const authMiddleware        = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.post('/transacoes/gasto',   authMiddleware, TransactionController.salvarGasto);
router.post('/transacoes/receita',authMiddleware,(req,res,next)=>{console.log("PASSOU NA ROTA RECEITA");next();},TransactionController.salvarReceita);
router.get('/transacoes',          authMiddleware, TransactionController.listar);
router.get('/saldo', authMiddleware, TransactionController.saldo);
router.put('/transacoes/:id',  authMiddleware, TransactionController.editar);
router.delete('/transacoes/:id', authMiddleware, TransactionController.excluir);

module.exports = router;
