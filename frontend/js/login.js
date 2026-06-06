
const botao_l = document.querySelector('.btn-main');

botao_l.addEventListener('click', async () => {
    const inputs = document.querySelectorAll('.input-field');
    const email = inputs[0].value.trim();
    const senha = inputs[1].value.trim();

    if (!email || !senha) {
        alert('Preencha o email e a senha.');
        return;
    }

    try {
        const resp = await fetch('/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha }),
        });

        const dados = await resp.json();

        if (resp.ok) {
            // Salva o token — sem isso TODOS os endpoints retornam 401
            localStorage.setItem('token', dados.token);
            localStorage.setItem('usuario', JSON.stringify(dados.usuario));
            window.location.href = '/menu';
        } else {
            alert(dados.erro || 'Erro ao fazer login.');
        }
    } catch (err) {
        console.error(err);
        alert('Não foi possível conectar ao servidor.');
    }
});
