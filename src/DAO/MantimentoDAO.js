// DAO/MantimentoDAO.js
import db from '../Database/connection.js';

export default class MantimentoDAO {
  constructor() {
    this.createTable();
  }

  async createTable() {
    try {
      await db.execute(`
        CREATE TABLE IF NOT EXISTS mantimentos (
          id INT AUTO_INCREMENT PRIMARY KEY,
          nome VARCHAR(255) NOT NULL,
          quantidade INT NOT NULL,
          validade DATE NOT NULL,
          unidade_medida VARCHAR(50),
          descricao TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);
      console.log("Tabela 'mantimentos' verificada/criada com sucesso.");
    } catch (error) {
      console.error("Erro ao criar tabela 'mantimentos':", error.message);
    }
  }

  async list() {
    const [rows] = await db.query("SELECT * FROM mantimentos");
    return rows;
  }

  async create({ nome, quantidade, validade }) {
    const [result] = await db.query(
      "INSERT INTO mantimentos (nome, quantidade, validade) VALUES (?, ?, ?)",
      [nome, quantidade, validade]
    );
    return { id: result.insertId, nome, quantidade, validade };
  }

  async update(id, { nome, quantidade, validade, unidade_medida, descricao }) {
    const [result] = await db.query(
      "UPDATE mantimentos SET nome = ?, quantidade = ?, validade = ?, unidade_medida = ?, descricao = ? WHERE id = ?",
      [nome, quantidade, validade, unidade_medida, descricao, id]
    );
    if (result.affectedRows === 0) throw new Error("Mantimento não encontrado");
    return { mensagem: "Mantimento atualizado com sucesso" };
  }

  async delete(id) {
    const [result] = await db.query("DELETE FROM mantimentos WHERE id = ?", [id]);
    if (result.affectedRows === 0) throw new Error("Mantimento não encontrado");
    return { mensagem: "Mantimento deletado com sucesso" };
  }
}
