// controllers/ClinicaController.js
import Clinica from '../Models/Clinica.js';

export default class ClinicaController {
  list = async (req, res) => {
    try {
      const clinicas = await Clinica.list();
      res.status(200).json(clinicas);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao buscar clínicas." });
    }
  };

  create = async (req, res) => {
    const { nome, endereco, telefone, responsavel } = req.body;
    if (!nome || !endereco) {
      return res.status(400).json({ erro: "Nome e endereço são obrigatórios." });
    }
    try {
      const novaClinica = new Clinica(nome, endereco, telefone, responsavel);
      const clinicaCriada = await Clinica.create(novaClinica);
      res.status(201).json(clinicaCriada);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao cadastrar clínica." });
    }
  };

  update = async (req, res) => {
    const { id } = req.params;
    const { nome, endereco, telefone, responsavel } = req.body;
    try {
      const resultado = await Clinica.update(id, { nome, endereco, telefone, responsavel });
      res.status(200).json(resultado);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao atualizar clínica." });
    }
  };

  delete = async (req, res) => {
    const { id } = req.params;
    try {
      const resultado = await Clinica.delete(id);
      res.status(200).json(resultado);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao excluir clínica." });
    }
  };
}
