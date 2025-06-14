import FinanceiroDAO from '../dao/FinanceiroDAO.js';

export default class TransacaoFinanceira {
  #tipo;        // 'doacao' ou 'compra'
  #valor;       // número positivo
  #descricao;   // opcional

  constructor(tipo, valor, descricao = null) {
    this.#tipo = tipo;
    this.#valor = valor;
    this.#descricao = descricao;
  }

  get tipo()       { return this.#tipo; }
  get valor()      { return this.#valor; }
  get descricao()  { return this.#descricao; }

  toInsertObject() {
    return {
      tipo: this.#tipo,
      valor: this.#valor,
      descricao: this.#descricao,
    };
  }

  static async list() {
    const dao = new FinanceiroDAO();
    return dao.list();
  }

  static async create(novaTransacao) {
    const dao = new FinanceiroDAO();
    return dao.create(novaTransacao.toInsertObject());
  }

  static async update(id, dados) {
    const dao = new FinanceiroDAO();
    return dao.update(id, dados);
  }

  static async delete(id) {
    const dao = new FinanceiroDAO();
    return dao.delete(id);
  }

  static async getSaldo() {
    const dao = new FinanceiroDAO();
    return dao.getSaldo();
  }
}
