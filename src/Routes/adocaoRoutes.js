// routes/adocaoRoutes.js
import { Router } from 'express';
import AdocaoController from '../Controller/AdocaoController.js';

const adocaoRoutes = Router();
const adocaoController = new AdocaoController();


adocaoRoutes.post('/adotar', (req, res) => adocaoController.adotar(req, res));
adocaoRoutes.get('/', (req, res) => adocaoController.list(req, res));

export default adocaoRoutes;
