let evolucaoChart = null;
let categoriasChart = null;

const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];


const categoryColors = [
    '#667eea', '#11998e', '#eb3349', '#f39c12', '#3498db', 
    '#9b59b6', '#1abc9c', '#e67e22', '#2c3e50', '#16a085',
    '#27ae60', '#2980b9', '#8e44ad', '#f1c40f', '#e74c3c'
];

function getToken() {
    return localStorage.getItem('token');
}

function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

function showLoading() {
    const overlay = document.createElement('div');
    overlay.className = 'loading-overlay';
    overlay.id = 'loadingOverlay';
    overlay.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(overlay);
}

function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) overlay.remove();
}

async function fetchAllTransactions() {
    const token = getToken();
    
    if (!token) {
        window.location.href = 'login.html';
        throw new Error('Não autenticado');
    }

    const response = await fetch('/api/transacoes', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = 'login.html';
        throw new Error('Expirado');
    }

    if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data.transacoes || [];
}


function processMonthlyData(transactions) {
    const currentYear = new Date().getFullYear();
    
    
    const yearTransactions = transactions.filter(t => {
        const transDate = new Date(t.data);
        return transDate.getFullYear() === currentYear;
    });

    const monthlyData = Array(12).fill().map(() => ({
        entradas: 0,
        saidas: 0,
        saldo: 0
    }));

    
    yearTransactions.reduce((acc, transaction) => {
        const date = new Date(transaction.data);
        const month = date.getMonth(); // 0-11
        const valor = parseFloat(transaction.valor);
        
        if (transaction.tipo === 'receita') {
            acc[month].entradas += valor;
        } else if (transaction.tipo === 'despesa') {
            acc[month].saidas += valor;
        }
        
        acc[month].saldo = acc[month].entradas - acc[month].saidas;
        
        return acc;
    }, monthlyData);

    return monthlyData;
}

function processCategoryData(transactions) {
    const currentYear = new Date().getFullYear();
    
    
    const despesas = transactions.filter(t => 
        t.tipo === 'despesa' && new Date(t.data).getFullYear() === currentYear
    );
    const categories = despesas.reduce((acc, despesa) => {
        const categoria = despesa.categoria || 'Outros';
        const valor = parseFloat(despesa.valor);
        
        if (!acc[categoria]) {
            acc[categoria] = 0;
        }
        acc[categoria] += valor;
        
        return acc;
    }, {});
    const total = Object.values(categories).reduce((sum, value) => sum + value, 0);
    const categoriesArray = Object.entries(categories).map(([name, value]) => ({
        name,
        value,
        percent: total > 0 ? (value / total) * 100 : 0
    }));
    categoriesArray.sort((a, b) => b.value - a.value);

    return { categories: categoriesArray, total };
}


function calculateKPIs(monthlyData) {
    const totalEntradas = monthlyData.reduce((sum, month) => sum + month.entradas, 0);
    const totalSaidas = monthlyData.reduce((sum, month) => sum + month.saidas, 0);
    const saldoAtual = totalEntradas - totalSaidas;
    
    return { totalEntradas, totalSaidas, saldoAtual };
}
function updateKPIs(monthlyData) {
    const { totalEntradas, totalSaidas, saldoAtual } = calculateKPIs(monthlyData);
    
    document.getElementById('totalEntradas').innerText = formatCurrency(totalEntradas);
    document.getElementById('totalSaidas').innerText = formatCurrency(totalSaidas);
    document.getElementById('saldoAtual').innerText = formatCurrency(saldoAtual);
}

function createEvolucaoChart(monthlyData) {
    const ctx = document.getElementById('evolucaoChart').getContext('2d');
    
    if (evolucaoChart) {
        evolucaoChart.destroy();
    }
    
    const entradasData = monthlyData.map(m => m.entradas);
    const saidasData = monthlyData.map(m => m.saidas);
    const saldoData = monthlyData.map(m => m.saldo);
    
    evolucaoChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: meses,
            datasets: [
                {
                    label: 'Entradas',
                    data: entradasData,
                    borderColor: '#11998e',
                    backgroundColor: 'rgba(17, 153, 142, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointHoverRadius: 6
                },
                {
                    label: 'Saídas',
                    data: saidasData,
                    borderColor: '#eb3349',
                    backgroundColor: 'rgba(235, 51, 73, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointHoverRadius: 6
                },
                {
                    label: 'Saldo',
                    data: saldoData,
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    borderDash: [5, 5]
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${formatCurrency(context.raw)}`;
                        }
                    }
                },
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return formatCurrency(value);
                        }
                    }
                }
            }
        }
    });
}

function createCategoriasChart(categoriesData) {
    const ctx = document.getElementById('categoriasChart').getContext('2d');
    
    if (categoriasChart) {
        categoriasChart.destroy();
    }
    
    const labels = categoriesData.map(c => c.name);
    const values = categoriesData.map(c => c.value);
    const colors = labels.map((_, i) => categoryColors[i % categoryColors.length]);
    
    categoriasChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: colors,
                borderWidth: 2,
                borderColor: 'white'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percent = ((value / total) * 100).toFixed(1);
                            return `${label}: ${formatCurrency(value)} (${percent}%)`;
                        }
                    }
                },
                legend: {
                    position: 'bottom',
                    labels: {
                        font: { size: 11 }
                    }
                }
            }
        }
    });
}

function updateCategoriesList(categoriesData, total) {
    const container = document.getElementById('categoriesDetail');
    
    if (categoriesData.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #999;">Nenhuma despesa registrada</p>';
        return;
    }
    
    container.innerHTML = categoriesData.map((category, index) => `
        <div class="category-item">
            <div class="category-name">
                <div class="category-color" style="background: ${categoryColors[index % categoryColors.length]}"></div>
                <span>${category.name}</span>
            </div>
            <div>
                <span class="category-value">${formatCurrency(category.value)}</span>
                <span class="category-percent">(${category.percent.toFixed(1)}%)</span>
            </div>
        </div>
    `).join('');
}

function updateResumoMensal(monthlyData) {
    const tbody = document.getElementById('resumoMensalBody');
    
    const rows = monthlyData.map((data, index) => {
        const status = data.saldo > 0 ? 'positive' : (data.saldo < 0 ? 'negative' : 'neutral');
        const statusText = data.saldo > 0 ? '📈 Superávit' : (data.saldo < 0 ? '📉 Déficit' : '⚖️ Equilibrado');
        const statusClass = `status-${status}`;
        
        return `
            <tr>
                <td><strong>${meses[index]}</strong></td>
                <td style="color: #11998e;">${formatCurrency(data.entradas)}</td>
                <td style="color: #eb3349;">${formatCurrency(data.saidas)}</td>
                <td class="${statusClass}">${formatCurrency(data.saldo)}</td>
                <td class="${statusClass}">${statusText}</td>
            </tr>
        `;
    });
    
    tbody.innerHTML = rows.join('');
}

async function loadDashboard() {
    showLoading();
    
    try {
        const transactions = await fetchAllTransactions();
        const monthlyData = processMonthlyData(transactions);
        const { categories, total: totalDespesas } = processCategoryData(transactions);
        
        updateKPIs(monthlyData);
        createEvolucaoChart(monthlyData);
        createCategoriasChart(categories);
        updateCategoriesList(categories, totalDespesas);
        updateResumoMensal(monthlyData);
        
    } catch (error) {
        console.error('Erro ao carregar dashboard:', error);
        alert('Erro ao carregar dados do dashboard: ' + error.message);
    } finally {
        hideLoading();
    }
}

let autoRefreshInterval;

function startAutoRefresh() {
    if (autoRefreshInterval) clearInterval(autoRefreshInterval);
    autoRefreshInterval = setInterval(() => {
        console.log('Atualizando dashboard em tempo real...');
        loadDashboard();
    }, 30000);
}

function stopAutoRefresh() {
    if (autoRefreshInterval) {
        clearInterval(autoRefreshInterval);
        autoRefreshInterval = null;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (!getToken()) {
        window.location.href = 'login.html';
        return;
    }
    
    loadDashboard();
    startAutoRefresh();
});

window.addEventListener('beforeunload', () => {
    stopAutoRefresh();
});