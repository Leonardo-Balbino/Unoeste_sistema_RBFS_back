// routes/adotanteRoutes.js
import { Router } from 'express';
import AdotanteController from '../Controller/AdotanteController.js';

const adotanteRoutes = Router();
const adotanteController = new AdotanteController();

adotanteRoutes.get('/', (req, res) => adotanteController.list(req, res));
adotanteRoutes.post('/', (req, res) => adotanteController.create(req, res));
adotanteRoutes.patch('/:id', (req, res) => adotanteController.update(req, res));
adotanteRoutes.delete('/:id', (req, res) => adotanteController.delete(req, res));

export default adotanteRoutes;
