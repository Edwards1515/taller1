const mongoose = require('mongoose');
const { Schema } = mongoose;

const Promociones = new Schema();

Promociones.add({
    titulo: {type: String, required:true},
    contenido: {type: String, required: true},
    premium: {type: Boolean, required: true},
    estado: {type: Boolean, required: true},
    fechaInicial: {type: Date, required: true},
    fechaExpiracion: {type: Date, required: true},
    idRestaurante: {type: String, required: true}
});

module.exports = mongoose.model('Promociones', Promociones);