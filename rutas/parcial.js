const express = require('express');
const router = express.Router();
let datos = require('./datos.json');

//Punto 2
router.post('/calculadora/sumaEnIntervalo', async (req, res) => {

    let numA = req.body.numeroA;
    let numB = req.body.numeroB;

    let suma = 0;
    // for (let i = numA; i <= numB; i++) {
    //     suma = suma + i;
    // }

    if (numB > numA) {
        let i = numA;
        while (i <= numB) {
            suma = suma + i;
            i++;
        }

    }

    if (numA > numB) {
        let i = numB;
        while (i <= numA) {
            suma = suma + i;
            i++;
        }

    }

    if (numA === numB) {
        suma = numA * 2;
    }

    res.json({
        suma: suma
    });
});

//Punto 3
router.post('/datos/limpiarCartera', async (req, res) => {

    for (let i = 0; i < datos.length; i++) {
        datos[i].carteraPendiente += 3;
    }

    res.json({
        status: 'ok',
        datosNuevos: datos
    });
});

//Punto 4
router.post('/info/agregarCliente', async (req, res) => {

    datos.push(req.body.nuevoCliente);

    res.json({
        status: "ok",
        nuevosDatos: datos
    })

});

//Punto 5
router.get('/info/obtenerDatosMejorCliente', async (req, res) => {
    let clienteTarget = datos[0];

    for (let i = 1; i < datos.length; i++) {
        if (datos[i].productosComprados > clienteTarget.productosComprados) {
            clienteTarget = datos[i];
        }
    }

    res.json({
        mejorCliente: {
            "nombre": clienteTarget.nombre,
            "email": clienteTarget.email
        }
    });
});

//Punto 6
router.post('/manejo/dataCentral', async (req, res) => {

    let cadenaTarget = "";
    let cadenaOriginal = req.body.cadena;
    let tamañoCadenaOriginal = cadenaOriginal.length;

    if (cadenaOriginal.length % 2 === 0) {
        cadenaTarget += cadenaOriginal[tamañoCadenaOriginal / 2 - 1];
        cadenaTarget += cadenaOriginal[tamañoCadenaOriginal / 2];
    }
    else {
        cadenaTarget += cadenaOriginal[Math.floor(tamañoCadenaOriginal / 2)];
    }


    res.json({
        cadenaTarget: cadenaTarget
    })

});

module.exports = router;