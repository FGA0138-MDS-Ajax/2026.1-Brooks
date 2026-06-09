const Meta = require('../models/Meta');

exports.listarMetas = async (req, res) => {
    try {
        const metas = await Meta.listar();
        res.json(metas);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

exports.buscarMeta = async (req, res) => {
    try {
        const meta = await Meta.buscarPorId(req.params.id);

        if (!meta) {
            return res.status(404).json({
                erro: 'Meta não encontrada'
            });
        }

        res.json(meta);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

exports.criarMeta = async (req, res) => {
    try {
        const id = await Meta.criar(req.body);

        res.status(201).json({
            mensagem: 'Meta criada com sucesso',
            id
        });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

exports.atualizarMeta = async (req, res) => {
    try {
        await Meta.atualizar(req.params.id, req.body);

        res.json({
            mensagem: 'Meta atualizada com sucesso'
        });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

exports.excluirMeta = async (req, res) => {
    try {
        await Meta.excluir(req.params.id);

        res.json({
            mensagem: 'Meta removida com sucesso'
        });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};