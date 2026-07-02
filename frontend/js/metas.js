document.addEventListener('DOMContentLoaded', () => {
    carregarMetas();
});

async function carregarMetas() {
    const token = localStorage.getItem('token');
    
    try {
        const response = await fetch('http://localhost:3000/api/metas', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) throw new Error('Erro ao buscar metas');
        
        const dados = await response.json();
        const metas = dados.metas;

        const containerAtivas = document.getElementById('lista-metas-ativas');
        const containerConquistas = document.getElementById('lista-conquistas');

        containerAtivas.innerHTML = '';
        containerConquistas.innerHTML = '';

        const totalMetas = metas.length;
        let somaValorAtual = 0;
        let somaValorAlvo = 0;

        metas.forEach(meta => {
            const valorAlvo = Number(meta.valor_alvo);
            const valorAtual = Number(meta.valor_atual || 0);
            const porcentagem = valorAlvo > 0 ? Math.min(Math.round((valorAtual / valorAlvo) * 100), 100) : 0;

            somaValorAtual += valorAtual;
            somaValorAlvo += valorAlvo;

            if (meta.status === 'concluida') {
                containerConquistas.innerHTML += `
                    <span>Meta: ${meta.titulo} (Concluída ✔)</span>
                `;
            } else {
                containerAtivas.innerHTML += `
                    <div class="objetivo">
                        <p>${meta.titulo}</p>
                        <div class="barra-xp">
                            <div class="xp-preenchido" style="width: ${porcentagem}%;"></div>
                        </div>
                        <div class="objetivo-acoes">
                            <span>${porcentagem}%</span>
                            <button class="btn-concluir" onclick="concluirMeta(${meta.id})">✔ Concluir</button>
                        </div>
                    </div>
                `;
            }
        });

        document.getElementById('total-metas-contador').textContent = totalMetas;

        const progressoGeral = somaValorAlvo > 0 ? Math.min(Math.round((somaValorAtual / somaValorAlvo) * 100), 100) : 0;
        
        document.getElementById('barra-progresso-geral').style.width = `${progressoGeral}%`;
        document.getElementById('texto-progresso-geral').textContent = `${progressoGeral}% concluído`;

    } catch (err) {
        console.error('Erro ao carregar a tela de metas:', err);
    }
}


async function concluirMeta(idMeta) {
    const token = localStorage.getItem('token'); 
    
    if (!confirm('Deseja realmente concluir esta meta?')) {
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/metas/${idMeta}/concluir`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            alert('Parabéns! Meta concluída com sucesso! Você ganhou +50 XP!');
            window.location.reload(); 
        } else {
            const error = await response.json();
            alert('Erro ao concluir meta: ' + error.erro);
        }
    } catch (err) {
        console.error('Erro na requisição:', err);
        alert('Erro de comunicação com o servidor.');
    }
}