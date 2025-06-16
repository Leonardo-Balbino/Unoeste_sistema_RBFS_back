import SaudeAnimal from '../Models/SaudeAnimal.js';

export default class SaudeAnimalController {
  list = async (req, res) => {
    try {
      const relatorios = await SaudeAnimal.list();
      res.status(200).json(relatorios);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao buscar relatórios de saúde." });
    }
  };

  create = async (req, res) => {
    const { animal_id, condicoes, observacoes } = req.body;
    if (!animal_id || !condicoes) {
      return res.status(400).json({ erro: "animal_id e condicoes são obrigatórios." });
    }
    try {
      const novo = await SaudeAnimal.create({ animal_id, condicoes, observacoes });
      res.status(201).json(novo);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao cadastrar saúde do animal." });
    }
  };

  update = async (req, res) => {
    const { id } = req.params;
    const { condicoes, observacoes } = req.body;
    try {
      const resultado = await SaudeAnimal.update(id, { condicoes, observacoes });
      res.status(200).json(resultado);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao atualizar relatório de saúde." });
    }
  };

  delete = async (req, res) => {
    const { id } = req.params;
    try {
      const resultado = await SaudeAnimal.delete(id);
      res.status(200).json(resultado);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao excluir relatório de saúde." });
    }
  };
}