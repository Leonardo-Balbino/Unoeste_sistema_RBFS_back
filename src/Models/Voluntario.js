// models/Voluntario.js
import VoluntarioDAO from '../DAO/VoluntarioDAO.js';

export default class Voluntario {
  #nome;
  #contato;
  #habilidades;
  #disponibilidade;

  constructor(nome, contato, habilidades, disponibilidade) {
    this.#nome = nome;
    this.#contato = contato;
    this.#habilidades = habilidades;
    this.#disponibilidade = disponibilidade;
  }

  get nome() { return this.#nome; }
  get contato() { return this.#contato; }
  get habilidades() { return this.#habilidades; }
  get disponibilidade() { return this.#disponibilidade; }

  toInsertObject() {
    return {
      nome: this.#nome,
      contato: this.#contato,
      habilidades: this.#habilidades,
      disponibilidade: this.#disponibilidade,
    };
  }

  static async list() {
    const dao = new VoluntarioDAO();
    return await dao.list();
  }

  static async create(novoVoluntario) {
    const dao = new VoluntarioDAO();
    return await dao.create(novoVoluntario.toInsertObject());
  }

  static async update(id, dados) {
    const dao = new VoluntarioDAO();
    return await dao.update(id, dados);
  }

  static async delete(id) {
    const dao = new VoluntarioDAO();
    return await dao.delete(id);
  }
}
