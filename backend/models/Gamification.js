// backend/models/Gamification.js
const db = require('../database/config');

class Gamification {

    static async buscarPorUsuario(usuarioId) {
        const [rows] = await db.query(
            'SELECT * FROM xp_usuario WHERE usuario_id = ?',
            [usuarioId]
        );

        if (rows.length === 0) {
            await db.query(
                'INSERT INTO xp_usuario (usuario_id, xp_total, nivel) VALUES (?, 0, 1)',
                [usuarioId]
            );
            return { usuario_id: usuarioId, xp_total: 0, nivel: 1 };
        }

        return rows[0];
    }

    /**
     * Incrementa o XP total e atualiza o nível do usuário.
     * @param {number} usuarioId
     * @param {number} xpGanho      — quantidade de XP a adicionar
     * @param {number} novoNivel    — nível recalculado pelo service
     */
    static async atualizarXp(usuarioId, xpGanho, novoNivel) {
        await db.query(
            `UPDATE xp_usuario
             SET xp_total = xp_total + ?, nivel = ?
             WHERE usuario_id = ?`,
            [xpGanho, novoNivel, usuarioId]
        );
    }

  
    static async buscarXpTotal(usuarioId) {
        const [rows] = await db.query(
            'SELECT xp_total FROM xp_usuario WHERE usuario_id = ?',
            [usuarioId]
        );
        return rows[0]?.xp_total ?? 0;
    }

  
    static async registrarHistorico(usuarioId, acao, xpGanho, descricao = null) {
        await db.query(
            'INSERT INTO xp_historico (usuario_id, acao, xp_ganho, descricao) VALUES (?, ?, ?, ?)',
            [usuarioId, acao, xpGanho, descricao]
        );
    }

    /**
     * Retorna os últimos eventos de XP de um usuário.
     * @param {number} usuarioId
     * @param {number} limite
     */
    static async buscarHistorico(usuarioId, limite = 10) {
        const [rows] = await db.query(
            `SELECT acao, xp_ganho, descricao, criado_em
             FROM xp_historico
             WHERE usuario_id = ?
             ORDER BY criado_em DESC
             LIMIT ?`,
            [usuarioId, limite]
        );
        return rows;
    }
}

module.exports = Gamification;
