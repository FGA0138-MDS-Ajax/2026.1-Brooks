const UserModel = require('../models/UserModel');

class UserController {
    async cadastrar(req, res) {
        const { nome, email, senha, confirmarSenha } = req.body;

    
        if (!nome || !email || !senha) {
            return res.status(400).json({ erro: 'Por favor, preencha todos os campos' });
        }
        if (senha !== confirmarSenha) {
            return res.status(400).json({ erro: 'As senhas devem ser iguais' });
        }
        if (senha.length < 6) {
            return res.status(400).json({ erro: 'Senha fraca, digite pelo menos 6 caracteres' });
        }

        try {
            
            const emailExiste = await UserModel.emailExiste(email);
            if (emailExiste) {
                return res.status(409).json({ erro: 'Esse email já possui cadastro' });
            }

            
            const novoUsuario = await UserModel.criar(nome, email, senha);

            res.status(201).json({
                mensagem: 'Cadastro realizado com sucesso, seja bem-vindo ao Piggyme!',
                usuario: novoUsuario
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ erro: 'Erro no servidor' });
        }
    }
}

module.exports = new UserController();