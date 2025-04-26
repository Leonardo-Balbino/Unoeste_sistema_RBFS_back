import Estoque from '../Models/Estoque.js';

export default class EstoqueController {
  listarEstoque = async (req, res) => {
    try {
      const estoque = await Estoque.listarEstoque();
      res.status(200).json(estoque);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao listar estoque." });
    }
  };

  async registrarEntrada(req, res) {
    const { nome, quantidade, validade, unidade_medida, descricao } = req.body;
  
    if (!nome || !quantidade || !validade || !unidade_medida || !descricao) {
      return res.status(400).json({ erro: "Todos os campos são obrigatórios." });
    }
  
    try {
      const resultado = await Estoque.registrarEntrada(nome, quantidade, validade, unidade_medida, descricao);
      res.status(201).json(resultado);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao registrar entrada no estoque." });
    }
  }

  registrarSaida = async (req, res) => {
    const { nome, quantidade, validade } = req.body;

    if (!nome || !quantidade || !validade) {
      return res.status(400).json({ erro: "Todos os campos são obrigatórios." });
    }

    try {
      const resultado = await Estoque.registrarSaida(nome, quantidade, validade);
      res.status(200).json(resultado);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao registrar saída no estoque." });
    }
  };

  consultarPorGrupo = async (req, res) => {
    const { grupo } = req.params;

    try {
      const resultado = await Estoque.consultarEstoquePorGrupo(grupo);
      res.status(200).json(resultado);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao consultar estoque por grupo." });
    }
  };

  consultarPorValidade = async (req, res) => {
    const { validade } = req.params;

    try {
      const resultado = await Estoque.consultarEstoquePorValidade(validade);
      res.status(200).json(resultado);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao consultar estoque por validade." });
    }
  };

  alertarProximosDaValidade = async (req, res) => {
    const { dias } = req.query;

    try {
      const resultado = await Estoque.alertarProdutosProximosDaValidade(dias || 7);
      res.status(200).json(resultado);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao alertar produtos próximos da validade." });
    }
  };
}