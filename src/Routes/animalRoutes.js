// routes/animalRoutes.js
import { Router } from 'express';
import AnimalController from '../Controller/AnimalController.js';

const animalRoutes = Router();
const animalController = new AnimalController();

animalRoutes.get('/', (req, res) => animalController.list(req, res));
animalRoutes.post('/', (req, res) => animalController.create(req, res));
animalRoutes.patch('/:id', (req, res) => animalController.update(req, res));
animalRoutes.delete('/:id', (req, res) => animalController.delete(req, res));

export default animalRoutes;
