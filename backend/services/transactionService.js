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

    async editar(usuarioId, id, { descricao, valor, categoria }) {
        if (!descricao || !descricao.trim()) throw new Error('Informe uma descrição.');
        if (!valor || valor <= 0)            throw new Error('Informe um valor válido.');

        const transacao = await Transaction.buscarPorId(id, usuarioId);
        if (!transacao) throw new Error('Transação não encontrada.');

        if (categoria) {
            const categoriaExiste = await Category.findByNomeTipo(categoria, transacao.tipo, usuarioId);
            if (!categoriaExiste) throw new Error('Selecione uma categoria válida.');
        }

        const categoriaFinal = transacao.tipo === 'despesa'
            ? (categoria || transacao.categoria)   // despesa mantém categoria obrigatória
            : (categoria || null);                 // receita pode ficar sem categoria

        const atualizado = await Transaction.atualizar(id, usuarioId, {
            valor: parseFloat(valor),
            descricao: descricao.trim(),
            categoria: categoriaFinal,
        });

        if (!atualizado) throw new Error('Não foi possível atualizar a transação.');

        return Transaction.buscarPorId(id, usuarioId);
    }

    async excluir(usuarioId, id) {
        const transacao = await Transaction.buscarPorId(id, usuarioId);
        if (!transacao) throw new Error('Transação não encontrada.');

        const deletado = await Transaction.deletar(id, usuarioId);
        if (!deletado) throw new Error('Não foi possível excluir a transação.');
    }

    async listar(usuarioId) {
        return Transaction.listarPorUsuario(usuarioId);
    }

    async saldo(usuarioId) {
        return Transaction.saldoPorUsuario(usuarioId);
    }
}

module.exports = new TransactionService();