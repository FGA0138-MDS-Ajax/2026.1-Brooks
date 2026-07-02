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

    static async concluir(id, usuarioId) {
        return db.execute(
            `
            UPDATE metas_financeiras
            SET status = 'concluida'
            WHERE id = ? AND usuario_id = ?
            `,
            [
                id,
                usuarioId
            ]
        );
    }

    static async adicionarValor(usuarioId, metaId, valor) {

        const [meta] = await db.execute(
            `
        SELECT valor_atual, valor_alvo
        FROM metas_financeiras
        WHERE id=? AND usuario_id=?
        `,
            [
                metaId,
                usuarioId
            ]
        );


        if (meta.length === 0) {
            throw new Error("Meta não encontrada.");
        }


        let novoValor =
            Number(meta[0].valor_atual) + Number(valor);


        if (novoValor > meta[0].valor_alvo) {
            novoValor = meta[0].valor_alvo;
        }


        return db.execute(
            `
        UPDATE metas_financeiras
        SET valor_atual=?
        WHERE id=? 
        AND usuario_id=?
        `,
            [
                novoValor,
                metaId,
                usuarioId
            ]
        );
    }
}


module.exports = Meta;