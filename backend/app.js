require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();


app.use(express.json());

app.use(express.static(path.join(__dirname, '../frontend')));

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

app.get('/add_gastos', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/pages/add_gastos.html'));
});

app.get('/add_receita', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/pages/add_receita.html'));
});

app.get('/forgot_password', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/pages/forgot_password.html'));
});

<<<<<<< Updated upstream

=======
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/pages/dashboard.html'));
});
>>>>>>> Stashed changes

module.exports = app;