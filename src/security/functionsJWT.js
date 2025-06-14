// src/security/functionsJWT.js
import jwt from 'jsonwebtoken';
import 'dotenv/config';

/**
 * Verifica e decodifica um token JWT.
 * @param {string} token - O token JWT a ser verificado.
 * @returns {object} - O payload decodificado se o token for válido.
 * @throws {Error} - Se o token for inválido ou expirado.
 */
export function VerifyToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error("Token inválido ou expirado.");
  }
}
