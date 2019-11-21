var router = require('express').Router();
const Promo = require('../modelos/Promos');
const Restaurante = require('../modelos/Restaurantes');

//Numeral 1 Start

//Numeral 1 End

//Numeral 2 Start VAMOS AQUI
router.get('/obtenerPromosPremiumRecientes', async (req, res) => {

    Promo.find({ premium: true }).sort({ premium: 1 }).limit(5)
        .then(({ lasPromos }) => {
            res.json({
                "status": "ok",
                "Promos": lasPromos
            });
        })
        .catch((err) => {
            res.json({
                "status": "fail",
                "error": err
            });
        });

}); 
//Numeral 2 End

//Numeral 3 Start

//Numeral 3 End

//Numeral 4 Start
router.get('/obtenerPromoMasRestaurante/:id', async (req, res) => {

    let idTarget = req.params.id;

    Promo.findById(idTarget)
        .then((laPromo) => {

            Restaurante.findById(laPromo.idRestaurante)
                .then((elRestaurante) => {


                    let miPromoTarget = laPromo.toObject();
                    miPromoTarget.Restaurante = elRestaurante;

                    res.json({
                        "status": "ok",
                        "Promo": miPromoTarget
                    });
                })
        })
        .catch((err) => {
            res.json({
                "status": "fail",
                "error": err
            });
        });

});
//Numeral 4 End

//Numeral 5 Start
router.get('/obtenerPromosDeRestaurante/:id', async (req, res) => {

    let idTarget = req.params.id;

    Promo.find({ idRestaurante: idTarget })
        .then((elRestaurante) => {

            res.json({
                "status": "ok",
                "Promo": elRestaurante
            });

        })
        .catch((err) => {
            res.json({
                "status": "fail",
                "error": err
            });
        });

});
//Numeral 5 End

//Numeral 6 Start
router.post('/crearRestaurante', async (req, res) => {
    let miNuevoRestaurante = new Restaurante({
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        activo: req.body.activo
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
//Numeral 6 End

//Numeral 7 Start
router.post('/crearPromo', async (req, res) => {
    let miNuevaPromo = new Promo({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        premium: req.body.premium,
        fechaIni: req.body.fechaIni,
        fechaFin: req.body.fechaFin,
        idRestaurante: req.body.idRestaurante,
        activo: req.body.activo
    });

    miNuevaPromo.save()
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
//Numeral 7 End

//Numeral 8 Start
router.put('/actualizarDatoRestaurante/:id', async (req, res) => {

    Restaurante.findByIdAndUpdate(req.params.id,
        req.body.queryUpdate)
        .then(() => {
            res.json({
                "status": "ok"
            });
        })
        .catch((err) => {
            res.json({
                "status": "fail",
                "error": err
            });
        });
});
//Numeral 8 End

//Numeral 9 Start
router.put('/cambiarEstadoPromo/:id', async (req, res) => {

    let idTarget = req.params.id;

    Promo.findByIdAndUpdate(idTarget, { $set: { activo: false } })
        .then(() => {
            res.json({
                "status": "ok"
            });
        })
        .catch((err) => {
            res.json({
                "status": "fail",
                "error": err
            });
        });


});
//Numeral 9 End

module.exports = router;