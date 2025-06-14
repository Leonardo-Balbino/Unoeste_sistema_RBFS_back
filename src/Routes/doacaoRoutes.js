const express = require('express');
const router = express.Router();
const DoacaoController = require('../controllers/doacaoController');

router.get('/relatorio', DoacaoController.relatorioPorPeriodo);

module.exports = router;
