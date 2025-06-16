// controllers/AdotanteController.js
import Adotante from '../Models/Adotante.js';

export default class AdotanteController {
  list = async (req, res) => {
    try {
      const adotantes = await Adotante.list();
      res.status(200).json(adotantes);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao buscar adotantes." });
    }
  };

  create = async (req, res) => {
    const { nome, email, telefone, endereco, documento } = req.body;
    if (!nome || !email) {
      return res.status(400).json({ erro: "Nome e email são obrigatórios." });
    }
    try {
      const novoAdotante = new Adotante(nome, email, telefone, endereco, documento);
      const adotanteCriado = await Adotante.create(novoAdotante);
      res.status(201).json(adotanteCriado);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        res.status(400).json({ erro: "E-mail já cadastrado." });
      } else {
        res.status(500).json({ erro: "Erro ao cadastrar adotante." });
      }
    }
  };

  update = async (req, res) => {
    const { id } = req.params;
    const { nome, email, telefone, endereco, documento } = req.body;
    try {
      const resultado = await Adotante.update(id, { nome, email, telefone, endereco, documento });
      res.status(200).json(resultado);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao atualizar adotante." });
    }
  };

  delete = async (req, res) => {
    const { id } = req.params;
    try {
      const resultado = await Adotante.delete(id);
      res.status(200).json(resultado);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao excluir adotante." });
    }
  };
}
