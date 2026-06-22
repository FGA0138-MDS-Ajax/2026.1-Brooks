const Transaction = require('../models/Transaction');
const Category = require('../models/Category');

class reportService {
    async gerarRelatorio(usuarioId, filtros = {}) {
        const transacoes = await Transaction.listarPorUsuario(usuarioId);
        
        let totalReceitas = 0;
        let totalDespesas = 0;
        
        transacoes.forEach(t => {
            if (t.tipo === 'receita') {
                totalReceitas += Number(t.valor);
            } else if (t.tipo === 'despesa') {
                totalDespesas += Number(t.valor);
            }
        });

        return {
            resumo: {
                totalReceitas,
                totalDespesas,
                saldo: totalReceitas - totalDespesas
            },
            transacoes,
            totalTransacoes: transacoes.length
        };
    }

    async getReceitas(usuarioId) {
        const transacoes = await Transaction.listarPorUsuario(usuarioId);
        return transacoes.filter(t => t.tipo === 'receita');
    }

    async getDespesas(usuarioId) {
        const transacoes = await Transaction.listarPorUsuario(usuarioId);
        return transacoes.filter(t => t.tipo === 'despesa');
    }

    async getSaldo(usuarioId) {
        return await Transaction.saldoPorUsuario(usuarioId);
    }

    async getCategoriasresumo(usuarioId) {
        const transacoes = await Transaction.listarPorUsuario(usuarioId);
        
        const despesas = transacoes.filter(t => t.tipo === 'despesa');
        
        const categoriasMap = {};
        despesas.forEach(t => {
            const cat = t.categoria || 'Outros';
            if (!categoriasMap[cat]) {
                categoriasMap[cat] = 0;
            }
            categoriasMap[cat] += Number(t.valor);
        });

        const categorias = Object.entries(categoriasMap).map(([nome, total]) => ({
            nome,
            total
        }));

        const totalGeral = categorias.reduce((sum, cat) => sum + cat.total, 0);

        const categoriasComPercentual = categorias.map(cat => ({
            ...cat,
            percentual: totalGeral > 0 ? ((cat.total / totalGeral) * 100).toFixed(1) : 0
        }));

        return {
            categorias: categoriasComPercentual,
            total: totalGeral
        };
    }
}

module.exports = new reportService();