// models/Vacina.js
import VacinaDAO from '../DAO/VacinaDAO.js';

export default class Vacina {
  #nome;
  #tipo;
  #fabricante;
  #lote;
  #dados_fabricacao;
  #validade;

  constructor(nome, tipo, fabricante, lote, dados_fabricacao, validade) {
    this.#nome = nome;
    this.#tipo = tipo;
    this.#fabricante = fabricante;
    this.#lote = lote;
    this.#dados_fabricacao = dados_fabricacao;
    this.#validade = validade;
  }

  get nome() { return this.#nome; }
  get tipo() { return this.#tipo; }
  get fabricante() { return this.#fabricante; }
  get lote() { return this.#lote; }
  get dados_fabricacao() { return this.#dados_fabricacao; }
  get validade() { return this.#validade; }

  toInsertObject() {
    return {
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
