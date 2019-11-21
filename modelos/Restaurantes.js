const mongoose = require('mongoose');
const { Schema } = mongoose;

const Restaurante = new Schema();

Restaurante.add({
    nombre: {type: String, required:true},
    direccion: {type: String, required: true},
    activo: {type: Boolean, required: true}
});

module.exports = mongoose.model('Restaurante', Restaurante);