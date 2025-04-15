// DAO/MantimentoDAO.js
import db from '../Database/connection.js';

export default class MantimentoDAO {
  constructor() {
    this.createTable();
  }

  async createTable() {
    try {
      await db.execute(`
        CREATE TABLE IF NOT EXISTS movimentacoes_mantimentos (
          id INT AUTO_INCREMENT PRIMARY KEY,
          mantimento_id INT NOT NULL,
          tipo ENUM('entrada', 'saida') NOT NULL,
          quantidade INT NOT NULL,
          data_movimentacao DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (mantimento_id) REFERENCES mantimentos(id)
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
  
  async registrarMovimentacao(mantimento_id, tipo, quantidade) {
    const tipoValido = ['entrada', 'saida'];
    if (!tipoValido.includes(tipo)) {
      throw new Error("Tipo de movimentação inválido");
    }
  
    // Atualiza o estoque
    const operacao = tipo === 'entrada' ? '+' : '-';
    await db.query(`
      UPDATE mantimentos SET quantidade = quantidade ${operacao} ? WHERE id = ?
    `, [quantidade, mantimento_id]);
  
    // Registra a movimentação
    await db.query(`
      INSERT INTO movimentacoes_mantimentos (mantimento_id, tipo, quantidade)
      VALUES (?, ?, ?)
    `, [mantimento_id, tipo, quantidade]);
  
    return { mensagem: `Movimentação de ${tipo} registrada com sucesso.` };
  }
  
  async listarMovimentacoes(mantimento_id) {
    const [rows] = await db.query(`
      SELECT * FROM movimentacoes_mantimentos WHERE mantimento_id = ? ORDER BY data_movimentacao DESC
    `, [mantimento_id]);
    return rows;
  }
}
