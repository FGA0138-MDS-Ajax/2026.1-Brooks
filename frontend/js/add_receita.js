/* =========================================================
   add_receita.js  –  Adicionar + Editar + Excluir receitas
   ========================================================= */

const API = '';

let saldoAtual = 0;
let editandoId  = null;

const fmt = v =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);

function showErro(msg) {
    const el = document.getElementById('erroCategoria');
    el.textContent = msg;
    el.style.display = 'block';
}
function hideErro() {
    document.getElementById('erroCategoria').style.display = 'none';
}

/* ── saldo ── */
async function carregarSaldo() {
    try {
        const r = await fetch(`${API}/transacoes/saldo`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        const d = await r.json();
        saldoAtual = d.saldo ?? 0;
        document.getElementById('saldoAtual').textContent = fmt(saldoAtual);
        atualizarSaldoApos();
    } catch { /* silencioso */ }
}

function atualizarSaldoApos() {
    const v = parseFloat(document.getElementById('valor').value) || 0;
    document.getElementById('saldoApos').textContent = fmt(saldoAtual + v);
}

/* ── categorias ── */
async function carregarCategorias(selecionada = '') {
    try {
        const r = await fetch(`${API}/categorias?tipo=receita`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        const { categorias } = await r.json();
        const sel = document.getElementById('categoria');
        sel.innerHTML = '<option value="">Selecione uma categoria</option>';
        categorias.forEach(c => {
            const opt = document.createElement('option');
            opt.value = c.nome;
            opt.textContent = c.nome;
            if (c.nome === selecionada) opt.selected = true;
            sel.appendChild(opt);
        });

        if (!document.getElementById('btnNovaCategoria')) {
            const btn = document.createElement('button');
            btn.id          = 'btnNovaCategoria';
            btn.type        = 'button';
            btn.className   = 'btn-nova-cat';
            btn.textContent = '+ Nova categoria';
            btn.onclick     = abrirModalCategoria;
            sel.parentElement.appendChild(btn);
        }
    } catch { /* silencioso */ }
}

function abrirModalCategoria()  { document.getElementById('modalCategoria').classList.add('ativo'); }
function fecharModalCategoria() { document.getElementById('modalCategoria').classList.remove('ativo'); }

async function confirmarNovaCategoria() {
    const nome = document.getElementById('novaCategoriaInput').value.trim();
    if (!nome) return;
    try {
        await fetch(`${API}/categorias`, {
            method : 'POST',
            headers: {
                'Content-Type' : 'application/json',
                Authorization  : `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ nome, tipo: 'receita' })
        });
        fecharModalCategoria();
        document.getElementById('novaCategoriaInput').value = '';
        await carregarCategorias(nome);
        document.getElementById('categoria').value = nome;
    } catch { alert('Erro ao criar categoria.'); }
}

/* ── limpar formulário ── */
function limparForm() {
    document.getElementById('descricao').value = '';
    document.getElementById('valor').value     = '';
    document.getElementById('categoria').value = '';
    document.getElementById('data').value      = '';
    hideErro();
    editandoId = null;

    document.querySelector('.btn-salvar').textContent = 'Salvar receita';
    const btn = document.getElementById('btnCancelarEdicao');
    if (btn) btn.remove();

    atualizarSaldoApos();
}

/* ── preencher para edição ── */
function preencherFormParaEdicao(t) {
    editandoId = t.id;
    document.getElementById('descricao').value = t.descricao;
    document.getElementById('valor').value     = t.valor;
    document.getElementById('categoria').value = t.categoria || '';
    if (t.data) document.getElementById('data').value = t.data.substring(0, 10);

    document.querySelector('.btn-salvar').textContent = 'Salvar alterações';

    if (!document.getElementById('btnCancelarEdicao')) {
        const btn = document.createElement('button');
        btn.id          = 'btnCancelarEdicao';
        btn.type        = 'button';
        btn.className   = 'btn-cancelar-edicao';
        btn.textContent = 'Cancelar edição';
        btn.onclick     = limparForm;
        document.querySelector('.botoes-form').appendChild(btn);
    }

    atualizarSaldoApos();
    document.getElementById('descricao').scrollIntoView({ behavior: 'smooth', block: 'center' });
    document.getElementById('descricao').focus();
}

/* ── salvar ── */
async function salvar() {
    const descricao = document.getElementById('descricao').value.trim();
    const valor     = parseFloat(document.getElementById('valor').value);
    const categoria = document.getElementById('categoria').value;

    if (!descricao) return showErro('Informe uma descrição.');
    if (!valor || valor <= 0) return showErro('Informe um valor válido.');
    hideErro();

    const body    = JSON.stringify({ descricao, valor, categoria: categoria || null });
    const headers = {
        'Content-Type' : 'application/json',
        Authorization  : `Bearer ${localStorage.getItem('token')}`
    };

    try {
        let r;
        if (editandoId) {
            r = await fetch(`${API}/transacoes/${editandoId}`, { method: 'PUT', headers, body });
        } else {
            r = await fetch(`${API}/transacoes/receita`, { method: 'POST', headers, body });
        }

        const d = await r.json();
        if (!r.ok) return showErro(d.erro || 'Erro ao salvar.');

        const msg = editandoId ? 'Receita atualizada!' : 'Receita registrada!';
        mostrarToast(msg, 'sucesso');
        limparForm();
        await carregarSaldo();
        await carregarHistorico();
    } catch { showErro('Erro de conexão.'); }
}

/* ── excluir ── */
async function excluir(id) {
    if (!confirm('Deseja excluir esta receita?')) return;
    try {
        const r = await fetch(`${API}/transacoes/${id}`, {
            method : 'DELETE',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        if (!r.ok) { const d = await r.json(); return alert(d.erro); }
        mostrarToast('Receita excluída.', 'erro');
        if (editandoId === id) limparForm();
        await carregarSaldo();
        await carregarHistorico();
    } catch { alert('Erro de conexão.'); }
}

/* ── histórico ── */
async function carregarHistorico() {
    const container = document.getElementById('historicoLista');
    if (!container) return;

    try {
        const r = await fetch(`${API}/transacoes`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        const { transacoes } = await r.json();
        const receitas = transacoes.filter(t => t.tipo === 'receita');

        if (!receitas.length) {
            container.innerHTML = '<p class="historico-vazio">Nenhuma receita registrada ainda.</p>';
            return;
        }

        container.innerHTML = receitas.map(t => `
            <div class="historico-item" data-id="${t.id}">
                <div class="historico-info">
                    <span class="historico-desc">${t.descricao}</span>
                    <span class="historico-cat">${t.categoria || '—'}</span>
                    <span class="historico-data">${formatarData(t.data)}</span>
                </div>
                <div class="historico-direita">
                    <span class="historico-valor receita">+ ${fmt(t.valor)}</span>
                    <div class="historico-acoes">
                        <button class="btn-editar-item" title="Editar" onclick='editarItem(${JSON.stringify(t)})'>
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5
                                         m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                            </svg>
                        </button>
                        <button class="btn-excluir-item" title="Excluir" onclick="excluir(${t.id})">
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"/>
                                <path stroke-linecap="round" stroke-linejoin="round"
                                      d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6
                                         m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    } catch { /* silencioso */ }
}

function editarItem(t) {
    carregarCategorias(t.categoria || '').then(() => preencherFormParaEdicao(t));
}

function formatarData(str) {
    if (!str) return '';
    const [y, m, d] = str.substring(0, 10).split('-');
    return `${d}/${m}/${y}`;
}

/* ── toast ── */
function mostrarToast(msg, tipo = 'sucesso') {
    let t = document.getElementById('toast');
    if (!t) {
        t = document.createElement('div');
        t.id = 'toast';
        document.body.appendChild(t);
    }
    t.textContent = msg;
    t.className   = `toast toast-${tipo} toast-visivel`;
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove('toast-visivel'), 3000);
}

/* ── init ── */
document.addEventListener('DOMContentLoaded', async () => {
    document.getElementById('valor')
        ?.addEventListener('input', atualizarSaldoApos);

    const dataEl = document.getElementById('data');
    if (dataEl && !dataEl.value) {
        dataEl.value = new Date().toISOString().substring(0, 10);
    }

    await carregarSaldo();
    await carregarCategorias();
    await carregarHistorico();
});