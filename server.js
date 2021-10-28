import  Express  from "express";
import Cors from 'cors'
import dotenv from "dotenv"
import {bdConnection} from "./db/db.js"
import rutasVentas from "./views/Ventas/rutas.js"
dotenv.config({path:"./.env"})

//Se crean las variables y objetos para poder implementar express y mongodb
const app = Express();

app.use(Express.json());
app.use(Cors());
app.use(rutasVentas);

// inicia el servidor, si se conecta a la base de datos envia un mensaje en la terminal y se pone a escuchar un puerto, de otra manera lanza error

const main = () => {
    return app.listen(process.env.PORT,() => {
        console.log(`estoy escuchando el puerto ${process.env.PORT} desde el backend!`)
        });
};

bdConnection(main);
