// models/login.js
import LoginDAO from '../DAO/loginDao.js';

export default class Login {
  // atributos privados
  #username;
  #email;
  #password;
  #role;

  constructor(username, email, password, role = 'user') {
    this.#username = username;
    this.#email = email;
    this.#password = password;
    this.#role = role;
  }

  get username() {
    return this.#username;
  }

  get email() {
    return this.#email;
  }

  get password() {
    return this.#password;
  }

  get role() {
    return this.#role;
  }

  /**
   * Em vez de usar toJSON (que pode omitir a senha em alguns contextos),
   * crie um método específico para inserção que garanta que a senha seja passada.
   */
  toInsertObject() {
    return {
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.role
    };
  }

  /**
   * Cria um novo usuário através do DAO.
   * @param {Login} novoUser - instância de Login.
   * @returns {Promise<object>}
   */
  static async create(novoUser) {
    const loginDAO = new LoginDAO();
    // Use o método que retorna os dados completos, inclusive a senha.
    return await loginDAO.createUser(novoUser.toInsertObject());
  }

  /**
   * Realiza o login através do DAO.
   * @param {string} username 
   * @param {string} password 
   * @returns {Promise<object|null>}
   */
  static async login(username, password) {
    const loginDAO = new LoginDAO();
    return await loginDAO.login(username, password);
  }
}
