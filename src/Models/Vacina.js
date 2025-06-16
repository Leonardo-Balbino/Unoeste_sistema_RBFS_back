// models/Vacina.js
import VacinaDAO from '../DAO/VacinaDAO.js';


export default class Vacina {
  #animal_id;
  #nome;
  #tipo;
  #fabricante;
  #lote;
  #dados_fabricacao;
  #validade;

  constructor(animal_id, nome, tipo, fabricante, lote, dados_fabricacao, validade) {
    this.#animal_id = animal_id;
    this.#nome = nome;
    this.#tipo = tipo;
    this.#fabricante = fabricante;
    this.#lote = lote;
    this.#dados_fabricacao = dados_fabricacao;
    this.#validade = validade;
  }

  toInsertObject() {
    return {
      animal_id: this.#animal_id,
      nome: this.#nome,
      tipo: this.#tipo,
      fabricante: this.#fabricante,
      lote: this.#lote,
      dados_fabricacao: this.#dados_fabricacao,
      validade: this.#validade,
    };
  }

  static async list() {
    const dao = new VacinaDAO();
    return await dao.list();
  }

  static async create(novaVacina) {
    const dao = new VacinaDAO();
    return await dao.create(novaVacina.toInsertObject());
  }

  static async update(id, dados) {
    const dao = new VacinaDAO();
    return await dao.update(id, dados);
  }

  static async delete(id) {
    const dao = new VacinaDAO();
    return await dao.delete(id);
  }
}
