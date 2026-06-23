const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
        if (usuario.nome) {

    const saudacao = document.getElementById('saudacao');

    if (saudacao) {
        saudacao.textContent = `Olá, ${usuario.nome}! 👋`;
    }

}

        const inputData = document.getElementById('data');
        const hoje = new Date().toISOString().split('T')[0];
        inputData.value = hoje;

        const token = localStorage.getItem('token');
        const selectCategoria = document.getElementById('categoria');

        async function carregarCategorias() {

            try {

                const resp = await fetch('/api/categorias?tipo=despesa', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const dados = await resp.json();

                console.log("DADOS RECEBIDOS:", dados);

                if (!resp.ok) {
                    console.error(dados.erro);
                    return;
                }


                const select = document.getElementById('categoria');

                // limpa opções antigas
                select.innerHTML = `
                    <option value="">
                        Selecione uma categoria
                    </option>
                `;


                dados.categorias.forEach(categoria => {

                    const option = document.createElement('option');

                    option.value = categoria.nome;
                    option.textContent = categoria.nome;

                    select.appendChild(option);

                });

                console.log(
                    "OPTIONS NO SELECT:",
                    select.options
                );


            } catch(error) {

                console.error(
                    "Erro ao carregar categorias:",
                    error
                );

            }
        }

        let valorAnteriorSelect = '';

        selectCategoria.addEventListener('change', (e) => {
            if (e.target.value === '__nova__') {
                abrirModalCategoria();
            } else {
                valorAnteriorSelect = e.target.value;
                ocultarErroCategoria();
            }
        });

        document.getElementById('valor').addEventListener('input', atualizarResumo);

        function atualizarResumo() {
            const saldoAtual = parseFloat(localStorage.getItem('saldoAtual') || '0');
            const valorInput = parseFloat(document.getElementById('valor').value) || 0;

            const fmt = (n) => 'R$ ' + n.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            document.getElementById('saldoAtual').textContent = fmt(saldoAtual);
            document.getElementById('saldoApos').textContent  = fmt(saldoAtual - valorInput);
        }

        atualizarResumo();

        function abrirModalCategoria() {
            document.getElementById('novaCategoriaInput').value = '';
            document.getElementById('modalCategoria').classList.add('ativo');
        }

        function fecharModalCategoria() {
            document.getElementById('modalCategoria').classList.remove('ativo');
            selectCategoria.value = valorAnteriorSelect;
        }

        async function confirmarNovaCategoria() {
            const nome = document.getElementById('novaCategoriaInput').value.trim();
            if (!nome) { alert('Informe o nome da categoria.'); return; }
            try {
                const resp = await fetch('/api/categorias', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                    body: JSON.stringify({ nome, tipo: 'despesa' })
                });
                const dados = await resp.json();
                if (!resp.ok) { alert(dados.erro || 'Erro ao criar categoria.'); return; }
                const opt = document.createElement('option');
                opt.value = dados.categoria.nome;
                opt.textContent = dados.categoria.nome;
                selectCategoria.value = dados.categoria.nome;
                valorAnteriorSelect  = dados.categoria.nome;
                document.getElementById('modalCategoria').classList.remove('ativo');
                ocultarErroCategoria();
            } catch (err) {
                console.error(err);
                alert('Não foi possível conectar ao servidor.');
            }
        }

        function mostrarErroCategoria()  { document.getElementById('erroCategoria').style.display = 'block'; }
        function ocultarErroCategoria()  { document.getElementById('erroCategoria').style.display = 'none';  }

        async function salvar() {
            const desc      = document.getElementById('descricao').value.trim();
            const valor     = parseFloat(document.getElementById('valor').value);
            const categoria = selectCategoria.value;
            const data      = document.getElementById('data').value;

            if (!desc)                { alert('Informe uma descrição.'); return; }
            if (!valor || valor <= 0) { alert('Informe um valor válido.'); return; }
            if (!data)                { alert('Informe a data.'); return; }
            if (!categoria || categoria === '__nova__') {
                mostrarErroCategoria();
                selectCategoria.focus();
                return;
            }

            const btn = document.querySelector('.btn-salvar');
            btn.disabled = true;
            btn.textContent = 'Salvando…';

            try {
                const resp = await fetch('/api/transacoes/gasto', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                    body: JSON.stringify({ descricao: desc, valor, categoria, data })
                });
                const dados = await resp.json();
                if (!resp.ok) {
                    alert(dados.erro || 'Erro ao salvar gasto.');
                    btn.disabled = false;
                    btn.textContent = 'Salvar gasto';
                    return;
                }
                await ganharXp('gasto', desc);
                alert('Gasto registrado!\n\n' + desc + ' (' + categoria + ') — R$ ' + valor.toFixed(2).replace('.', ','));
                window.location.href = 'menu';
            } catch (err) {
                console.error(err);
                alert('Não foi possível conectar ao servidor.');
                btn.disabled = false;
                btn.textContent = 'Salvar gasto';
            }
        }

        carregarCategorias();