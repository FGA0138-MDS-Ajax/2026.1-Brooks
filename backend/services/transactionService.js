const Transaction = require('../models/Transaction');
const Category = require('../models/Category');

class TransactionService {

    async salvarGasto(usuarioId, { descricao, valor, categoria }) {
        if (!descricao || !descricao.trim()) throw new Error('Informe uma descrição.');
        if (!valor || valor <= 0)            throw new Error('Informe um valor válido.');
        if (!categoria)                      throw new Error('Selecione uma categoria.');

        const categoriaExiste = await Category.findByNomeTipo(categoria, 'despesa', usuarioId);
        if (!categoriaExiste) throw new Error('Selecione uma categoria válida.');

        return Transaction.criar({
            usuarioId,
            valor: parseFloat(valor),
            tipo: 'despesa',
            descricao: descricao.trim(),
            categoria,
        });
    }

    async salvarReceita(usuarioId, { descricao, valor, categoria }) {
        if (!descricao || !descricao.trim()) throw new Error('Informe uma descrição.');
        if (!valor || valor <= 0)            throw new Error('Informe um valor válido.');

        let categoriaFinal = null;
        if (categoria) {
            const categoriaExiste = await Category.findByNomeTipo(categoria, 'receita', usuarioId);
            if (!categoriaExiste) throw new Error('Selecione uma categoria válida.');
            categoriaFinal = categoria;
        }

        return Transaction.criar({
            usuarioId,
            valor: parseFloat(valor),
            tipo: 'receita',
            descricao: descricao.trim(),
            categoria: categoriaFinal,
        });
    }

    async listar(usuarioId) {
        return Transaction.listarPorUsuario(usuarioId);
    }

    async saldo(usuarioId) {
        return Transaction.saldoPorUsuario(usuarioId);
    }
}

module.exports = new TransactionService();