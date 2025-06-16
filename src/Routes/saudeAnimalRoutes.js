import { Router } from 'express';
import SaudeAnimalController from '../Controller/SaudeAnimalController.js';

const router = Router();
const controller = new SaudeAnimalController();

router.get('/', (req, res) => controller.list(req, res));
router.post('/', (req, res) => controller.create(req, res));
router.patch('/:id', (req, res) => controller.update(req, res));
router.delete('/:id', (req, res) => controller.delete(req, res));

export default router;