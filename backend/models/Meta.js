const db = require('../database/config');

class Meta {

    static async criar({ usuarioId, titulo, valorAlvo, prazo }) {

        const [resultado] = await db.execute(
            `
            INSERT INTO metas_financeiras
            (usuario_id, titulo, valor_alvo, prazo)
            VALUES (?, ?, ?, ?)
            `,
            [
                usuarioId,
                titulo,
                valorAlvo,
                prazo
            ]
        );

        return {
            id: resultado.insertId,
            titulo,
            valorAlvo,
            prazo
        };
    }


    static async listarPorUsuario(usuarioId) {

        const [rows] = await db.execute(
            `
            SELECT *
            FROM metas_financeiras
            WHERE usuario_id = ?
            ORDER BY prazo ASC
            `,
            [usuarioId]
        );

        return rows;
    }


    static async excluir(id, usuarioId) {

        await db.execute(
            `
            DELETE FROM metas_financeiras
            WHERE id=? AND usuario_id=?
            `,
            [
                id,
                usuarioId
            ]
        );
    }

    static async adicionarValor(
        usuarioId,
        metaId,
        valor
    ) {

        const sql = `

            UPDATE metas_financeiras

            SET valor_atual =
            valor_atual + ?

            WHERE id=?
            AND usuario_id=?

            `;


        return db.execute(sql, [

            valor,
            metaId,
            usuarioId

        ]);

    }
}


module.exports = Meta;