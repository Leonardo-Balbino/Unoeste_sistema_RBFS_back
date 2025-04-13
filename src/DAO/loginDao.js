// DAO/loginDao.js
import db from '../Database/connection.js';
import bcrypt from 'bcrypt';

export default class LoginDAO {
  constructor() {
    this.createTable();
  }

  async createTable() {
    try {
      await db.execute(`
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(100) NOT NULL UNIQUE,
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          role VARCHAR(50) NOT NULL DEFAULT 'user',
          reset_token VARCHAR(255) DEFAULT NULL,
          reset_token_expiration DATETIME DEFAULT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);
      console.log("Tabela 'users' criada ou já existente.");
    } catch (error) {
      console.error("Erro ao criar tabela 'users':", error.message);
    }
  }

  /**
   * Cria um novo usuário no banco de dados.
   * @param {object} userData - Objeto contendo: username, email, password e role.
   * @returns {Promise<object>} Dados do usuário criado.
   */
  async createUser({ username, email, password, role = 'user' }) {
    return new Promise((resolve, reject) => {
      // Depure o valor da senha:
      console.log('Criando usuário com senha:', password);

      if (!password) {
        return reject(new Error("A senha não foi informada."));
      }

      bcrypt.hash(password, 10, (err, hash) => {
        if (err) return reject(err);

        const sql = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
        db.query(sql, [username, email, hash, role], (err, result) => {
          if (err) return reject(err);
          resolve({ id: result.insertId, username, email, role });
        });
      });
    });
  }

  /**
   * Realiza o login do usuário.
   * @param {string} username 
   * @param {string} password 
   * @returns {Promise<object|null>}
   */
  async login(username, password) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM users WHERE username = ? LIMIT 1';
      db.query(sql, [username], async (err, results) => {
        if (err) return reject(err);

        if (!results || results.length === 0) {
          return resolve(null);
        }

        const user = results[0];

        try {
          const match = await bcrypt.compare(password, user.password);
          if (!match) return resolve(null);
          resolve(user);
        } catch (error) {
          reject(error);
        }
      });
    });
  }
}
