const transactionService = require('../services/transactionService');

class TransactionController {

    async salvarGasto(req, res) {
        try {
            const usuarioId = req.usuario.id;
            const { descricao, valor, categoria } = req.body;
            const transacao = await transactionService.salvarGasto(usuarioId, { descricao, valor, categoria });
            return res.status(201).json({ mensagem: 'Gasto registrado com sucesso!', transacao });
        } catch (err) {
            const status = ['Informe', 'Selecione'].some(p => err.message.startsWith(p)) ? 400 : 500;
            return res.status(status).json({ erro: err.message });
        }
    }

    async salvarReceita(req, res) {
        console.log("CHEGOU NO CONTROLLER:");
    console.log(req.body);
        try {
            const usuarioId = req.usuario.id;
            const { 
                descricao, 
                valor, 
                categoria,
                metaId,
                valorMeta
            } = req.body;
            const transacao = await transactionService.salvarReceita(
                usuarioId,
                { 
                    descricao,
                    valor,
                    categoria,
                    metaId,
                    valorMeta
                }
            );
            return res.status(201).json({ mensagem: 'Receita registrada com sucesso!', transacao });
        } catch (err) {
            const status = ['Informe', 'Selecione'].some(p => err.message.startsWith(p)) ? 400 : 500;
            return res.status(status).json({ erro: err.message });
        }
    }

    async editar(req, res) {
        try {
            const usuarioId = req.usuario.id;
            const { id } = req.params;
            const { descricao, valor, categoria } = req.body;
            const transacao = await transactionService.editar(usuarioId, id, { descricao, valor, categoria });
            return res.status(200).json({ mensagem: 'Transação atualizada com sucesso!', transacao });
        } catch (err) {
            if (err.message === 'Transação não encontrada.') {
                return res.status(404).json({ erro: err.message });
            }
            const status = ['Informe', 'Selecione'].some(p => err.message.startsWith(p)) ? 400 : 500;
            return res.status(status).json({ erro: err.message });
        }
    }

    async excluir(req, res) {
        try {
            const usuarioId = req.usuario.id;
            const { id } = req.params;
            await transactionService.excluir(usuarioId, id);
            return res.status(200).json({ mensagem: 'Transação excluída com sucesso!' });
        } catch (err) {
            if (err.message === 'Transação não encontrada.') {
                return res.status(404).json({ erro: err.message });
            }
            return res.status(500).json({ erro: err.message });
        }
    }

    async listar(req, res) {
        try {
            const usuarioId = req.usuario.id;
            const transacoes = await transactionService.listar(usuarioId);
            return res.status(200).json({ transacoes });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ erro: 'Erro ao buscar transações.' });
        }
    }

    async saldo(req, res) {
        try {
            const usuarioId = req.usuario.id;
            const saldo = await transactionService.saldo(usuarioId);
            return res.status(200).json(saldo);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ erro: 'Erro ao buscar saldo.' });
        }
    }
}

module.exports = new TransactionController();