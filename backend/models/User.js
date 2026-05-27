const db = require('../config/database');
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
}

module.exports = UserModel;
