const express = require('express');
const path = require('path');

const app= express();

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

module.exports = app;