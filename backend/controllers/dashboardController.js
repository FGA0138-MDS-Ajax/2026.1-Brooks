const DashboardModel = require('../models/dashboardModel');

class dashboardController {

    async getSaldoMensal(req, res) {
        try {
            const usuarioId = req.usuario.id;
            const saldo = await dashboardModel.getSaldoMensal(usuarioId);
            return res.status(200).json(saldo);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ erro: 'Erro/saldo' });
        }
    }

    async getReceitaMensal(req, res) {
        try {
            const usuarioId = req.usuario.id;
            const receita = await dashboardModel.getReceitaMensal(usuarioId);
            return res.status(200).json(receita);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ erro: 'Erro/receita' });
        }
    }

    async getDespesaMensal(req, res) {
        try {
            const usuarioId = req.usuario.id;
            const despesa = await dashboardModel.getDespesaMensal(usuarioId);
            return res.status(200).json(despesa);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ erro: 'Erro/despesa' });
        }
    }
}

module.exports = new dashboardController();