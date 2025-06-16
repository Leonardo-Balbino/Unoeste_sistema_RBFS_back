import SaudeAnimalDAO from '../DAO/SaudeAnimalDAO.js';

export default class SaudeAnimal {
  #animal_id;
  #condicoes;
  #observacoes;

  constructor(animal_id, condicoes, observacoes = "") {
    this.#animal_id = animal_id;
    this.#condicoes = condicoes;
    this.#observacoes = observacoes;
  }

  get animal_id() { return this.#animal_id; }
  get condicoes() { return this.#condicoes; }
  get observacoes() { return this.#observacoes; }

  toInsertObject() {
    return {
      animal_id: this.#animal_id,
      condicoes: this.#condicoes,
      observacoes: this.#observacoes,
    };
  }

  static async list() {
    const dao = new SaudeAnimalDAO();
    return await dao.list();
  }

  static async create(novoRelatorio) {
    const dao = new SaudeAnimalDAO();
    return await dao.create(novoRelatorio.toInsertObject());
  }

  static async update(id, dados) {
    const dao = new SaudeAnimalDAO();
    return await dao.update(id, dados);
  }

  static async delete(id) {
    const dao = new SaudeAnimalDAO();
    return await dao.delete(id);
  }
}