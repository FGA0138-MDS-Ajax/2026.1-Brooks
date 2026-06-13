const db = require('../database/config'); 

class Category {
    static async create({ nome, tipo, usuario_id }) {
        const [result] = await db.query(
            'INSERT INTO categorias (nome, tipo, usuario_id) VALUES (?, ?, ?)',
            [nome, tipo, usuario_id]
        );
        return { id: result.insertId, nome, tipo, usuario_id };
    }

    static async findAllByUser(usuario_id, tipo = null) {
        if (tipo) {
            const [rows] = await db.query(
                'SELECT * FROM categorias WHERE usuario_id = ? AND tipo = ? ORDER BY nome ASC',
                [usuario_id, tipo]
            );
            return rows;
        }
        const [rows] = await db.query(
            'SELECT * FROM categorias WHERE usuario_id = ? ORDER BY tipo ASC, nome ASC',
            [usuario_id]
        );
        return rows;
    }

    static async findById(id, usuario_id) {
        const [rows] = await db.query(
            'SELECT * FROM categorias WHERE id = ? AND usuario_id = ?',
            [id, usuario_id]
        );
        return rows[0];
    }

    static async findByNomeTipo(nome, tipo, usuario_id) {
        const [rows] = await db.query(
            'SELECT * FROM categorias WHERE nome = ? AND tipo = ? AND usuario_id = ?',
            [nome, tipo, usuario_id]
        );
        return rows[0];
    }

    static async delete(id, usuario_id) {
        const [result] = await db.query(
            'DELETE FROM categorias WHERE id = ? AND usuario_id = ?',
            [id, usuario_id]
        );
        return result.affectedRows > 0;
    }
}

module.exports = Category;