// models/Animal.js
import AnimalDAO from '../DAO/AnimalDAO.js';

export default class Animal {
  // atributos privados
  #nome;
  #especie;
  #raca;
  #idade;
  #status;
  #descricao;

  constructor(nome, especie, raca, idade, status = "disponível", descricao = "") {
    this.#nome = nome;
    this.#especie = especie;
    this.#raca = raca;
    this.#idade = idade;
    this.#status = status;
    this.#descricao = descricao;
  }

  get nome() { return this.#nome; }
  get especie() { return this.#especie; }
  get raca() { return this.#raca; }
  get idade() { return this.#idade; }
  get status() { return this.#status; }
  get descricao() { return this.#descricao; }

  toInsertObject() {
    return {
      nome: this.#nome,
      especie: this.#especie,
      raca: this.#raca,
      idade: this.#idade,
      status: this.#status,
      descricao: this.#descricao,
    };
  }

  static async list() {
    const dao = new AnimalDAO();
    return await dao.list();
  }

  static async create(novoAnimal) {
    const dao = new AnimalDAO();
    return await dao.create(novoAnimal.toInsertObject());
  }

  static async update(id, novosDados) {
      // Busca o animal existente
      const animalExistente = await Animal.buscarPorId(id);
      
      // Mescla os dados existentes com os novos dados
      const dadosAtualizados = {
          nome: animalExistente.nome,
          especie: animalExistente.especie,
          raca: animalExistente.raca,
          idade: animalExistente.idade,
          status: animalExistente.status,
          descricao: animalExistente.descricao,
          ...novosDados // Sobrescreve com os novos valores
      };

      const dao = new AnimalDAO();
      return await dao.update(id, dadosAtualizados);
  }

  // Adicione este método para buscar o animal por ID
  static async buscarPorId(id) {
      const dao = new AnimalDAO();
      return await dao.buscarPorId(id);
  }

  static async delete(id) {
    const dao = new AnimalDAO();
    return await dao.delete(id);
  }
}
