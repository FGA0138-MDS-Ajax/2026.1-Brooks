const nodemailer = require('nodemailer');

const Notification = {
    sendPasswordRecoveryEmail: async (userEmail, resetLink) => {
        // Configuração do "carteiro" (Transportador) utilizando variáveis de ambiente
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Estrutura do e-mail que o utilizador vai receber
        const mailOptions = {
            from: '"Equipa PiggyMe" <suporte@piggyme.com>',
            to: userEmail,
            subject: 'Recuperação de Senha - PiggyMe',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">Recuperação de Senha</h2>
                    <p>Recebemos um pedido para redefinir a Senha da sua conta PiggyMe.</p>
                    <p>Clique no botão abaixo para criar uma nova Senha. Este link é válido por 1 hora.</p>
                    <a href="${resetLink}" style="background-color: #f75a68; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 10px;">Redefinir Palavra-passe</a>
                    <p style="margin-top: 20px; font-size: 12px; color: #777;">Se não efetuou este pedido, por favor ignore este e-mail.</p>
                </div>
            `
        };

        // Dispara o e-mail
        return await transporter.sendMail(mailOptions);
    }
};

module.exports = Notification;