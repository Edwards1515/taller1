const express = require('express');
const router = express.Router();
let cliente = require('../../esquemas/clientes');

router.post('/crearClienteDePrueba', async (req, res) => {

    let nuevoCliente = new cliente({
        nombre: "Juan Lizarazo",
        propiedades: {
            correo: "jjlizarazor@correo.com"
        },
        
        listaDeCompras: [
            {
                producto: [
                    {
                        Ukelele: "Soprano"
                    }
                ],
            }
        ]
    });

    nuevoCliente.save()
        .then(() => {
            res.json({
                status: 'ok'
            });
        })
        .catch(err => {
            res.json({
                status: 'fail',
                error: err
            });
        })



});

router.get('/obtenerTodosLosClientes', async (req, res) => {

});


module.exports = router;