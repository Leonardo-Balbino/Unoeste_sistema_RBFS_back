<<<<<<< HEAD
import { Router } from 'express';
import ConsultaController from '../Controller/ConsultaController.js';

const consultaRoutes = Router();
const consultaController = new ConsultaController();

consultaRoutes.get('/', (req, res) => consultaController.list(req, res));

consultaRoutes.post('/', (req, res) => consultaController.create(req, res));

consultaRoutes.patch('/:id', (req, res) => consultaController.update(req, res));

consultaRoutes.delete('/:id', (req, res) => consultaController.delete(req, res));

=======
import { Router } from 'express';
import ConsultaController from '../Controller/ConsultaController.js';

const consultaRoutes = Router();
const consultaController = new ConsultaController();

consultaRoutes.get('/', (req, res) => consultaController.list(req, res));
consultaRoutes.post('/', (req, res) => consultaController.create(req, res));
consultaRoutes.patch('/:id', (req, res) => consultaController.update(req, res));
consultaRoutes.delete('/:id', (req, res) => consultaController.delete(req, res));

>>>>>>> 050b0febff384f13c3179dc979ba29845ab78417
export default consultaRoutes;