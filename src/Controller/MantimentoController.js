// controllers/MantimentoController.js
import Mantimento from '../Models/Mantimento.js';

export default class MantimentoController {
  list = async (req, res) => {
    try {
      const mantimentos = await Mantimento.list();
      res.status(200).json(mantimentos);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao buscar mantimentos." });
    }
  };

  create = async (req, res) => {
    const { nome, quantidade, validade } = req.body;
    if (!nome || !quantidade || !validade) {
      return res.status(400).json({ erro: "Todos os campos são obrigatórios." });
    }
    try {
      // Validação de data pode ser feita aqui, se desejar
      const novoMantimento = new Mantimento(nome, quantidade, validade);
      const mantimentoCriado = await Mantimento.create(novoMantimento);
      res.status(201).json(mantimentoCriado);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao cadastrar mantimento." });
    }
  };

  update = async (req, res) => {
    const { id } = req.params;
    const { nome, quantidade, validade, unidade_medida, descricao } = req.body;
    try {
      const resultado = await Mantimento.update(id, { nome, quantidade, validade, unidade_medida, descricao });
      res.status(200).json(resultado);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao atualizar mantimento." });
    }
  };

  delete = async (req, res) => {
    const { id } = req.params;
    try {
      const resultado = await Mantimento.delete(id);
      res.status(200).json(resultado);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao excluir mantimento." });
    }
  };

  registrarMovimentacao = async (req, res) => {
    const { id } = req.params;
    const { tipo, quantidade } = req.body;
  
    if (!['entrada', 'saida'].includes(tipo) || !quantidade) {
      return res.status(400).json({ erro: "Dados inválidos para movimentação." });
    }
  
    try {
      const resultado = await Mantimento.registrarMovimentacao(id, tipo, quantidade);
      res.status(200).json(resultado);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao registrar movimentação." });
    }
  };
  
  listarMovimentacoes = async (req, res) => {
    const { id } = req.params;
    try {
      const movimentacoes = await Mantimento.listarMovimentacoes(id);
      res.status(200).json(movimentacoes);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao listar movimentações." });
    }
  };
}
