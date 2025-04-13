// routes/vacinaRoutes.js
import { Router } from 'express';
import VacinaController from '../Controller/VacinaController.js';

const vacinaRoutes = Router();
const vacina = new VacinaController();

vacinaRoutes.get('/', (req, res) => vacina.list(req, res));
vacinaRoutes.post('/', (req, res) => vacina.create(req, res));
vacinaRoutes.patch('/:id', (req, res) => vacina.update(req, res));
vacinaRoutes.delete('/:id', (req, res) => vacina.delete(req, res));

export default vacinaRoutes;
