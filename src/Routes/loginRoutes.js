// // routes/loginRoutes.js
import { Router } from 'express';
import LoginControl from '../Controller/loginControl.js'

const loginRoutes = Router();
const LoginEditControl = new LoginControl();

loginRoutes.post('/login', LoginEditControl.login);
loginRoutes.post('/register', LoginEditControl.register);

export default loginRoutes;