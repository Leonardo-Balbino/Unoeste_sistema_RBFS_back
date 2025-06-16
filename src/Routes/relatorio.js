
import { Router } from 'express';
import Animal from '../Models/Animal.js'; // Ajuste o caminho se necessário

const relatorioRouter = Router();

// GET /relatorio-animais
relatorioRouter.get('/', async (req, res) => {
  try {
    const { especie, sexo, status } = req.query;

    const filtros = {};
    if (especie) filtros.especie = especie;
    if (sexo) filtros.sexo = sexo;
    if (status) filtros.status = status;

    // Ajuste conforme seu ORM/DAO. Exemplo usando um método estático:
    const animais = await Animal.list(filtros);

    res.json(animais);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensagem: 'Erro ao gerar relatório' });
  }
});

export default relatorioRouter;