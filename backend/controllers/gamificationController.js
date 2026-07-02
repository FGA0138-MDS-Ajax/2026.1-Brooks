const gamificationService = require('../services/gamificationService');

class GamificationController {

    async buscarXp(req, res) {
        try {
            const usuarioId = req.usuario.id;
            const dados = await gamificationService.buscarXp(usuarioId);
            return res.status(200).json(dados);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ erro: 'Erro ao buscar XP' });
        }
    }

    async ganharXp(req, res) {
        const { acao, descricao } = req.body;

        if (!acao) {
            return res.status(400).json({ erro: 'Campo "acao" é obrigatório' });
        }

        try {
            const usuarioId = req.usuario.id;
            const resultado = await gamificationService.ganharXp(usuarioId, acao, descricao ?? null);

            return res.status(200).json({
                mensagem:  `+${resultado.xpGanho} XP pela ação "${acao}"`,
                xpGanho:   resultado.xpGanho,
                xpTotal:   resultado.xpTotal,
                nivel:     resultado.nivel,
                progresso: resultado.progresso,
                xpProximo: resultado.xpProximo,
            });
        } catch (err) {
            console.error(err);
            // Ação inválida → 400; erro interno → 500
            const status = err.message.startsWith('Ação inválida') ? 400 : 500;
            return res.status(status).json({ erro: err.message });
        }
    }

    async historico(req, res) {
        try {
            const usuarioId = req.usuario.id;
            const limite    = parseInt(req.query.limite) || 10;
            const historico = await gamificationService.buscarHistorico(usuarioId, limite);
            return res.status(200).json({ historico });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ erro: 'Erro ao buscar histórico' });
        }
    }
}

module.exports = new GamificationController();
