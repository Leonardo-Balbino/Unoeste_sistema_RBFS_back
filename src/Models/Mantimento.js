// models/Mantimento.js
import MantimentoDAO from '../DAO/MantimentoDAO.js';

export default class Mantimento {
  #nome;
  #quantidade;
  #validade;
  // opcionalmente você pode ter outros campos, por exemplo, unidade_medida e descricao para update

  constructor(nome, quantidade, validade) {
    this.#nome = nome;
    this.#quantidade = quantidade;
    this.#validade = validade;
  }

  get nome() {
    return this.#nome;
  }
  get quantidade() {
    return this.#quantidade;
  }
  get validade() {
    return this.#validade;
  }

  toInsertObject() {
    return {
      nome: this.#nome,
      quantidade: this.#quantidade,
      validade: this.#validade,
    };
  }

  static async list() {
    const dao = new MantimentoDAO();
    return await dao.list();
  }

  static async create(novoMantimento) {
    const dao = new MantimentoDAO();
    return await dao.create(novoMantimento.toInsertObject());
  }

  static async update(id, dados) {
    const dao = new MantimentoDAO();
    return await dao.update(id, dados);
  }

  static async delete(id) {
    const dao = new MantimentoDAO();
    return await dao.delete(id);
  }
}
