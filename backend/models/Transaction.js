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
}

module.exports = Transaction;
