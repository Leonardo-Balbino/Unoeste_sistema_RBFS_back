const mongoose = require('mongoose');

const DoacaoSchema = new mongoose.Schema({
  nomeDoador: String,
  valor: Number,
  data: Date,
  metodoPagamento: String,
});

module.exports = mongoose.model('Doacao', DoacaoSchema);
