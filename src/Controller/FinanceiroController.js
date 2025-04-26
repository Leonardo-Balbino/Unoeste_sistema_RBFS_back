import TransacaoFinanceira from '../Models/TransacaoFinanceira.js';

export default class FinanceiroController {
  list = async (req, res) => {
    try {
      const transacoes = await TransacaoFinanceira.list();
      res.status(200).json(transacoes);
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: "Erro ao buscar transações." });
    }
  };

  getSaldo = async (req, res) => {
    try {
      const resultado = await TransacaoFinanceira.getSaldo();
      res.status(200).json(resultado);
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: "Erro ao calcular saldo." });
    }
  };

  create = async (req, res) => {
    const { tipo, valor, descricao } = req.body;
    if (!['doacao','compra'].includes(tipo) || !valor) {
      return res.status(400).json({ erro: "Tipo ou valor inválido." });
    }
    try {
      const nova = new TransacaoFinanceira(tipo, valor, descricao);
      const criado = await TransacaoFinanceira.create(nova);
      res.status(201).json(criado);
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: "Erro ao registrar transação." });
    }
  };

  update = async (req, res) => {
    const { id } = req.params;
    const { tipo, valor, descricao } = req.body;
    try {
      const resultado = await TransacaoFinanceira.update(id, { tipo, valor, descricao });
      res.status(200).json(resultado);
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: "Erro ao atualizar transação." });
    }
  };

  delete = async (req, res) => {
    const { id } = req.params;
    try {
      const resultado = await TransacaoFinanceira.delete(id);
      res.status(200).json(resultado);
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: "Erro ao excluir transação." });
    }
  };
}
