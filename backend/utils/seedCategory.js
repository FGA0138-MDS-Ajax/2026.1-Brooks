const db = require('../database/config');

const CATEGORIAS_PADRAO = [
   
    { nome: 'Alimentação', tipo: 'despesa' },
    { nome: 'Moradia',     tipo: 'despesa' },
    { nome: 'Transporte',  tipo: 'despesa' },
    { nome: 'Saúde',       tipo: 'despesa' },
    { nome: 'Lazer',       tipo: 'despesa' },


    // Receitas
    { nome: 'Salário',     tipo: 'receita' },
    { nome: 'Freelance',   tipo: 'receita' },
   
];

async function criarCategoriasPadrao(usuarioId) {
    const valores = CATEGORIAS_PADRAO.map(c => [usuarioId, c.nome, c.tipo]);

    await db.query(
        'INSERT IGNORE INTO categorias (usuario_id, nome, tipo) VALUES ?',
        [valores]
    );
}

module.exports = { criarCategoriasPadrao, CATEGORIAS_PADRAO };