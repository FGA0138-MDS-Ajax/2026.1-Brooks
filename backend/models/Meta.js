const db = require('../database/config');

async function listar() {
    const [rows] = await db.query(
        'SELECT * FROM metas_financeiras'
    );

    return rows;
}

async function buscarPorId(id) {
    const [rows] = await db.query(
        'SELECT * FROM metas_financeiras WHERE id = ?',
        [id]
    );

    return rows[0];
}

async function criar(meta) {
    const [result] = await db.query(
        `INSERT INTO metas_financeiras
        (usuario_id, titulo, valor_alvo, valor_atual, prazo)
        VALUES (?, ?, ?, ?, ?)`,
        [
            
            meta.usuario_id,
            meta.titulo,
            meta.valor_alvo,
            meta.valor_atual || 0,
            meta.prazo
        ]
    );

    return result.insertId;
}

async function atualizar(id, meta) {
    await db.query(
        `UPDATE metas_financeiras
        SET titulo = ?,
            valor_alvo = ?,
            valor_atual = ?,
            prazo = ?
        WHERE id = ?`,
        [   
            meta.titulo,
            meta.valor_alvo,
            meta.valor_atual,
            meta.prazo,
            id
        ]
    );
}

async function excluir(id) {
    await db.query(
        'DELETE FROM metas_financeiras WHERE id = ?',
        [id]
    );
}

module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    excluir
};