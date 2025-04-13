// controllers/AdocaoController.js
import Adocao from '../Models/Adocao.js';
import Animal from '../Models/Animal.js';

export default class AdocaoController {
  // Método para realizar a adoção de um animal
  adotar = async (req, res) => {
    const { animal_id, adotante_id } = req.body;

    if (!animal_id || !adotante_id) {
      return res.status(400).json({
        status: false,
        mensagem: "Os campos animal_id e adotante_id são obrigatórios."
      });
    }

    try {
      // Verifica se o animal já está adotado
      const animal = await Animal.buscarPorId(animal_id); // <-- Adicione este método no Model Animal
      if (animal.status === "adotado") {
        return res.status(400).json({
          status: false,
          mensagem: "Este animal já foi adotado."
        });
      }

      // Cria a adoção e atualiza o status do animal
      const adocaoCriada = await Adocao.create(new Adocao(animal_id, adotante_id));
      await Animal.update(animal_id, { status: "adotado" });

      return res.status(200).json({
        status: true,
        mensagem: "Animal adotado com sucesso.",
        adocao: adocaoCriada
      });
    } catch (error) {
      console.error("Erro ao realizar adoção:", error);
      let mensagemErro = "Erro interno ao realizar adoção.";

      // Trata o erro de duplicidade explicitamente
      if (error.code === "ER_DUP_ENTRY") {
        mensagemErro = "Este animal já foi adotado por outro usuário.";
      }

      return res.status(500).json({
        status: false,
        mensagem: mensagemErro
      });
    }
  };

  // Método para listar as adoções
  list = async (req, res) => {
    try {
      const adocoes = await Adocao.list();
      res.status(200).json(adocoes);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao buscar adoções." });
    }
  };
}
