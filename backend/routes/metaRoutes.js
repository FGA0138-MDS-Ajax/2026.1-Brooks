const express = require('express');
const router = express.Router();

const metaController = require('../controllers/metaController');

router.get('/', metaController.listarMetas);

router.get('/:id', metaController.buscarMeta);

router.post('/', metaController.criarMeta);

router.put('/:id', metaController.atualizarMeta);

router.delete('/:id', metaController.excluirMeta);

module.exports = router;