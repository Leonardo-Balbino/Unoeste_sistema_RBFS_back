import MantimentoDAO from '../DAO/MantimentoDAO.js';

export default class Estoque {
  static async listarEstoque() {
    const dao = new MantimentoDAO();
    const mantimentos = await dao.list();

    // Agrupar mantimentos por grupo (nome) e validade
    const estoqueAgrupado = mantimentos.reduce((estoque, mantimento) => {
      const grupo = mantimento.nome;
      const validade = mantimento.validade;

      if (!estoque[grupo]) {
        estoque[grupo] = {};
      }

      if (!estoque[grupo][validade]) {
        estoque[grupo][validade] = [];
      }

      estoque[grupo][validade].push(mantimento);

      return estoque;
    }, {});

    return estoqueAgrupado;
  }

  static async registrarEntrada(nome, quantidade, validade, unidade_medida, descricao) {
    const dao = new MantimentoDAO();
  
    // Verificar se o mantimento já existe
    const mantimentos = await dao.list();
    const mantimentoExistente = mantimentos.find(
      (m) => m.nome === nome && m.validade === validade
    );
  
    if (mantimentoExistente) {
      // Atualizar quantidade do mantimento existente
      return await dao.update(mantimentoExistente.id, {
        nome,
        quantidade: mantimentoExistente.quantidade + quantidade,
        validade,
        unidade_medida,
        descricao,
      });
    } else {
      // Criar novo mantimento
      return await dao.create({ nome, quantidade, validade, unidade_medida, descricao });
    }
  }

  static async registrarSaida(nome, quantidade, validade) {
    const dao = new MantimentoDAO();

    // Verificar se o mantimento existe
    const mantimentos = await dao.list();
    const mantimentoExistente = mantimentos.find(
      (m) => m.nome === nome && m.validade === validade
    );

    if (!mantimentoExistente) {
      throw new Error("Mantimento não encontrado.");
    }

    if (mantimentoExistente.quantidade < quantidade) {
      throw new Error("Quantidade insuficiente no estoque.");
    }

    // Atualizar quantidade do mantimento
    return await dao.update(mantimentoExistente.id, {
      nome,
      quantidade: mantimentoExistente.quantidade - quantidade,
      validade,
    });
  }

  static async consultarEstoquePorGrupo(grupo) {
    const dao = new MantimentoDAO();
    const mantimentos = await dao.list();

    // Filtrar mantimentos pelo grupo (nome)
    return mantimentos.filter((m) => m.nome === grupo);
  }

  static async consultarEstoquePorValidade(validade) {
    const dao = new MantimentoDAO();
    const mantimentos = await dao.list();

    // Filtrar mantimentos pela validade
    return mantimentos.filter((m) => m.validade === validade);
  }

  static async alertarProdutosProximosDaValidade(dias = 7) {
    const dao = new MantimentoDAO();
    const mantimentos = await dao.list();

    const hoje = new Date();
    const limite = new Date();
    limite.setDate(hoje.getDate() + dias);

    // Filtrar mantimentos com validade próxima
    return mantimentos.filter((m) => {
      const validade = new Date(m.validade);
      return validade >= hoje && validade <= limite;
    });
  }
}