// models/Adocao.js
import AdocaoDAO from '../DAO/AdocaoDAO.js';

export default class Adocao {
  // Não precisamos de atributos privados para uma operação simples, mas vamos manter a ideia.
  #animal_id;
  #adotante_id;

  constructor(animal_id, adotante_id) {
    this.#animal_id = animal_id;
    this.#adotante_id = adotante_id;
  }

  get animal_id() {
    return this.#animal_id;
  }

  get adotante_id() {
    return this.#adotante_id;
  }

  toInsertObject() {
    return {
      animal_id: this.#animal_id,
      adotante_id: this.#adotante_id,
    };
  }

  static async create(novaAdocao) {
    const dao = new AdocaoDAO();
    return await dao.create(novaAdocao.toInsertObject());
  }

  static async list() {
    const dao = new AdocaoDAO();
    return await dao.list();
  }
}
