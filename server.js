import  Express  from "express";
import { MongoClient } from "mongodb";
import Cors from 'cors'

//Se crean las variables y objetos para poder implementar express y mongodb

const connectionstring = ''

const mongo = new MongoClient(connectionstring, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let connection;

const app = Express();
app.use(Express.json());

app.use(Express.json());
app.use(Cors());

// Obtiene las ventas de la base de datos

app.get("/Ventas", (req,res) => {

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

// inicia el servidor, si se conecta a la base de datos envia un mensaje en la terminal y se pone a escuchar un puerto, de otra manera lanza error

const main = () => {
    
    mongo.connect((err,db) => {
        if (err) {
            console.error("error terrible conectandose a la base de datos",err)
            return false
        }
        else{
        connection = db.db("SellInAFlash");
        console.log("conexion exitosa!")
        return app.listen(5000,() => {
            console.log("estoy escuchando desde el backend!")
        });
        }
    });
};

main();
    //enviar vehiculo a la base de datos
    const datosProductos = req.body;
    console.log('llaves: ',Object.keys(datosProductos));
    try {
        if (
        Object.keys(datosProductos).includes("id") && 
        Object.keys(datosProductos).includes("vendedor") &&
        Object.keys(datosProductos).includes("nombre") &&
        Object.keys(datosProductos).includes("marca") &&
        Object.keys(datosProductos).includes("precio") 
        ) {
            res.sendStatus(200); 
        }
        else{
            res.sendStatus(500);
        }
    } catch{
        res.sendStatus(500);
    }
})
app.listen(5000,() => {console.log("estoy escuchando desde el backend!")})
