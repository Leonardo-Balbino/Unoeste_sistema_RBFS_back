import db from '../Database/connection.js';

export default class FinanceiroDAO {
  // para evitar múltiplas criações
  static _tabelasCriadas = false;

  constructor() {
    if (!FinanceiroDAO._tabelasCriadas) {
      this._createTable();
      FinanceiroDAO._tabelasCriadas = true;
    }
  }

  async _createTable() {
    try {
      await db.execute(`
        CREATE TABLE IF NOT EXISTS transacoes_financeiras (
          id INT AUTO_INCREMENT PRIMARY KEY,
          tipo ENUM('doacao','compra') NOT NULL,
          valor DECIMAL(10,2) NOT NULL,
          descricao TEXT,
          data_transacao DATETIME DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB;
      `);
      console.log("Tabela 'transacoes_financeiras' verificada/criada com sucesso.");
    } catch (err) {
      console.error("Erro ao criar tabela 'transacoes_financeiras':", err.message);
    }
  }

  async list() {
    const [rows] = await db.query(
      "SELECT * FROM transacoes_financeiras ORDER BY data_transacao DESC"
    );
    return rows;
  }

  async create({ tipo, valor, descricao }) {
    const [result] = await db.query(
      `INSERT INTO transacoes_financeiras (tipo, valor, descricao)
       VALUES (?, ?, ?)`,
      [tipo, valor, descricao]
    );
    return {
      id:       result.insertId,
      tipo,
      valor,
      descricao,
      data_transacao: new Date().toISOString().slice(0, 19).replace('T',' ')
    };
  }

  async update(id, { tipo, valor, descricao }) {
    const [result] = await db.query(
      `UPDATE transacoes_financeiras
         SET tipo = ?, valor = ?, descricao = ?
       WHERE id = ?`,
      [tipo, valor, descricao, id]
    );
    if (result.affectedRows === 0) {
      throw new Error("Transação não encontrada");
    }
    return { mensagem: "Transação atualizada com sucesso" };
  }

  async delete(id) {
    const [result] = await db.query(
      "DELETE FROM transacoes_financeiras WHERE id = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      throw new Error("Transação não encontrada");
    }
    return { mensagem: "Transação excluída com sucesso" };
  }

  async getSaldo() {
    const [rows] = await db.query(`
      SELECT
        SUM(CASE WHEN tipo = 'doacao' THEN valor ELSE -valor END) AS saldo
      FROM transacoes_financeiras
    `);
    return { saldo: rows[0].saldo ?? 0 };
  }
}
