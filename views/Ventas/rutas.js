import Express from "express"
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
rutasVentas.route("/Ventas").post((req,res) => {
    guardarVenta(req.body,genericCallback(res))
});

// Edita una venta 
rutasVentas.route("/Ventas/:id").patch((req,res) => {
    editarVenta(req.params.id,req.body,genericCallback(res))
});

//Borra una venta
rutasVentas.route("/Ventas/:id").delete((req,res) => {
    borrarVenta(req.params.id,genericCallback(res))
});

export default rutasVentas;