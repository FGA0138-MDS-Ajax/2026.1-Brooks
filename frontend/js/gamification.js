// frontend/js/gamification.js

function getToken() {
    return localStorage.getItem('token');
}

async function apiFetch(url, opcoes = {}) {
    const token = getToken();
    return fetch(url, {
        ...opcoes,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(opcoes.headers ?? {}),
        },
    });
}


function atualizarCardXp(xpTotal, nivel, progresso) {
    const elNivel = document.querySelector('.xp-info h2');
    if (elNivel) elNivel.textContent = `Nível ${nivel}`;

    const elXp = document.querySelector('.xp-info h1');
    if (elXp) elXp.textContent = `${xpTotal} XP`;

    const elBarra = document.querySelector('.xp-preenchido');
    if (elBarra) {
        elBarra.style.width = `${progresso}%`;
        elBarra.style.transition = 'width 0.6s ease';
    }
    const porco = document.querySelector('.porquinho');
    switch (nivel) {
        case 1: porco.src="../images/porco_inicial_1.png"; break;
        case 2: porco.src="../images/porco_inicial_2.png";break;
        case 3: porco.src="../images/porco_inicial_3.png";break;
        case 4: porco.src="../images/porco_feliz.png";break;
        case 5: porco.src="../images/porco_folgado_1.png";break;
        default: porco.src="../images/porco_folgado_2.png";break;
    }
}

async function carregarXp() {
    try {
        const resp = await apiFetch('/api/xp');
        if (!resp.ok) return; // não autenticado — silencia
        const { xpTotal, nivel, progresso } = await resp.json();
        atualizarCardXp(xpTotal, nivel, progresso);
    } catch (err) {
        console.warn('[Gamificação] Não foi possível carregar XP:', err.message);
    }
}




/**
 * Chame esta função ao salvar um gasto, receita ou meta.
 * @param {'gasto'|'receita'|'meta_criada'|'meta_concluida'|'login_diario'} acao
 * @param {string} [descricao]
 */
async function ganharXp(acao, descricao = '') {
    try {
        const resp = await apiFetch('/api/xp/ganhar', {
            method: 'POST',
            body: JSON.stringify({ acao, descricao }),
        });

        if (!resp.ok) return null;

        const dados = await resp.json();
        atualizarCardXp(dados.xpTotal, dados.nivel, dados.progresso);
        mostrarToastXp(dados.xpGanho);
        return dados;
    } catch (err) {
        console.warn('[Gamificação] Falha ao ganhar XP:', err.message);
        return null;
    }
}

function mostrarToastXp(xpGanho) {
    const antigo = document.getElementById('xp-toast');
    if (antigo) antigo.remove();

    const toast = document.createElement('div');
    toast.id = 'xp-toast';
    toast.textContent = `+${xpGanho} XP 🐷`;
    Object.assign(toast.style, {
        position: 'fixed', bottom: '30px', right: '30px',
        background: '#73002f', color: 'white',
        padding: '12px 24px', borderRadius: '30px',
        fontSize: '18px', fontWeight: 'bold',
        fontFamily: 'Arial, sans-serif',
        boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
        zIndex: '9999', opacity: '0',
        transition: 'opacity 0.3s ease',
        pointerEvents: 'none',
    });
    document.body.appendChild(toast);
    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 400);
        }, 2000);
    });
}

document.addEventListener('DOMContentLoaded', carregarXp);


window.ganharXp = ganharXp;
