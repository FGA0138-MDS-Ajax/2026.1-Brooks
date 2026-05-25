const botao_l = document.querySelector('.botao-login');
const botao_c = document.querySelector('.botao-cadastro');

botao_l.addEventListener('click', () => {
    window.location.href = '/login';
    console.log('clicou');
});


botao_c.addEventListener('click', () => {
    window.location.href = '/cadastro';
    console.log('clicou');
});