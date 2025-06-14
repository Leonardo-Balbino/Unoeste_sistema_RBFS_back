<<<<<<< HEAD
// DAO/AdocaoDAO.js
import db from '../Database/connection.js';

export default class AdocaoDAO {
  constructor() {
    this.createTable();
  }

  async createTable() {
    try {
      await db.query(`
        CREATE TABLE IF NOT EXISTS adocoes (
          id INT AUTO_INCREMENT PRIMARY KEY,
          animal_id INT NOT NULL,
          adotante_id INT NOT NULL,
          data_adocao DATETIME DEFAULT CURRENT_TIMESTAMP,
          UNIQUE KEY unique_animal (animal_id),
          FOREIGN KEY (animal_id) REFERENCES animais(id) ON DELETE CASCADE,
          FOREIGN KEY (adotante_id) REFERENCES adotantes(id) ON DELETE CASCADE
        )
      `);
      console.log("Tabela 'adocoes' verificada/criada com sucesso.");
    } catch (error) {
      console.error("Erro ao criar tabela 'adocoes':", error.message);
    }
  }

  async create({ animal_id, adotante_id }) {
    const [result] = await db.query(
      "INSERT INTO adocoes (animal_id, adotante_id) VALUES (?, ?)",
      [animal_id, adotante_id]
    );
    return { id: result.insertId, animal_id, adotante_id };
  }

  async list() {
    const [rows] = await db.query("SELECT * FROM adocoes");
    return rows;
  }

  async delete(id) {
    const [result] = await db.query("DELETE FROM adocoes WHERE id = ?", [id]);
    if (result.affectedRows === 0) throw new Error("Adoção não encontrada");
    return { mensagem: "Registro de adoção excluído com sucesso" };
  }
}
=======
// DAO/AdocaoDAO.js
import db from '../Database/connection.js';

export default class AdocaoDAO {
  constructor() {
    this.createTable();
  }

  async createTable() {
    try {
      await db.execute(`
        CREATE TABLE IF NOT EXISTS adocoes (
          id INT AUTO_INCREMENT PRIMARY KEY,
          animal_id INT NOT NULL,
          adotante_id INT NOT NULL,
          data_adocao DATETIME DEFAULT CURRENT_TIMESTAMP,
          UNIQUE KEY unique_animal (animal_id),
          FOREIGN KEY (animal_id) REFERENCES animais(id) ON DELETE CASCADE,
          FOREIGN KEY (adotante_id) REFERENCES adotantes(id) ON DELETE CASCADE
        )
      `);
      console.log("Tabela 'adocoes' verificada/criada com sucesso.");
    } catch (error) {
      console.error("Erro ao criar tabela 'adocoes':", error.message);
    }
  }

  async create({ animal_id, adotante_id }) {
    const [result] = await db.query(
      "INSERT INTO adocoes (animal_id, adotante_id) VALUES (?, ?)",
      [animal_id, adotante_id]
    );
    return { id: result.insertId, animal_id, adotante_id };
  }

  async list() {
    const [rows] = await db.query("SELECT * FROM adocoes");
    return rows;
  }

  async delete(id) {
    const [result] = await db.query("DELETE FROM adocoes WHERE id = ?", [id]);
    if (result.affectedRows === 0) throw new Error("Adoção não encontrada");
    return { mensagem: "Registro de adoção excluído com sucesso" };
  }
}
>>>>>>> 050b0febff384f13c3179dc979ba29845ab78417
