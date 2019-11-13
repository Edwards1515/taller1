const mongoose = require('mongoose');
const { Schema } = mongoose;

const cliente = new Schema();

cliente.add({
    nombre: { type: String, required: true },
    propiedades: { type: Object, required: false },
    listaDeCompras: {type: Array, required: true}
});

module.exports = mongoose.model('cliente', cliente);