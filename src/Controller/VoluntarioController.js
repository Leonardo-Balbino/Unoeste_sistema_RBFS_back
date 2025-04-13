// controllers/VoluntarioController.js
import Voluntario from '../Models/Voluntario.js';

export default class VoluntarioController {
  list = async (req, res) => {
    try {
      const voluntarios = await Voluntario.list();
      res.status(200).json(voluntarios);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao buscar voluntários." });
    }
  };

  create = async (req, res) => {
    const { nome, contato, habilidades, disponibilidade } = req.body;
    if (!nome || !contato || !habilidades || !disponibilidade) {
      return res.status(400).json({ erro: "Todos os campos são obrigatórios." });
    }
    try {
      const novoVoluntario = new Voluntario(nome, contato, habilidades, disponibilidade);
      const voluntarioCriado = await Voluntario.create(novoVoluntario);
      res.status(201).json(voluntarioCriado);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao cadastrar voluntário." });
    }
  };

  update = async (req, res) => {
    const { id } = req.params;
    const { nome, contato, habilidades, disponibilidade } = req.body;
    try {
      const resultado = await Voluntario.update(id, { nome, contato, habilidades, disponibilidade });
      res.status(200).json(resultado);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao atualizar voluntário." });
    }
  };

  delete = async (req, res) => {
    const { id } = req.params;
    try {
      const resultado = await Voluntario.delete(id);
      res.status(200).json(resultado);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao excluir voluntário." });
    }
  };
}
