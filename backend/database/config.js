const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'senha',
    database: 'piggyme'
}).promise();

module.exports = pool;