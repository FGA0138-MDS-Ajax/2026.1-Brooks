require('dotenv').config();
const db = require('../database/config');
const { criarCategoriasPadrao } = require('../utils/seedCategory');

async function main() {
    const [usuarios] = await db.query('SELECT id FROM usuarios');

    for (const usuario of usuarios) {
        await criarCategoriasPadrao(usuario.id);
        console.log(`Categorias padrão aplicadas ao usuário ${usuario.id}`);
    }

    console.log('Concluído.');
    process.exit(0);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});