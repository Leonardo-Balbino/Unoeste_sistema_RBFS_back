// controllers/AnimalController.js
import Animal from '../Models/Animal.js';

export default class AnimalController {
  list = async (req, res) => {
    try {
      const animais = await Animal.list();
      res.status(200).json(animais);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao buscar animais." });
    }
  };

  create = async (req, res) => {
    const { nome, especie, raca, idade, status, descricao } = req.body;
    if (!nome || !especie) {
      return res.status(400).json({ erro: "Nome e espécie são obrigatórios." });
    }
    try {
      const novoAnimal = new Animal(nome, especie, raca, idade, status, descricao);
      const animalCriado = await Animal.create(novoAnimal);
      res.status(201).json(animalCriado);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao cadastrar animal." });
    }
  };

  update = async (req, res) => {
    const { id } = req.params;
    const { nome, especie, raca, idade, status, descricao } = req.body;
    try {
      const resultado = await Animal.update(id, { nome, especie, raca, idade, status, descricao });
      res.status(200).json(resultado);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao atualizar animal." });
    }
  };

  delete = async (req, res) => {
    const { id } = req.params;
    try {
      const resultado = await Animal.delete(id);
      res.status(200).json(resultado);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao excluir animal." });
    }
  };
}
