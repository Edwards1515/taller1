const mongoose = require('mongoose');
const { Schema } = mongoose;

const Promos = new Schema();

Promos.add({
    nombre: {type: String, required:true},
    descripcion: {type: String, required:true},
    premium: {type: Boolean, required: true},
    fechaIni: {type: Date, required: true},
    fechaFin: {type: Date, required: true},
    idRestaurante: {type: String, required:true},
    activo: {type: Boolean, required: true}
});

module.exports = mongoose.model('Promos', Promos);