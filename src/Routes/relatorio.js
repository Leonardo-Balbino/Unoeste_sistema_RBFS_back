const express = require('express');
const router = express.Router();
const Animal = require('../models/Animal'); // Altere o caminho se necessário

// GET /relatorio-animais
router.get('/', async (req, res) => {
  try {
    const { especie, sexo, status } = req.query;

    const filtros = {};
    if (especie) filtros.especie = especie;
    if (sexo) filtros.sexo = sexo;
    if (status) filtros.status = status;

    const animais = await Animal.find(filtros).sort({ dataEntrada: -1 });

    res.json(animais);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensagem: 'Erro ao gerar relatório' });
  }
});

module.exports = router;
