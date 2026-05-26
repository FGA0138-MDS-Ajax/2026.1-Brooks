const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

// essa é a configuração do banco de dados integrando ao mysql
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'senha', 
    database: 'piggyme'
}).promise();

app.post('/cadastrar', async (req, res) => {
    const { nome, email, senha, confirmarSenha } = req.body;

    if (!nome || !email || !senha) return res.status(400).json({ erro: 'Por favor, preencha todos os campos' });
    if (senha !== confirmarSenha) return res.status(400).json({ erro: 'As senhas devem ser iguais' });
    if (senha.length < 6) return res.status(400).json({ erro: 'Senha fraca, digite pelo menos 6 caracteres' });

    try {
        const [existe] = await db.query('SELECT id FROM usuarios WHERE email = ?', [email]);
        if (existe.length > 0) return res.status(409).json({ erro: 'Esse email já possui cadastro' });

        const hash = await bcrypt.hash(senha, 10);
        const [result] = await db.query(
            'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
            [nome, email, hash]
        );

        res.status(201).json({ 
            mensagem: 'Cadastro realizado com sucesso, seja bem-vindo ao Piggyme!',
            usuario: { id: result.insertId, nome, email }
        });
    } catch (err) {
        res.status(500).json({ erro: 'Erro no servidor' });
    }
});

app.listen(3000, () => console.log('Servidor rodando'));