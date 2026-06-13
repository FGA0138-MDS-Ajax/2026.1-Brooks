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
        try {
            const usuarioId = req.usuario.id;
            const { descricao, valor } = req.body;
            const transacao = await transactionService.salvarReceita(usuarioId, { descricao, valor });
            return res.status(201).json({ mensagem: 'Receita registrada com sucesso!', transacao });
        } catch (err) {
            const status = err.message.startsWith('Informe') ? 400 : 500;
            return res.status(status).json({ erro: err.message });
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


        } catch(err) {

            console.error(err);

            return res.status(500).json({
                erro: 'Erro ao buscar saldo.'
            });

        }

    }
}

module.exports = new TransactionController();
