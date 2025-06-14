// DAO/AnimalDAO.js
import db from '../Database/connection.js';

export default class AnimalDAO {
  constructor() {
    this.createTable();
  }

  async createTable() {
    try {
      await db.execute(`
        CREATE TABLE IF NOT EXISTS animais (
          id INT AUTO_INCREMENT PRIMARY KEY,
          nome VARCHAR(255) NOT NULL,
          especie VARCHAR(100) NOT NULL,
          raca VARCHAR(100),
          idade INT,
          status VARCHAR(50) DEFAULT 'disponível',
          descricao TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);
      console.log("Tabela 'animais' verificada/criada com sucesso.");
    } catch (error) {
      console.error("Erro ao criar tabela 'animais':", error.message);
    }
  }

  async list() {
    const [rows] = await db.query("SELECT * FROM animais");
    return rows;
  }

  async create({ nome, especie, raca, idade, status, descricao }) {
    const [result] = await db.query(
      "INSERT INTO animais (nome, especie, raca, idade, status, descricao) VALUES (?, ?, ?, ?, ?, ?)",
      [nome, especie, raca, idade, status, descricao]
    );
    return { id: result.insertId, nome, especie, raca, idade, status, descricao };
  }

  async update(id, { nome, especie, raca, idade, status, descricao }) {
    const [result] = await db.query(
      "UPDATE animais SET nome = ?, especie = ?, raca = ?, idade = ?, status = ?, descricao = ? WHERE id = ?",
      [nome, especie, raca, idade, status, descricao, id]
    );
    if (result.affectedRows === 0) throw new Error("Animal não encontrado");
    return { mensagem: "Animal atualizado com sucesso" };
  }

  async delete(id) {
    const [result] = await db.query("DELETE FROM animais WHERE id = ?", [id]);
    if (result.affectedRows === 0) throw new Error("Animal não encontrado");
    return { mensagem: "Animal deletado com sucesso" };
  }

  async buscarPorId(id) {
    const [rows] = await db.query("SELECT * FROM animais WHERE id = ?", [id]);
    if (rows.length === 0) throw new Error("Animal não encontrado");
    return rows[0];
  }

}
