const UserModel = require('../models/UserModel');
const Notification = require ('../models/Notification');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const SECRET = process.env.JWT_SECRET || 'piggyme_secret';

class AuthController {

    // POST /auth/login
    async login(req, res) {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ erro: 'Preencha email e senha' });
        }

        try {
           
            const usuario = await UserModel.buscarPorEmail(email);
            if (!usuario) {
                return res.status(401).json({ erro: 'Email ou senha incorretos' });
            }

         
            const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
            if (!senhaCorreta) {
                return res.status(401).json({ erro: 'Email ou senha incorretos' });
            }

            // 3. Gera o token JWT com o id e email do usuário
            // O token expira em 7 dias
            const token = jwt.sign(
                { id: usuario.id, email: usuario.email },
                SECRET,
                { expiresIn: '7d' }
            );

         
            return res.status(200).json({
                mensagem: 'Login realizado com sucesso!',
                token,
                usuario: {
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email
                }
            });

        } catch (err) {
            console.error(err);
            return res.status(500).json({ erro: 'Erro no servidor' });
        }
    }

    async forgotPassword(req, res) {
        const { email } = req.body;
        try{
           //const usuario = await UserModel.buscarPorEmail(email);//Verificar se o email existe
            //if (usuario) { //comentado para teste
                const resetToken = jwt.sign({id: 1}, process.env.JWT_SECRET, {expiresIn: '1h'});

                const baseUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

                const resetLink = `${baseUrl}/reset_password?token=${resetToken}`;
                
                await Notification.sendPasswordRecoveryEmail(email, resetLink);
                
            // }   //
        } catch (error){
            console.error('Erro no forgotPassword:', error);
            return res.status(500).json({ erro: 'Erro no servidor' });
      }
    }
}
module.exports = new AuthController();