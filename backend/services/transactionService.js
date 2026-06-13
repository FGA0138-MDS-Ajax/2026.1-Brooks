const Transaction = require('../models/Transaction');

class TransactionService {

    async salvarGasto(usuarioId, { descricao, valor, categoria }) {
        if (!descricao || !descricao.trim()) throw new Error('Informe uma descrição.');
        if (!valor || valor <= 0)            throw new Error('Informe um valor válido.');
        if (!categoria)                      throw new Error('Selecione uma categoria.');

        return Transaction.criar({
            usuarioId,
            valor: parseFloat(valor),
            tipo: 'despesa',
            descricao: descricao.trim(),
            categoria,
        });
    }

    async salvarReceita(usuarioId, { descricao, valor }) {
        if (!descricao || !descricao.trim()) throw new Error('Informe uma descrição.');
        if (!valor || valor <= 0)            throw new Error('Informe um valor válido.');

        return Transaction.criar({
            usuarioId,
            valor: parseFloat(valor),
            tipo: 'receita',
            descricao: descricao.trim(),
            categoria: null,
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
