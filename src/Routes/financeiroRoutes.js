import { Router } from 'express';
import FinanceiroController from '../Controller/FinanceiroController.js';

const financeiroRoutes = Router();
const financeiro = new FinanceiroController();

financeiroRoutes.get('/', (req, res) => financeiro.list(req, res));
financeiroRoutes.get('/saldo', (req, res) => financeiro.getSaldo(req, res));
financeiroRoutes.post('/', (req, res) => financeiro.create(req, res));
financeiroRoutes.patch('/:id', (req, res) => financeiro.update(req, res));
financeiroRoutes.delete('/:id', (req, res) => financeiro.delete(req, res));

export default financeiroRoutes;
