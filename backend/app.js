require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const categoryRoutes = require('./routes/categoryRoutes');
const transactionRoutes = require('./routes/transactionRoutes'); 
const cursoRoutes = require('./routes/cursoRoutes');

const app = express();

app.use(express.json());
app.use(cors()); 

app.use(express.static(path.join(__dirname, '../frontend')));

// ROTAS DA API
app.use('/api/categorias', categoryRoutes);
app.use('/api/transacoes', transactionRoutes);
app.use('/api/cursos', cursoRoutes);
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/pages/Home.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/pages/login.html'));
});

app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/pages/cadastro.html'));
});

app.get('/menu', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/pages/menu.html'));
});

app.get('/metas', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/pages/metas.html'));
});

app.get('/add_metas', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/pages/add_metas.html'));
});

app.get('/add_gastos', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/pages/add_gastos.html'));
});

app.get('/add_receita', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/pages/add_receita.html'));
});

app.get('/forgot_password', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/pages/forgot_password.html'));
});

app.get('/reset_password', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/pages/reset_password.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/pages/dashboard.html'));
});

app.get('/historico', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/pages/historico.html'));
});

app.get('/relatorios', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/pages/relatorios.html'));
});

app.get('/cursos', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/pages/cursos.html'));
});

module.exports = app;
