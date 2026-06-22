const reportService = require('../services/reportService');

class reportController {
    async gerarRelatorio(req, res) {
        try {
            const usuarioId = req.usuario.id;
            const relatorio = await reportService.gerarRelatorio(usuarioId);
            return res.status(200).json({
                mensagem: 'sucesso',
                dados: relatorio
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ erro: 'Erro' });
        }
    }

    async listarReceitas(req, res) {
        try {
            const usuarioId = req.usuario.id;
            const receitas = await reportService.getReceitas(usuarioId);
            return res.status(200).json({ receitas });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ erro: 'Erro' });
        }
    }

    async listarDespesas(req, res) {
        try {
            const usuarioId = req.usuario.id;
            const despesas = await reportService.getDespesas(usuarioId);
            return res.status(200).json({ despesas });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ erro: 'Erro' });
        }
    }

    async getSaldo(req, res) {
        try {
            const usuarioId = req.usuario.id;
            const saldo = await reportService.getSaldo(usuarioId);
            return res.status(200).json(saldo);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ erro: 'Erro' });
        }
    }

    async getCategoriasresumo(req, res) {
        try {
            const usuarioId = req.usuario.id;
            const categorias = await reportService.getCategoriasresumo(usuarioId);
            return res.status(200).json({
                mensagem: 'Resumo por categorias obtido com sucesso',
                dados: categorias
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ 
                erro: 'Erro: ' + err.message 
            });
        }
    }
}

module.exports = new reportController();