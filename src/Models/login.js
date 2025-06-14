// models/login.js
import LoginDAO from '../DAO/loginDao.js';

export default class Login {
  #username;
  #email;
  #password;
  #role;

  constructor(username, email, password, role = "user") {
    this.#username = username;
    this.#email = email;
    this.#password = password;
    this.#role = role;
  }

  get username() { return this.#username; }
  get email() { return this.#email; }
  get password() { return this.#password; }
  get role() { return this.#role; }

  toInsertObject() {
    return {
      username: this.#username,
      email: this.#email,
      password: this.#password,
      role: this.#role
    };
  }

  static async login(username, password) {
    const dao = new LoginDAO();
    return await dao.login(username, password);
  }

  static async create(novoUser) {
    const dao = new LoginDAO();
    return await dao.createUser(novoUser.toInsertObject());
  }
}
