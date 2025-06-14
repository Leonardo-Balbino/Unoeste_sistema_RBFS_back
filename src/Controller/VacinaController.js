// controllers/VacinaController.js
import Vacina from '../Models/Vacina.js';

export default class VacinaController {
  list = async (req, res) => {
    try {
      const vacinas = await Vacina.list();
      res.status(200).json(vacinas);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao buscar vacinas." });
    }
  };

  create = async (req, res) => {
    const { nome, tipo, fabricante, lote, dados_fabricacao, validade } = req.body;
    if (!nome || !tipo || !fabricante || !lote || !dados_fabricacao || !validade) {
      return res.status(400).json({ erro: "Todos os campos são obrigatórios." });
    }
    try {
      const novaVacina = new Vacina(nome, tipo, fabricante, lote, dados_fabricacao, validade);
      const vacinaCriada = await Vacina.create(novaVacina);
      res.status(201).json(vacinaCriada);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao cadastrar vacina." });
    }
  };

  update = async (req, res) => {
    const { id } = req.params;
    const { nome, tipo, fabricante, lote, dados_fabricacao, validade } = req.body;
    try {
      const resultado = await Vacina.update(id, { nome, tipo, fabricante, lote, dados_fabricacao, validade });
      res.status(200).json(resultado);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao atualizar vacina." });
    }
  };

  delete = async (req, res) => {
    const { id } = req.params;
    try {
      const resultado = await Vacina.delete(id);
      res.status(200).json(resultado);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao excluir vacina." });
    }
  };
}
