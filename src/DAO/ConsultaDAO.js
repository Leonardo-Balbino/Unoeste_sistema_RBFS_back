<<<<<<< HEAD
import db from '../Database/connection.js';

export default class ConsultaDAO {
  constructor() {
    this.createTable();
  }

  async createTable() {
    try {
      await db.query(`
        CREATE TABLE IF NOT EXISTS consultas (
          id INT AUTO_INCREMENT PRIMARY KEY,
          data DATE NOT NULL,
          hora TIME NOT NULL,
          animal_id INT NOT NULL,
          clinica_id INT NOT NULL,
          descricao TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (animal_id) REFERENCES animais(id) ON DELETE CASCADE,
          FOREIGN KEY (clinica_id) REFERENCES Clinicas(id) ON DELETE CASCADE
        )
      `);
      console.log("Tabela 'consultas' verificada/criada com sucesso.");
    } catch (error) {
      console.error("Erro ao criar tabela 'consultas':", error.message);
    }
  }

  async list() {
    const [rows] = await db.query("SELECT * FROM consultas");
    return rows;
  }

  async create({ data, hora, animal_id, clinica_id, descricao }) {
    const [result] = await db.query(
      "INSERT INTO consultas (data, hora, animal_id, clinica_id, descricao) VALUES (?, ?, ?, ?, ?)",
      [data, hora, animal_id, clinica_id, descricao]
    );
    return { id: result.insertId, data, hora, animal_id, clinica_id, descricao };
  }

  async update(id, { data, hora, animal_id, clinica_id, descricao }) {
    const [result] = await db.query(
      "UPDATE consultas SET data = ?, hora = ?, animal_id = ?, clinica_id = ?, descricao = ? WHERE id = ?",
      [data, hora, animal_id, clinica_id, descricao, id]
    );
    if (result.affectedRows === 0) throw new Error("Consulta não encontrada");
    return { mensagem: "Consulta atualizada com sucesso" };
  }

  async delete(id) {
    const [result] = await db.query("DELETE FROM consultas WHERE id = ?", [id]);
    if (result.affectedRows === 0) throw new Error("Consulta não encontrada");
    return { mensagem: "Consulta excluída com sucesso" };
  }
=======
import db from '../Database/connection.js';

export default class ConsultaDAO {
  constructor() {
    this.createTable();
  }

  async createTable() {
    try {
      await db.execute(`
        CREATE TABLE IF NOT EXISTS consultas (
          id INT AUTO_INCREMENT PRIMARY KEY,
          data DATE NOT NULL,
          hora TIME NOT NULL,
          animal_id INT NOT NULL,
          clinica_id INT NOT NULL,
          descricao TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (animal_id) REFERENCES animais(id) ON DELETE CASCADE,
          FOREIGN KEY (clinica_id) REFERENCES Clinicas(id) ON DELETE CASCADE
        )
      `);
      console.log("Tabela 'consultas' verificada/criada com sucesso.");
    } catch (error) {
      console.error("Erro ao criar tabela 'consultas':", error.message);
    }
  }

  async list() {
    const [rows] = await db.query("SELECT * FROM consultas");
    return rows;
  }

  async create({ data, hora, animal_id, clinica_id, descricao }) {
    const [result] = await db.query(
      "INSERT INTO consultas (data, hora, animal_id, clinica_id, descricao) VALUES (?, ?, ?, ?, ?)",
      [data, hora, animal_id, clinica_id, descricao]
    );
    return { id: result.insertId, data, hora, animal_id, clinica_id, descricao };
  }

  async update(id, { data, hora, animal_id, clinica_id, descricao }) {
    const [result] = await db.query(
      "UPDATE consultas SET data = ?, hora = ?, animal_id = ?, clinica_id = ?, descricao = ? WHERE id = ?",
      [data, hora, animal_id, clinica_id, descricao, id]
    );
    if (result.affectedRows === 0) throw new Error("Consulta não encontrada");
    return { mensagem: "Consulta atualizada com sucesso" };
  }

  async delete(id) {
    const [result] = await db.query("DELETE FROM consultas WHERE id = ?", [id]);
    if (result.affectedRows === 0) throw new Error("Consulta não encontrada");
    return { mensagem: "Consulta excluída com sucesso" };
  }
>>>>>>> 050b0febff384f13c3179dc979ba29845ab78417
}