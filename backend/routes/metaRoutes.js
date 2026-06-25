const express = require('express');
const router = express.Router();

const metaController = require('../controllers/metaController');
const auth = require('../middlewares/authMiddleware');



router.post(
    '/',
    auth,
    metaController.criar
);



router.get(
    '/',
    auth,
    metaController.listar
);



router.delete(
    '/:id',
    auth,
    metaController.excluir
);



module.exports = router;