import  Express  from "express";
import Cors from 'cors'
import dotenv from "dotenv"
import {bdConnection,getDB } from "./db/db.js"

dotenv.config({path:"./.env"})

//Se crean las variables y objetos para poder implementar express y mongodb
const app = Express();
app.use(Express.json());

app.use(Express.json());
app.use(Cors());

// Obtiene las ventas de la base de datos

app.get("/Ventas", (req,res) => {
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


//envia una venta a la base de datos

app.post("/Ventas/Newventa",(req,res) => {
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

app.patch("/Ventas/Updateventa",(req,res) => {
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

app.delete("/Ventas/Deleteventa",(req,res) => {
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


// inicia el servidor, si se conecta a la base de datos envia un mensaje en la terminal y se pone a escuchar un puerto, de otra manera lanza error

const main = () => {
    return app.listen(process.env.PORT,() => {
        console.log(`estoy escuchando el puerto ${process.env.PORT} desde el backend!`)
        });
};

bdConnection(main);
