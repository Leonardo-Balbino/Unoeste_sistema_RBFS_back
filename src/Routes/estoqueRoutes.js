import { Router } from 'express';
import EstoqueController from '../Controller/EstoqueController.js';

const estoqueRoutes = Router();
const estoqueController = new EstoqueController();

estoqueRoutes.get('/', (req, res) => estoqueController.listarEstoque(req, res));
estoqueRoutes.post('/entrada', (req, res) => estoqueController.registrarEntrada(req, res));
estoqueRoutes.post('/saida', (req, res) => estoqueController.registrarSaida(req, res));
estoqueRoutes.get('/grupo/:grupo', (req, res) => estoqueController.consultarPorGrupo(req, res));
estoqueRoutes.get('/validade/:validade', (req, res) => estoqueController.consultarPorValidade(req, res));
estoqueRoutes.get('/alertas', (req, res) => estoqueController.alertarProximosDaValidade(req, res));

export default estoqueRoutes;