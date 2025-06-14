<<<<<<< HEAD
// DAO/loginDao.js
import db from '../Database/connection.js';
import bcrypt from 'bcrypt';

export default class LoginDAO {
  constructor() {
    this.createTable();
  }

  async createTable() {
    try {
      await db.query(`
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
        );
      `);
      console.log("Tabela 'users' criada ou já existente.");
    } catch (error) {
      console.error("Erro ao criar tabela 'users':", error.message);
    }
  }

  /**
   * Realiza o login de um usuário utilizando async/await.
   * @param {string} username 
   * @param {string} password 
   * @returns {Promise<object|null>} Retorna o usuário se as credenciais estiverem corretas ou null caso contrário.
   */
  async login(username, password) {
    try {
      // Usamos a pool Promise do mysql2, logo db.query já retorna uma Promise
      const [rows] = await db.query("SELECT * FROM users WHERE username = ? LIMIT 1", [username]);
      
      if (!rows || rows.length === 0) {
        return null;
      }
      
      const user = rows[0];
      
      // Compara a senha recebida com o hash armazenado
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return null;
      }
      
      return user;
    } catch (error) {
      throw error;
    }
  }

  async createUser({ username, email, password, role = 'user' }) {
    try {
      const hash = await bcrypt.hash(password, 10);
      const [result] = await db.query(
        "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
        [username, email, hash, role]
      );
      return { id: result.insertId, username, email, role };
    } catch (error) {
      throw error;
    }
  }
}
=======
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
   * Realiza o login de um usuário utilizando async/await.
   * @param {string} username 
   * @param {string} password 
   * @returns {Promise<object|null>} Retorna o usuário se as credenciais estiverem corretas ou null caso contrário.
   */
  async login(username, password) {
    try {
      // Usamos a pool Promise do mysql2, logo db.query já retorna uma Promise
      const [rows] = await db.query("SELECT * FROM users WHERE username = ? LIMIT 1", [username]);
      
      if (!rows || rows.length === 0) {
        return null;
      }
      
      const user = rows[0];
      
      // Compara a senha recebida com o hash armazenado
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return null;
      }
      
      return user;
    } catch (error) {
      throw error;
    }
  }

  async createUser({ username, email, password, role = 'user' }) {
    try {
      const hash = await bcrypt.hash(password, 10);
      const [result] = await db.query(
        "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
        [username, email, hash, role]
      );
      return { id: result.insertId, username, email, role };
    } catch (error) {
      throw error;
    }
  }
}
>>>>>>> 050b0febff384f13c3179dc979ba29845ab78417
