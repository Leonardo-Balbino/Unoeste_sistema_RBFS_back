// DAO/VoluntarioDAO.js
import db from '../Database/connection.js';

export default class VoluntarioDAO {
  constructor() {
    this.createTable();
  }

  async createTable() {
    try {
      await db.query(`
        CREATE TABLE IF NOT EXISTS voluntarios (
          id INT AUTO_INCREMENT PRIMARY KEY,
          nome VARCHAR(255) NOT NULL,
          contato VARCHAR(255) NOT NULL,
          habilidades TEXT NOT NULL,
          disponibilidade VARCHAR(100) NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);
      console.log("Tabela 'voluntarios' verificada/criada com sucesso.");
    } catch (error) {
      console.error("Erro ao criar tabela 'voluntarios':", error.message);
    }
  }

  async list() {
    const [rows] = await db.query("SELECT * FROM voluntarios");
    return rows;
  }

  async create({ nome, contato, habilidades, disponibilidade }) {
    const [result] = await db.query(
      "INSERT INTO voluntarios (nome, contato, habilidades, disponibilidade) VALUES (?, ?, ?, ?)",
      [nome, contato, habilidades, disponibilidade]
    );
    return { id: result.insertId, nome, contato, habilidades, disponibilidade };
  }

  async update(id, { nome, contato, habilidades, disponibilidade }) {
    const [result] = await db.query(
      "UPDATE voluntarios SET nome = ?, contato = ?, habilidades = ?, disponibilidade = ? WHERE id = ?",
      [nome, contato, habilidades, disponibilidade, id]
    );
    if (result.affectedRows === 0) throw new Error("Voluntário não encontrado");
    return { mensagem: "Voluntário atualizado com sucesso" };
  }

  async delete(id) {
    const [result] = await db.query("DELETE FROM voluntarios WHERE id = ?", [id]);
    if (result.affectedRows === 0) throw new Error("Voluntário não encontrado");
    return { mensagem: "Voluntário deletado com sucesso" };
  }
}
