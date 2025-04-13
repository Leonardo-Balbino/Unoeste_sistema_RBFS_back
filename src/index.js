// src/index.js
import { Router } from 'express';
import clinicaRoutes from './Routes/clinicaRoutes.js';
import mantimentoRoutes from './Routes/mantimentoRoutes.js';
import vacinaRoutes from './Routes/vacinaRoutes.js';
import voluntarioRoutes from './Routes/voluntarioRoutes.js';
import loginRoutes from './Routes/loginRoutes.js'; 

const router = Router();

router.use('/clinicas', clinicaRoutes);
router.use('/mantimentos', mantimentoRoutes);
router.use('/vacinas', vacinaRoutes);
router.use('/voluntarios', voluntarioRoutes);
router.use('/auth', loginRoutes);

export default router;
