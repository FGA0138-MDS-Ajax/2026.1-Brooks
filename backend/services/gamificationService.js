// backend/services/gamificationService.js
const Gamification = require('../models/Gamification');

const XP_ACOES = {
    gasto: 10,
    receita: 15,
    meta_criada: 20,
    meta_concluida: 50,
    login_diario: 5,
    curso_concluido: 'dinamico',
};

const LIMIARES = [0, 100, 250, 500, 1000, 2000];

class GamificationService {

    calcularNivel(xpTotal) {
        let nivel = 1;
        for (let i = LIMIARES.length - 1; i >= 0; i--) {
            if (xpTotal >= LIMIARES[i]) { nivel = i + 1; break; }
        }

        // Nível máximo atingido (xp >= 2000): trava em 100%
        const nivelMaximo = LIMIARES.length;
        if (nivel >= nivelMaximo) {
            return { nivel: nivelMaximo, progresso: 100, xpProximo: LIMIARES[LIMIARES.length - 1] };
        }

        const limiteAtual = LIMIARES[nivel - 1];
        const limiteProximo = LIMIARES[nivel];
        const progresso = Math.min(
            Math.round(((xpTotal - limiteAtual) / (limiteProximo - limiteAtual)) * 100),
            100
        );

        return { nivel, progresso, xpProximo: limiteProximo };
    }

    async buscarXp(usuarioId) {
        const dados = await Gamification.buscarPorUsuario(usuarioId);
        const { nivel, progresso, xpProximo } = this.calcularNivel(dados.xp_total);
        return { xpTotal: dados.xp_total, nivel, progresso, xpProximo };
    }

    async ganharXp(usuarioId, acao, descricao = null) {
        await Gamification.buscarPorUsuario(usuarioId);

        const xpAnterior = await Gamification.buscarXpTotal(usuarioId);
        const statsAtuais = this.calcularNivel(xpAnterior);
        
        let xpGanho = 0;

        // Se a ação for um curso, calcula quanto falta para o próximo nível
        if (acao === 'curso_concluido') {
            if (statsAtuais.nivel >= LIMIARES.length) {
                xpGanho = 250; // Se já estiver no nível máximo (100%), dá bônus
            } else {
                xpGanho = statsAtuais.xpProximo - xpAnterior; 
            }
        } else {
            xpGanho = XP_ACOES[acao];
            if (!xpGanho) {
                throw new Error(`Ação inválida: "${acao}". Use: ${Object.keys(XP_ACOES).join(', ')}`);
            }
        }

        const novoXpTotal = xpAnterior + xpGanho;
        const { nivel, progresso, xpProximo } = this.calcularNivel(novoXpTotal);

        await Gamification.atualizarXp(usuarioId, xpGanho, nivel);
        await Gamification.registrarHistorico(usuarioId, acao, xpGanho, descricao);

        return { xpGanho, xpTotal: novoXpTotal, nivel, progresso, xpProximo };
    }

    async perderXp(usuarioId, acao, descricao = null) {
        await Gamification.buscarPorUsuario(usuarioId);

        const xpAnterior = await Gamification.buscarXpTotal(usuarioId);
        const novoXpTotal = Math.max(xpAnterior - xpPerda, 0); // nunca fica negativo
        const xpRemovidoReal = xpAnterior - novoXpTotal;        // quanto de fato foi removido

        const { nivel, progresso, xpProximo } = this.calcularNivel(novoXpTotal);

        await Gamification.atualizarXp(usuarioId, -xpRemovidoReal, nivel);
        await Gamification.registrarHistorico(usuarioId, acao, -xpRemovidoReal, descricao ?? 'Transação excluída');

        return { xpPerdido: xpRemovidoReal, xpTotal: novoXpTotal, nivel, progresso, xpProximo };
    }

    async buscarHistorico(usuarioId, limite = 10) {
        return Gamification.buscarHistorico(usuarioId, limite);
    }

    get acoes() { return XP_ACOES; }
}

module.exports = new GamificationService();
