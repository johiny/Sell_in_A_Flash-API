import Express from "express"
import {getDB} from "../../db/db.js"
import {ObjectId} from "mongodb";

const rutasVentas = Express.Router();

// Obtiene todas las ventas
rutasVentas.route("/Ventas").get((req,res) => {
    const connection = getDB();
    connection
    .collection("Ventas")
    .find({})
    .toArray((err,result) => {
        if (err){
            res.status(500).send("Error obteniendo las Ventas")
        }
        else{
            res.status(200).json(result);
        }
    })
});


// Envia una venta a la base de datos
rutasVentas.route("/Ventas/Newventa").post((req,res) => {
    const venta = req.body;
    const connection = getDB();
    connection
    .collection("Ventas")
     .insertOne(venta,(err,result) => {

        if(err){
            res.status(500).send("error terrible agregando a la base de datos")
            return false
        }
        else{
            console.log("venta enviada a la bd exitosamente",result)
            res.status(200).send("venta enviada a la bd exitosamente");
        }
    })
});

// Edita una venta 
rutasVentas.route("/Ventas/Updateventa").patch((req,res) => {
    const edit = req.body
    const filtroventas = {_id : new ObjectId(edit._id)}
    const operation = {$set : edit,}
    delete edit._id;

    const connection = getDB();
    connection
    .collection("Ventas")
    .findOneAndUpdate(filtroventas,operation, (err,result) => {
        if(err)
        {
            res.status(500).send("error terrible editando la base de datos",err)
            return false;
        }
        else{
            res.status(200).send("venta actualizada correctamente!")
        }
    })
})

//Borra una venta
rutasVentas.route("/Ventas/Deleteventa").delete((req,res) => {
    const filtroventas = {_id : new ObjectId(req.body._id)}

    const connection = getDB();
    connection
    .collection("Ventas")
    .deleteOne(filtroventas, (err,result) => {
        if(err)
        {
            res.status(500).send("error terrible borrando venta de la base de datos",err)
            return false;
        }
        else{
            res.status(200).send("venta borrada correctamente!")
        }
    })
})

export default rutasVentas;