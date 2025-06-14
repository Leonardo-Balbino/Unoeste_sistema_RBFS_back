<<<<<<< HEAD
// DAO/VacinaDAO.js
import db from '../Database/connection.js';

export default class VacinaDAO {
  constructor() {
    this.createTable();
  }

  async createTable() {
    try {
      await db.query(`
        CREATE TABLE IF NOT EXISTS vacinas (
          id INT AUTO_INCREMENT PRIMARY KEY,
          nome VARCHAR(255) NOT NULL,
          tipo VARCHAR(100) NOT NULL,
          fabricante VARCHAR(255) NOT NULL,
          lote VARCHAR(100) NOT NULL,
          dados_fabricacao DATE NOT NULL,
          validade DATE NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);
      console.log("Tabela 'vacinas' verificada/criada com sucesso.");
    } catch (error) {
      console.error("Erro ao criar tabela 'vacinas':", error.message);
    }
  }

  async list() {
    const [rows] = await db.query("SELECT * FROM vacinas");
    return rows;
  }

  async create({ nome, tipo, fabricante, lote, dados_fabricacao, validade }) {
    const [result] = await db.query(
      "INSERT INTO vacinas (nome, tipo, fabricante, lote, dados_fabricacao, validade) VALUES (?, ?, ?, ?, ?, ?)",
      [nome, tipo, fabricante, lote, dados_fabricacao, validade]
    );
    return { id: result.insertId, nome, tipo, fabricante, lote, dados_fabricacao, validade };
  }

  async update(id, { nome, tipo, fabricante, lote, dados_fabricacao, validade }) {
    const [result] = await db.query(
      "UPDATE vacinas SET nome = ?, tipo = ?, fabricante = ?, lote = ?, dados_fabricacao = ?, validade = ? WHERE id = ?",
      [nome, tipo, fabricante, lote, dados_fabricacao, validade, id]
    );
    if (result.affectedRows === 0) throw new Error("Vacina não encontrada");
    return { mensagem: "Vacina atualizada com sucesso" };
  }

  async delete(id) {
    const [result] = await db.query("DELETE FROM vacinas WHERE id = ?", [id]);
    if (result.affectedRows === 0) throw new Error("Vacina não encontrada");
    return { mensagem: "Vacina deletada com sucesso" };
  }
}
=======
// DAO/VacinaDAO.js
import db from '../Database/connection.js';

export default class VacinaDAO {
  constructor() {
    this.createTable();
  }

  async createTable() {
    try {
      await db.execute(`
        CREATE TABLE IF NOT EXISTS vacinas (
          id INT AUTO_INCREMENT PRIMARY KEY,
          nome VARCHAR(255) NOT NULL,
          tipo VARCHAR(100) NOT NULL,
          fabricante VARCHAR(255) NOT NULL,
          lote VARCHAR(100) NOT NULL,
          dados_fabricacao DATE NOT NULL,
          validade DATE NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);
      console.log("Tabela 'vacinas' verificada/criada com sucesso.");
    } catch (error) {
      console.error("Erro ao criar tabela 'vacinas':", error.message);
    }
  }

  async list() {
    const [rows] = await db.query("SELECT * FROM vacinas");
    return rows;
  }

  async create({ nome, tipo, fabricante, lote, dados_fabricacao, validade }) {
    const [result] = await db.query(
      "INSERT INTO vacinas (nome, tipo, fabricante, lote, dados_fabricacao, validade) VALUES (?, ?, ?, ?, ?, ?)",
      [nome, tipo, fabricante, lote, dados_fabricacao, validade]
    );
    return { id: result.insertId, nome, tipo, fabricante, lote, dados_fabricacao, validade };
  }

  async update(id, { nome, tipo, fabricante, lote, dados_fabricacao, validade }) {
    const [result] = await db.query(
      "UPDATE vacinas SET nome = ?, tipo = ?, fabricante = ?, lote = ?, dados_fabricacao = ?, validade = ? WHERE id = ?",
      [nome, tipo, fabricante, lote, dados_fabricacao, validade, id]
    );
    if (result.affectedRows === 0) throw new Error("Vacina não encontrada");
    return { mensagem: "Vacina atualizada com sucesso" };
  }

  async delete(id) {
    const [result] = await db.query("DELETE FROM vacinas WHERE id = ?", [id]);
    if (result.affectedRows === 0) throw new Error("Vacina não encontrada");
    return { mensagem: "Vacina deletada com sucesso" };
  }
}
>>>>>>> 050b0febff384f13c3179dc979ba29845ab78417
