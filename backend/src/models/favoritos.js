const mongoose = require('mongoose');

const favoritosSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // referência ao usuário
    required: true
  },
  lugar: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Place', // referência ao local favoritado
    required: true
  },
  data_favoritado: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Favoritos', favoritosSchema, 'favoritos');
