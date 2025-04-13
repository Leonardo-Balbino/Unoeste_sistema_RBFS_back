// middlewares/authMiddleware.js
import { VerifyToken } from '../security/functionsJWT.js';

export default function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ status: false, mensagem: "Acesso negado. Token não fornecido." });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = VerifyToken(token);
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(400).json({ status: false, mensagem: "Token inválido." });
  }
}
