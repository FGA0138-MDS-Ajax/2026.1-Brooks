console.log("O ficheiro forgotPassword.js foi carregado com sucesso!"); 

// 1. Obriga o código a esperar que o HTML esteja 100% desenhado no ecrã
document.addEventListener('DOMContentLoaded', () => {
    console.log("O ecrã carregou completamente. A procurar o formulário...");

    const form = document.getElementById('forgotPasswordForm');
    
    // Proteção para ajudar a depurar no futuro
    if (!form) {
        console.error("ERRO: O formulário com id 'forgotPasswordForm' não foi encontrado no HTML!");
        return; // Pára o código aqui se não encontrar o formulário
    }

    // 2. Agora sim, anexa o evento de clique de forma segura
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); 
        
        console.log("O Javascript intercetou o clique no botão!"); 
        
        const email = document.getElementById('email').value;
        const messageBox = document.getElementById('messageBox');
        
        console.log("O e-mail capturado foi:", email);
        
        try {
            console.log("A tentar enviar o pedido para o backend...");
            
            const response = await fetch('/auth/forgot_password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            const data = await response.json();
            console.log("Resposta do servidor recebida:", response.status, data);

            if (response.ok) {
                messageBox.style.color = 'green';
                messageBox.textContent = 'Link de recuperação enviado com sucesso!';
            } else {
                messageBox.style.color = 'red';
                messageBox.textContent = data.error || 'Erro ao processar a solicitação.';
            }
        } catch (error) {
            console.error("Erro no momento do fetch:", error);
            messageBox.style.color = 'red';
            messageBox.textContent = 'Erro de ligação ao servidor.';
        }
    });
});