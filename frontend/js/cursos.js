document.addEventListener('DOMContentLoaded', carregarCursos);

async function carregarCursos() {
    const token = localStorage.getItem('token');
    
    try {
        const response = await fetch('http://localhost:3000/api/cursos', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) throw new Error('Erro ao buscar cursos');
        
        const dados = await response.json();
        const container = document.getElementById('lista-cursos');
        container.innerHTML = '';

        dados.cursos.forEach(curso => {
            const botaoAcao = curso.concluido 
                ? `<button class="btn-concluido" disabled>✔ Concluído</button>`
                : `<button class="btn-marcar" onclick="concluirCurso(${curso.id})">✔ Marcar como Concluído</button>`;

            container.innerHTML += `
                <div class="curso-card">
                    <div class="curso-topo">
                        <h2 class="curso-titulo">${curso.titulo}</h2>
                        <span class="curso-fonte">${curso.fonte}</span>
                    </div>
                    <p class="curso-resumo">${curso.resumo}</p>
                    <div class="curso-acoes">
                        <a href="${curso.link}" target="_blank" class="link-acessar">Acessar Curso ⭧</a>
                        ${botaoAcao}
                    </div>
                </div>
            `;
        });

    } catch (err) {
        console.error('Erro ao carregar a tela de cursos:', err);
    }
}

async function concluirCurso(idCurso) {
    const token = localStorage.getItem('token');
    
    if (!confirm('Você realmente assistiu/finalizou este curso?')) {
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/cursos/${idCurso}/concluir`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const resultado = await response.json();

        if (response.ok) {
            alert(resultado.mensagem); // Mensagem: "Parabéns! Você concluiu o curso e avançou um nível inteiro!"
            carregarCursos(); // Recarrega os cards para o botão ficar cinza (concluído)
        } else {
            alert('Erro: ' + resultado.erro);
        }
    } catch (err) {
        console.error('Erro na requisição:', err);
        alert('Erro de comunicação com o servidor.');
    }
}