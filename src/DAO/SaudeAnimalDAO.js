import db from '../Database/connection.js';

export default class SaudeAnimalDAO {
  constructor() {
    this.createTable();
  }

  async createTable() {
    await db.query(`
      CREATE TABLE IF NOT EXISTS saude_animais (
        id INT AUTO_INCREMENT PRIMARY KEY,
        animal_id INT NOT NULL,
        condicoes TEXT NOT NULL,
        observacoes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (animal_id) REFERENCES animais(id) ON DELETE CASCADE
      )
    `);
  }

  async list() {
    const [rows] = await db.query(`
      SELECT sa.*, a.nome as animal_nome
      FROM saude_animais sa
      JOIN animais a ON sa.animal_id = a.id
    `);
    return rows;
  }

  async create({ animal_id, condicoes, observacoes }) {
    const [result] = await db.query(
      "INSERT INTO saude_animais (animal_id, condicoes, observacoes) VALUES (?, ?, ?)",
      [animal_id, condicoes, observacoes]
    );
    return { id: result.insertId, animal_id, condicoes, observacoes };
  }

  async update(id, { condicoes, observacoes }) {
    const [result] = await db.query(
      "UPDATE saude_animais SET condicoes = ?, observacoes = ? WHERE id = ?",
      [condicoes, observacoes, id]
    );
    if (result.affectedRows === 0) throw new Error("Relatório não encontrado");
    return { mensagem: "Relatório atualizado com sucesso" };
  }

  async delete(id) {
    const [result] = await db.query("DELETE FROM saude_animais WHERE id = ?", [id]);
    if (result.affectedRows === 0) throw new Error("Relatório não encontrado");
    return { mensagem: "Relatório deletado com sucesso" };
  }
}