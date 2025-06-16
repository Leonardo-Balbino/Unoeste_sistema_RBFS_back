
// DAO/AdotanteDAO.js
import db from '../Database/connection.js';

export default class AdotanteDAO {
  constructor() {
    this.createTable();
  }

  async createTable() {
    try {
      await db.query(`
        CREATE TABLE IF NOT EXISTS adotantes (
          id INT AUTO_INCREMENT PRIMARY KEY,
          nome VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          telefone VARCHAR(100),
          endereco VARCHAR(255),
          documento VARCHAR(100),
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);
      console.log("Tabela 'adotantes' verificada/criada com sucesso.");
    } catch (error) {
      console.error("Erro ao criar tabela 'adotantes':", error.message);
    }
  }

  async list() {
    const [rows] = await db.query("SELECT * FROM adotantes");
    return rows;
  }

  async create({ nome, email, telefone, endereco, documento }) {
    const [result] = await db.query(
      "INSERT INTO adotantes (nome, email, telefone, endereco, documento) VALUES (?, ?, ?, ?, ?)",
      [nome, email, telefone, endereco, documento]
    );
    return { id: result.insertId, nome, email, telefone, endereco, documento };
  }

  async update(id, { nome, email, telefone, endereco, documento }) {
    const [result] = await db.query(
      "UPDATE adotantes SET nome = ?, email = ?, telefone = ?, endereco = ?, documento = ? WHERE id = ?",
      [nome, email, telefone, endereco, documento, id]
    );
    if (result.affectedRows === 0) throw new Error("Adotante não encontrado");
    return { mensagem: "Adotante atualizado com sucesso" };
  }

  async delete(id) {
    const [result] = await db.query("DELETE FROM adotantes WHERE id = ?", [id]);
    if (result.affectedRows === 0) throw new Error("Adotante não encontrado");
    return { mensagem: "Adotante deletado com sucesso" };
  }
}
