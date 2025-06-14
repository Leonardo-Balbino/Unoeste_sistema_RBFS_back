import { Router } from 'express';
import ConsultaController from '../Controller/ConsultaController.js';

const consultaRoutes = Router();
const consultaController = new ConsultaController();

consultaRoutes.get('/', (req, res) => consultaController.list(req, res));
consultaRoutes.post('/', (req, res) => consultaController.create(req, res));
consultaRoutes.patch('/:id', (req, res) => consultaController.update(req, res));
consultaRoutes.delete('/:id', (req, res) => consultaController.delete(req, res));

export default consultaRoutes;