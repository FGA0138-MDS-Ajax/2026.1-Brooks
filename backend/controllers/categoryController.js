const CategoryModel = require('../models/Category');

class CategoryController {

    async criarCategory(req, res) {
        try {
            const { nome, tipo } = req.body;
            const usuarioId = req.usuario.id;

            if (!nome || !nome.trim()) {
                return res.status(400).json({ erro: 'Informe um nome para a categoria.' });
            }

            if (!['receita', 'despesa'].includes(tipo)) {
                return res.status(400).json({ erro: 'O campo tipo deve ser "receita" ou "despesa".' });
            }

            const existente = await CategoryModel.findByNomeTipo(nome.trim(), tipo, usuarioId);
            if (existente) {
                return res.status(409).json({ erro: 'Categoria já existe para este tipo.' });
            }

            const categoria = await CategoryModel.create({ nome: nome.trim(), tipo, usuario_id: usuarioId });
            return res.status(201).json({ mensagem: 'Categoria criada com sucesso!', categoria });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ erro: 'Erro ao criar categoria.' });
        }
    }

    async listarCategory(req, res) {
        try {
            const usuarioId = req.usuario.id;
            const { tipo } = req.query;

            if (tipo && !['receita', 'despesa'].includes(tipo)) {
                return res.status(400).json({ erro: 'O parâmetro tipo deve ser "receita" ou "despesa".' });
            }

            const categorias = await CategoryModel.findAllByUser(usuarioId, tipo || null);
            return res.status(200).json({ categorias });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ erro: 'Erro ao listar categorias.' });
        }
    }

    async buscarCategory(req, res) {
        try {
            const { id } = req.params;
            const usuarioId = req.usuario.id;

            const categoria = await CategoryModel.findById(id, usuarioId);
            if (!categoria) {
                return res.status(404).json({ erro: 'Categoria não encontrada.' });
            }

            return res.status(200).json({ categoria });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ erro: 'Erro ao buscar categoria.' });
        }
    }

    async excluirCategory(req, res) {
        try {
            const { id } = req.params;
            const usuarioId = req.usuario.id;

            const excluida = await CategoryModel.delete(id, usuarioId);
            if (!excluida) {
                return res.status(404).json({ erro: 'Categoria não encontrada.' });
            }

            return res.status(204).send();
        } catch (err) {
            console.error(err);
            return res.status(500).json({ erro: 'Erro ao excluir categoria.' });
        }
    }
}

module.exports = new CategoryController();