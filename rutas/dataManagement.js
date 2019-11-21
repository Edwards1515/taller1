var router = require('express').Router();
const Promo = require('../modelos/Promos');
const Restaurante = require('../modelos/Restaurantes');




//REQ 6 Crear un nuevo restaurante de pautas LISTO
router.post('/crear/nuevoRestaurante', async (req, res) => {
    let miNuevoRestaurante = new Restaurante({
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        estado : req.body.estado
    });

    miNuevoRestaurante.save()
        .then((nodo) => {
            res.json({
                status: "ok",
                nodoCreado: nodo
            });
        })
        .catch((err) => {
            res.json({
                status: "fail",
                error: err
            });
        });
});



//Obtener todos los restaurantes
router.get('/obtenerTodosLosRestaurantes', async (req, res) => {

    Restaurante.find()
        .then((losNodos) => {
            res.json({
                "status": "ok",
                "Restaurantes": losNodos
            });
        })
        .catch((err) => {
            res.json({
                "status": "fail",
                "error": err
            });
        });

});

module.exports = router;