var router = require('express').Router();
const Restaurantes = require('../modelos/Restaurantes');
const Promociones = require('../modelos/Promociones');
var sumatoria = 0;


//REQ 1 Obtener todas las promociones vigentes (que no han cumplido su fecha de expiración) PENDIENTE
router.get('/obtener/PromocionesVigentes', async (req, res) => {
    let fechaActual = new Date();
    Promociones.find({fechaExpiracion : {$gt: new Date(fechaActual)}}).sort({fechaExpiracion:1})
        .then((LasPromociones) => {
            sumatoria = null;
            for(i=0; i < LasPromociones.length; i++){
            if(LasPromociones[i].estado === true){
                sumatoria = sumatoria +1;
            }
            }           
           res.json({
                "status": "ok",
                "Registros":sumatoria,
                "nodo":LasPromociones
            });
        })
        .catch((err) => {
            res.json({
                "status": "fail",
                "error": err
            });
        });
});

//REQ 2 Obtener las cinco promociones Premium más recientes LISTO
router.get('/obtener/PromocionesPremium', async (req, res) => {

    Promociones.find({premium:true}).sort({premium:1}).limit(5)
    .then((LasPromociones) => {
        sumatoria = null;
            for(i=0; i < LasPromociones.length; i++){
            if(LasPromociones[i].premium === true){
                sumatoria = sumatoria +1;
            }
            }
       res.json({
            "status": "ok",
            "Registros":sumatoria,
            "nodo":LasPromociones

        });
    })
    .catch((err) => {
        res.json({
            "status": "fail",
            "error": err
        });
    });

});
//REQ 2.1 Obtener las promociones Premium más recientes (cantidad por Url) LISTO
router.get('/obtener/PromocionesPremium/:valor', async (req, res) => {

    let valor = parseInt(req.params.valor);
    Promociones.find({premium:true}).sort({premium:1}).limit(valor)
    .then((LasPromociones) => {
        sumatoria = null;
            for(i=0; i < LasPromociones.length; i++){
            if(LasPromociones[i].premium === true){
                sumatoria = sumatoria + 1;
            }
            }
       res.json({
            "status": "ok",
            "Registros":sumatoria,
            "nodo":LasPromociones

        });
    })
    .catch((err) => {
        res.json({
            "status": "fail",
            "error": err
        });
    });

});

//REQ 3 Obtener las promociones próximas a expirar (usted define el criterio de proximidad) FALTANTE 
router.get('/obtener/PromocionesPoExpirar/:cantidad', async (req, res) => {
    let fechaActual = new Date();
    let cantidad = parseInt(req.params.cantidad); 
    Promociones.find({fechaExpiracion : {$gt: new Date(fechaActual)},estado:true}).sort({fechaExpiracion:1}).limit(cantidad)
        .then((LasPromociones) => {
            sumatoria = null;
            for(i=0; i < LasPromociones.length; i++){
            if(LasPromociones[i].estado === true){
                sumatoria = sumatoria + 1;
            }
            }
           res.json({
                "status": "ok",
                "Registros":sumatoria,
                "nodo":LasPromociones
            });
        })
        .catch((err) => {
            res.json({
                "status": "fail",
                "error": err
            });
        });

});

//REQ 4 Obtener toda la información de una promoción en particular, incluyendo al restaurante LISTO
router.get('/obtener/info/unaPromocionConSuRestaurante/:id', async (req, res) => {
    let idTarget = req.params.id;
    Promociones.findById(idTarget)
        .then((promo) => {
            
            Restaurantes.findById(promo.idRestaurante)
            .then((Restaurant) => {

                let PromocionTarget = promo.toObject();               
            
            res.json({
                "status": "ok",
                Promocion: PromocionTarget,
                Restaurante: Restaurant
                
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

//REQ 5 Obtener todas las promociones de un mismo restaurante LISTO
router.get('/obtener/PromocionesMismoRestaurante/:id', async (req, res) => {
    let idTarget = req.params.id;
    Promociones.find({idRestaurante:idTarget})
        .then((LasPromociones) => {

            Restaurantes.findById(idTarget)
            .then((Restaurant) => {

            sumatoria = null;
            for(i=0; i < LasPromociones.length; i++){
            if(LasPromociones[i].estado === true || LasPromociones[i].estado === false) {
                sumatoria = sumatoria + 1;
            }
            }
            res.json({
                "status": "ok",
                "Canridad de Promociones":sumatoria,
                "Nodo": LasPromociones,
                "Restaurante":Restaurant
   
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

//REQ 6 Crear un nuevo restaurante de pautas LISTO
router.post('/crear/nuevoRestaurante', async (req, res) => {
    let miNuevoRestaurante = new Restaurantes({
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

//REQ 7 Crear una nueva promoción y vincularla con uno de los restaurantes existentes LISTO
router.post('/crearPromocion', async (req, res) => {
    let miNuevoPromocion = new Promociones({
        titulo: req.body.titulo,
        contenido: req.body.contenido,
        premium: req.body.premium,
        estado: req.body.estado,
        fechaInicial: req.body.fechaInicial,
        fechaExpiracion: req.body.fechaExpiracion,
        idRestaurante: req.body.idRestaurante
    });

    miNuevoPromocion.save()
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

//REQ 8 Actualizar un solo campo a la vez de restaurantes LISTO
router.put('/actualizar/DatoDeUnRestaurante/:id', async (req, res) => {

    Restaurantes.findByIdAndUpdate(req.params.id,
        req.body.queryUpdate)
        .then(() => {
            res.json({
                "status": "ok",

        });
        })
        .catch((err) => {
            res.json({
                "status": "fail",
                "error": err
            });
        });


});

//REQ 8 Actualizar un solo campo a la vez de promociones LISTO
router.put('/actualizar/unDatoDePromo/:id', async (req, res) => {

    Promociones.findByIdAndUpdate(req.params.id,
        req.body.queryUpdate)
        .then(() => {
            res.json({
                "status": "ok",

        });
        })
        .catch((err) => {
            res.json({
                "status": "fail",
                "error": err
            });
        });


});

//Desactivar (o eliminar) una restaurante existente
router.put('/desactivar/restaurante/:id', async (req, res) => {
    let idTarget = req.params.id;
    Restaurantes.findByIdAndUpdate(idTarget,{ estado : false })
        .then(() => {
            res.json({
                "status": "ok",

        });
        })
        .catch((err) => {
            res.json({
                "status": "fail",
                "error": err
            });
        });


});

//Desactivar (o eliminar) una promoción existente
router.put('/desactivar/promocion/:id', async (req, res) => {
    Promociones.findByIdAndUpdate(idTarget,{ estado : false })
        .then(() => {
            res.json({
                "status": "ok",

        });
        })
        .catch((err) => {
            res.json({
                "status": "fail",
                "error": err
            });
        });
});



//Obtener todos los restaurantes
router.get('/obtenerTodosLosRestaurantes', async (req, res) => {

    Restaurantes.find()
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
//Obtener Restaurante po ID
router.get('/obtenerRestaurantesPorId/:id', async (req, res) => {

    let idTarget = req.params.id;

    Restaurantes.findById(idTarget)
        .then((elRestaurante) => {

                    res.json({
                        "status": "ok",
                        "curso": elRestaurante
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