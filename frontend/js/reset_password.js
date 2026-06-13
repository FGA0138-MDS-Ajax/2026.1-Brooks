console.log('O arquivo resetPassword.js foi carregado!');

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resetPasswordForm');
    const mensagem = document.getElementById('mensagem');

    // 1. CAPTURAR O TOKEN DA URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    // Se o usuário tentar abrir a página direto, sem ter vindo do e-mail (sem token na URL)
    if (!token) {
        mensagem.textContent = 'Erro: Link de recuperação inválido ou ausente.';
        mensagem.style.color = 'red';
        // Desativa o botão para evitar envio inútil
        form.querySelector('button').disabled = true; 
        return; // Para a execução do script aqui
    }

    // 2. INTERCEPTAR O FORMULÁRIO
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Impede a página de recarregar piscando a tela

        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Validação rápida no frontend antes de incomodar o servidor
        if (newPassword !== confirmPassword) {
            mensagem.textContent = 'As senhas não coincidem. Tente novamente!';
            mensagem.style.color = 'red';
            return;
        }

        mensagem.textContent = 'A salvar nova senha...';
        mensagem.style.color = '#e1b12c'; // Uma cor amarela/laranja de carregamento

        try {
            // 3. ENVIAR PARA O BACKEND
            // Vamos mandar tanto o Token (para o backend saber QUEM é) quanto a Nova Senha
            const response = await fetch('http://localhost:3000/auth/reset_password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    token: token, 
                    novaSenha: newPassword 
                })
            });

            const data = await response.json();

            if (response.ok) {
                mensagem.textContent = 'Senha alterada com sucesso! Redirecionando...';
                mensagem.style.color = 'green';
                
                // Redireciona o usuário de volta para a tela de login após 3 segundos
                setTimeout(() => {
                    window.location.href = 'login.html'; // Ajuste se o seu arquivo de login tiver outro nome
                }, 3000);
            } else {
                mensagem.textContent = data.erro || 'Erro ao redefinir a senha.';
                mensagem.style.color = 'red';
            }

        } catch (error) {
            console.error('Erro na requisição:', error);
            mensagem.textContent = 'Erro de comunicação com o servidor.';
            mensagem.style.color = 'red';
        }
    });
});