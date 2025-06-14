// routes/loginRoutes.js
import { Router } from 'express';
import LoginControl from '../Controller/loginControl.js';

const loginRoutes = Router();
const loginControlInstance = new LoginControl();

loginRoutes.post('/login', (req, res) => loginControlInstance.login(req, res));
loginRoutes.post('/register', (req, res) => loginControlInstance.register(req, res));

export default loginRoutes;
