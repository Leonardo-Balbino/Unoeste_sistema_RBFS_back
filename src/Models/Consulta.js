import ConsultaDAO from '../DAO/ConsultaDAO.js';

export default class Consulta {
  #data;
  #hora;
  #animal_id;
  #clinica_id;
  #descricao;

  constructor(data, hora, animal_id, clinica_id, descricao = '') {
    this.#data = data;
    this.#hora = hora;
    this.#animal_id = animal_id;
    this.#clinica_id = clinica_id;
    this.#descricao = descricao;
  }

  get data() { return this.#data; }
  get hora() { return this.#hora; }
  get animal_id() { return this.#animal_id; }
  get clinica_id() { return this.#clinica_id; }
  get descricao() { return this.#descricao; }

  toInsertObject() {
    return {
      data: this.#data,
      hora: this.#hora,
      animal_id: this.#animal_id,
      clinica_id: this.#clinica_id,
      descricao: this.#descricao,
    };
  }

  static async list() {
    const dao = new ConsultaDAO();
    return await dao.list();
  }

  static async create(novaConsulta) {
    const dao = new ConsultaDAO();
    return await dao.create(novaConsulta.toInsertObject());
  }

  static async update(id, dados) {
    const dao = new ConsultaDAO();
    return await dao.update(id, dados);
  }

  static async delete(id) {
    const dao = new ConsultaDAO();
    return await dao.delete(id);
  }
}