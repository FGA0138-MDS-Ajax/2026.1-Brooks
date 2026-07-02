// frontend/js/auth.js
// Proteção de rotas do frontend.
// Deve ser o PRIMEIRO script carregado em toda página protegida.

(function () {
    const token = localStorage.getItem('token');
    if (!token) {
        // Sem token → manda para o login imediatamente
        window.location.replace('/login');
    }
})();

/**
 * Limpa a sessão e redireciona para o login.
 * Use nos botões "Sair" de todas as páginas.
 */
function sair() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    window.location.replace('/login');
}
