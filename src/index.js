// src/index.js
import { Router } from 'express';
import clinicaRoutes from './Routes/clinicaRoutes.js';
import mantimentoRoutes from './Routes/mantimentoRoutes.js';
import vacinaRoutes from './Routes/vacinaRoutes.js';
import voluntarioRoutes from './Routes/voluntarioRoutes.js';
import loginRoutes from './Routes/loginRoutes.js';
import animalRoutes from './Routes/animalRoutes.js';
import adotanteRoutes from './Routes/adotanteRoutes.js';
import authMiddleware from './Middlewares/authMiddleware.js';
import adocaoRoutes from './Routes/adocaoRoutes.js';

const router = Router();

// Rotas públicas
router.use('/auth', loginRoutes);

// Rotas protegidas (exige token)
router.use('/clinicas', authMiddleware, clinicaRoutes);
router.use('/mantimentos', authMiddleware, mantimentoRoutes);
router.use('/vacinas', authMiddleware, vacinaRoutes);
router.use('/voluntarios', authMiddleware, voluntarioRoutes);
router.use('/animais', authMiddleware, animalRoutes);
router.use('/adotantes', authMiddleware, adotanteRoutes);
router.use('/adocoes', authMiddleware, adocaoRoutes);

export default router;
