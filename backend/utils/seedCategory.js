const db = require('../database/config');

const CATEGORIAS_PADRAO = [

    { nome: 'Alimentação', tipo: 'despesa' },
    { nome: 'Moradia', tipo: 'despesa' },
    { nome: 'Transporte', tipo: 'despesa' },
    { nome: 'Saúde', tipo: 'despesa' },
    { nome: 'Lazer', tipo: 'despesa' },
    { nome: 'Educação', tipo: 'despesa' },
    { nome: 'Compras', tipo: 'despesa' },
    { nome: 'Contas', tipo: 'despesa' },
    { nome: 'Assinaturas', tipo: 'despesa' },
    { nome: 'Outros', tipo: 'despesa' },


    { nome: 'Salário', tipo: 'receita' },
    { nome: 'Freelance', tipo: 'receita' },
    { nome: 'Investimentos', tipo: 'receita' },
    { nome: 'Presente', tipo: 'receita' },
    { nome: 'Outros', tipo: 'receita' }

];

async function criarCategoriasPadrao(usuarioId) {

    for (const categoria of CATEGORIAS_PADRAO) {

        await db.query(
            `
            INSERT IGNORE INTO categorias
            (usuario_id, nome, tipo)
            VALUES (?, ?, ?)
            `,
            [
                usuarioId,
                categoria.nome,
                categoria.tipo
            ]
        );

    }
}

module.exports = { criarCategoriasPadrao, CATEGORIAS_PADRAO };