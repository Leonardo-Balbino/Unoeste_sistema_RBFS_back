import Consulta from '../Models/Consulta.js';

export default class ConsultaController {
  list = async (req, res) => {
    try {
      const consultas = await Consulta.list();
      res.status(200).json(consultas);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao buscar consultas." });
    }
  };

  create = async (req, res) => {
    const { data, hora, animal_id, clinica_id, descricao } = req.body;
    if (!data || !hora || !animal_id || !clinica_id) {
      return res.status(400).json({ erro: "Campos obrigatórios não fornecidos." });
    }
    try {
      const novaConsulta = new Consulta(data, hora, animal_id, clinica_id, descricao);
      const consultaCriada = await Consulta.create(novaConsulta);
      res.status(201).json(consultaCriada);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao cadastrar consulta." });
    }
  };

  update = async (req, res) => {
    const { id } = req.params;
    const { data, hora, animal_id, clinica_id, descricao } = req.body;
    try {
      const resultado = await Consulta.update(id, { data, hora, animal_id, clinica_id, descricao });
      res.status(200).json(resultado);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao atualizar consulta." });
    }
  };

  delete = async (req, res) => {
    const { id } = req.params;
    try {
      const resultado = await Consulta.delete(id);
      res.status(200).json(resultado);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao excluir consulta." });
    }
  };
}