var router = require('express').Router();

const Promociones = require('../modelos/Promociones');
var sumatoria = 0;

//Numeral 1 Start
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
//Numeral 1 End

module.exports = router;