import Express from "express"
import {getDB} from "../../db/db.js"
import {ObjectId} from "mongodb";
import { obtenerTodasLasVentas, guardarVenta, editarVenta, borrarVenta } from "../../controllers/Ventas/controller.js";

const rutasVentas = Express.Router();

const genericCallback = (res) => (err,result) => {
    if (err) {
        res.status(500).send(err)
    }
    else{
        res.status(200).json(result);
    }
}

// Obtiene todas las ventas
rutasVentas.route("/Ventas").get((req,res) => {
    obtenerTodasLasVentas(genericCallback(res));
});





// Envia una venta a la base de datos
rutasVentas.route("/Ventas/Newventa").post((req,res) => {
    guardarVenta(req.body,genericCallback(res))
});

// Edita una venta 
rutasVentas.route("/Ventas/Updateventa").patch((req,res) => {
    editarVenta(req.body,genericCallback(res))
});

//Borra una venta
rutasVentas.route("/Ventas/Deleteventa").delete((req,res) => {
    borrarVenta(req.body,genericCallback(res))
});

export default rutasVentas;