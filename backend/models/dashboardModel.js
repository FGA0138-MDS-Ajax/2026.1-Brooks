const db = require('../database/config');

class dashboardModel {

    static async getSaldoMensal(usuarioId) {
        const [rows] = await db.query(
            `SELECT 
                MONTH(data) as mes,
                SUM(CASE WHEN tipo = 'receita' THEN valor ELSE -valor END) as saldo
             FROM transacoes
             WHERE usuario_id = ? 
                AND YEAR(data) = YEAR(CURDATE())
             GROUP BY MONTH(data)
             ORDER BY mes`,
            [usuarioId]
        );
        return rows;
    }

    static async getReceitaMensal(usuarioId) {
        const [rows] = await db.query(
            `SELECT 
                MONTH(data) as mes,
                SUM(valor) as valor
             FROM transacoes
             WHERE usuario_id = ? 
                AND tipo = 'receita'
                AND YEAR(data) = YEAR(CURDATE())
             GROUP BY MONTH(data)
             ORDER BY mes`,
            [usuarioId]
        );
        return rows;
    }

    static async getDespesaMensal(usuarioId) {
        const [rows] = await db.query(
            `SELECT 
                MONTH(data) as mes,
                SUM(valor) as valor
             FROM transacoes
             WHERE usuario_id = ? 
                AND tipo = 'despesa'
                AND YEAR(data) = YEAR(CURDATE())
             GROUP BY MONTH(data)
             ORDER BY mes`,
            [usuarioId]
        );
        return rows;
    }
}

module.exports = dashboardModel;