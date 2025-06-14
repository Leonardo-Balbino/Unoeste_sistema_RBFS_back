const Doacao = require('../models/doacaoModel');

exports.relatorioPorPeriodo = async (req, res) => {
  try {
    const { inicio, fim } = req.query;

    if (!inicio || !fim) {
      return res.status(400).json({ mensagem: 'Datas "inicio" e "fim" são obrigatórias.' });
    }

    const dataInicio = new Date(inicio);
    const dataFim = new Date(fim);
    dataFim.setHours(23, 59, 59, 999); // incluir o dia todo

    const doacoes = await Doacao.find({
      data: { $gte: dataInicio, $lte: dataFim }
    }).sort({ data: -1 });

    const total = doacoes.reduce((soma, d) => soma + d.valor, 0);

    res.status(200).json({ total, doacoes });

  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao gerar relatório', erro });
  }
};
