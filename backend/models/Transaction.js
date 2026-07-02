const db = require('../database/config');

class Transaction {

    static async criar({ usuarioId, valor, tipo, descricao, categoria = null }) {
        const [result] = await db.query(
            `INSERT INTO transacoes (usuario_id, valor, tipo, descricao, categoria, data)
             VALUES (?, ?, ?, ?, ?, CURDATE())`,
            [usuarioId, valor, tipo, descricao, categoria]
        );
        return { id: result.insertId, usuarioId, valor, tipo, descricao, categoria };
    }

    static async listarPorUsuario(usuarioId) {
        const [rows] = await db.query(
            `SELECT id, valor, tipo, descricao, categoria, data, criado_em
             FROM transacoes
             WHERE usuario_id = ?
             ORDER BY criado_em DESC`,
            [usuarioId]
        );
        return rows;
    }

    static async buscarPorId(id, usuarioId) {
        const [rows] = await db.query(
            `SELECT id, valor, tipo, descricao, categoria, data, criado_em
             FROM transacoes
             WHERE id = ? AND usuario_id = ?`,
            [id, usuarioId]
        );
        return rows[0] || null;
    }

    static async atualizar(id, usuarioId, { valor, descricao, categoria }) {
        const [result] = await db.query(
            `UPDATE transacoes
             SET valor = ?, descricao = ?, categoria = ?
             WHERE id = ? AND usuario_id = ?`,
            [valor, descricao, categoria, id, usuarioId]
        );
        return result.affectedRows > 0;
    }

    static async deletar(id, usuarioId) {
        const [result] = await db.query(
            `DELETE FROM transacoes WHERE id = ? AND usuario_id = ?`,
            [id, usuarioId]
        );
        return result.affectedRows > 0;
    }

    static async saldoPorUsuario(usuarioId) {
        const [rows] = await db.query(
            `
            SELECT 
                SUM(CASE WHEN tipo = 'receita' THEN valor ELSE 0 END) AS receitas,
                SUM(CASE WHEN tipo = 'despesa' THEN valor ELSE 0 END) AS despesas
            FROM transacoes
            WHERE usuario_id = ?
            `,
            [usuarioId]
        );
        const receitas = Number(rows[0].receitas || 0);
        const despesas = Number(rows[0].despesas || 0);

        return {
            saldo: receitas - despesas,
            receitas,
            despesas
        };
    }
}

module.exports = Transaction;