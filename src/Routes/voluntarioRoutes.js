// routes/voluntarioRoutes.js
import { Router } from 'express';
import VoluntarioController from '../Controller/VoluntarioController.js';

const voluntarioRoutes = Router();
const voluntario = new VoluntarioController();

voluntarioRoutes.get('/', (req, res) => voluntario.list(req, res));
voluntarioRoutes.post('/', (req, res) => voluntario.create(req, res));
voluntarioRoutes.patch('/:id', (req, res) => voluntario.update(req, res));
voluntarioRoutes.delete('/:id', (req, res) => voluntario.delete(req, res));

export default voluntarioRoutes;
