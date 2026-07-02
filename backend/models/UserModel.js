const db = require('../database/config');
const bcrypt = require('bcrypt');

class UserModel {

    static async emailExiste(email) {
        const [rows] = await db.query('SELECT id FROM usuarios WHERE email = ?', [email]);
        return rows.length > 0;
    }

    
    static async criar(nome, email, senha) {
        const hash = await bcrypt.hash(senha, 10);
        const [result] = await db.query(
            'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
            [nome, email, hash]
        );
        return {
            id: result.insertId,
            nome,
            email
        };
    }

    static async buscarPorEmail(email) {
        const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        return rows[0] || null;
    }

    static async atualizarSenha(id, novaSenhaHash) {
        const query = 'UPDATE usuarios SET senha = ? WHERE id = ?';
        const values = [novaSenhaHash, id];
        
        try {
            await db.execute(query, values); // Ajuste para db.query ou o comando que você usa
            return true;
        } catch (error) {
            console.error('Erro ao atualizar senha no banco:', error);
            throw error;
        }
    }
}




module.exports = UserModel;
