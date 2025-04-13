// models/Clinica.js
import ClinicaDAO from '../DAO/ClinicaDAO.js';

export default class Clinica {
  // campos privados
  #nome;
  #endereco;
  #telefone;
  #responsavel;

  constructor(nome, endereco, telefone, responsavel) {
    this.#nome = nome;
    this.#endereco = endereco;
    this.#telefone = telefone;
    this.#responsavel = responsavel;
  }

  get nome() {
    return this.#nome;
  }
  get endereco() {
    return this.#endereco;
  }
  get telefone() {
    return this.#telefone;
  }
  get responsavel() {
    return this.#responsavel;
  }

  toInsertObject() {
    return {
      nome: this.#nome,
      endereco: this.#endereco,
      telefone: this.#telefone,
      responsavel: this.#responsavel,
    };
  }

  static async list() {
    const dao = new ClinicaDAO();
    return await dao.list();
  }

  static async create(novaClinica) {
    const dao = new ClinicaDAO();
    return await dao.create(novaClinica.toInsertObject());
  }

  static async update(id, dados) {
    const dao = new ClinicaDAO();
    return await dao.update(id, dados);
  }

  static async delete(id) {
    const dao = new ClinicaDAO();
    return await dao.delete(id);
  }
}
