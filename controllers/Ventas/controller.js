import {getDB} from "../../db/db.js"
import {ObjectId} from "mongodb";

const obtenerTodasLasVentas = async (callback) => {
    const connection = getDB();
    await connection.collection("Ventas").find({}).toArray(callback);
};

const guardarVenta = async (venta,callback) => {
    const connection = getDB();
    await connection.collection("Ventas").insertOne(venta,(callback));
};


const editarVenta = async (id,venta,callback) => {
    const connection = getDB();

    const filtroventas = {_id : new ObjectId(id)}
    const operation = {$set : venta,}

    await connection.collection("Ventas").findOneAndUpdate(filtroventas,operation,callback)
};

const borrarVenta = async (id,callback) => {
    const connection = getDB();
    
    const filtroventas = {_id : new ObjectId(id)}
    await connection.collection("Ventas").deleteOne(filtroventas,callback)
};



export {obtenerTodasLasVentas, guardarVenta, editarVenta,borrarVenta};