const botao_l = document.querySelector('.btn-main');

botao_l.addEventListener('click', async () => {
    const nome = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('c_senha').value;

    if (senha !== confirmarSenha) {
        alert('As senhas não coincidem');
        return;
    }

    try {

        const resposta = await fetch('/api/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome,
                email,
                senha,
                confirmarSenha
            })
        });
        const dados = await resposta.json();

        if (resposta.ok) {
            alert('Usuário cadastrado com sucesso!');
            window.location.href = '/login';
        } else {
            alert(dados.erro);
        }
    }
    catch (erro) {
        console.error(erro);
        alert('Erro ao cadastrar usuário');
    }
    
    console.log('clicou');
});

