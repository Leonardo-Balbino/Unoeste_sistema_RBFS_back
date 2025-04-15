// routes/mantimentoRoutes.js
import { Router } from 'express';
import MantimentoController from '../Controller/MantimentoController.js'

const mantimentoRoutes = Router();
const mantimento = new MantimentoController();

mantimentoRoutes.get('/', (req, res) => mantimento.list(req, res));
mantimentoRoutes.post('/', (req, res) => mantimento.create(req, res));
mantimentoRoutes.patch('/:id', (req, res) => mantimento.update(req, res));
mantimentoRoutes.delete('/:id', (req, res) => mantimento.delete(req, res));
mantimentoRoutes.post('/:id/movimentar', (req, res) => mantimento.registrarMovimentacao(req, res));
mantimentoRoutes.get('/:id/movimentacoes', (req, res) => mantimento.listarMovimentacoes(req, res));


export default mantimentoRoutes;
