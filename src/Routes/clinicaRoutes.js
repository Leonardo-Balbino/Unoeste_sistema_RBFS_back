// routes/clinicaRoutes.js
import { Router } from 'express';
import ClinicaController from '../Controller/ClinicaController.js';

const clinicaRoutes = Router();
const clinica = new ClinicaController();

clinicaRoutes.get('/', (req, res) => clinica.list(req, res));
clinicaRoutes.post('/', (req, res) => clinica.create(req, res));
clinicaRoutes.patch('/:id', (req, res) => clinica.update(req, res));
clinicaRoutes.delete('/:id', (req, res) => clinica.delete(req, res));

export default clinicaRoutes;
