// models/Adotante.js
import AdotanteDAO from '../DAO/AdotanteDAO.js';

export default class Adotante {
  #nome;
  #email;
  #telefone;
  #endereco;
  #documento;

  constructor(nome, email, telefone, endereco, documento) {
    this.#nome = nome;
    this.#email = email;
    this.#telefone = telefone;
    this.#endereco = endereco;
    this.#documento = documento;
  }

  get nome() { return this.#nome; }
  get email() { return this.#email; }
  get telefone() { return this.#telefone; }
  get endereco() { return this.#endereco; }
  get documento() { return this.#documento; }

  toInsertObject() {
    return {
      nome: this.#nome,
      email: this.#email,
      telefone: this.#telefone,
      endereco: this.#endereco,
      documento: this.#documento,
    };
  }

  static async list() {
    const dao = new AdotanteDAO();
    return await dao.list();
  }

  static async create(novoAdotante) {
    const dao = new AdotanteDAO();
    return await dao.create(novoAdotante.toInsertObject());
  }

  static async update(id, dados) {
    const dao = new AdotanteDAO();
    return await dao.update(id, dados);
  }

  static async delete(id) {
    const dao = new AdotanteDAO();
    return await dao.delete(id);
  }
}
