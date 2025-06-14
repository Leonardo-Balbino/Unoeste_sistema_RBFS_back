// DAO/ClinicaDAO.js
import db from '../Database/connection.js';

export default class ClinicaDAO {
  constructor() {
    this.createTable();
  }

  async createTable() {
    try {
      await db.execute(`
        CREATE TABLE IF NOT EXISTS Clinicas (
          id INT AUTO_INCREMENT PRIMARY KEY,
          nome VARCHAR(255) NOT NULL,
          endereco VARCHAR(255) NOT NULL,
          telefone VARCHAR(50),
          responsavel VARCHAR(255),
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);
      console.log("Tabela 'Clinicas' verificada/criada com sucesso.");
    } catch (error) {
      console.error("Erro ao criar tabela 'Clinicas':", error.message);
    }
  }

  async list() {
    const [rows] = await db.query("SELECT * FROM Clinicas");
    return rows;
  }

  async create({ nome, endereco, telefone, responsavel }) {
    const [result] = await db.query(
      "INSERT INTO Clinicas (nome, endereco, telefone, responsavel) VALUES (?, ?, ?, ?)",
      [nome, endereco, telefone, responsavel]
    );
    return { id: result.insertId, nome, endereco, telefone, responsavel };
  }

  async update(id, { nome, endereco, telefone, responsavel }) {
    const [result] = await db.query(
      "UPDATE Clinicas SET nome = ?, endereco = ?, telefone = ?, responsavel = ? WHERE id = ?",
      [nome, endereco, telefone, responsavel, id]
    );
    if (result.affectedRows === 0) throw new Error("Clínica não encontrada");
    return { mensagem: "Clínica atualizada com sucesso" };
  }

  async delete(id) {
    const [result] = await db.query("DELETE FROM Clinicas WHERE id = ?", [id]);
    if (result.affectedRows === 0) throw new Error("Clínica não encontrada");
    return { mensagem: "Clínica excluída com sucesso" };
  }
}
