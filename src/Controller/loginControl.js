// controllers/loginControl.js
import Login from '../models/login.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export default class LoginControl {
  login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        status: false,
        mensagem: "Usuário e senha são obrigatórios."
      });
    }

    try {
      const user = await Login.login(username, password);
      if (!user) {
        return res.status(401).json({
          status: false,
          mensagem: "Usuário ou senha incorretos."
        });
      }

      // Gera o token JWT com os dados essenciais do usuário
      const token = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return res.status(200).json({
        status: true,
        mensagem: "Login realizado com sucesso.",
        token
      });
    } catch (error) {
      console.error("Erro no login:", error);
      return res.status(500).json({
        status: false,
        mensagem: "Erro interno no servidor."
      });
    }
  };

  register = async (req, res) => {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        status: false,
        mensagem: "Dados obrigatórios não fornecidos: username, email e password."
      });
    }

    try {
      const novoUser = new Login(username, email, password, role);
      const created = await Login.create(novoUser);
      return res.status(201).json({
        status: true,
        mensagem: "Usuário criado com sucesso.",
        usuario: created
      });
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      return res.status(500).json({
        status: false,
        mensagem: "Erro interno ao criar usuário: " + error.message
      });
    }
  };
}
