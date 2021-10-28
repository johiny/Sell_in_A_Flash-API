import  express  from "express";
import Cors from 'cors'
import dotenv from "dotenv"
import {bdConnection} from "./db/db.js"
import rutasVentas from "./views/Ventas/rutas.js";
import rutasUsuario from "./views/usuarios/rutas.js";
dotenv.config({path:"./.env"})
import jwt from 'express-jwt';
import jwks from 'jwks-rsa';
import {auth} from 'express-oauth2-jwt-bearer';


//Se crean las variables y objetos para poder implementar express y mongodb

const app = express();
/* const { auth } = require('express-oauth2-jwt-bearer'); */
app.use(express.json());
app.use(Cors());
app.use(rutasVentas);
app.use(rutasUsuario);

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-0skfin92.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'api-autenticacion-sellinaflash',
  issuer: 'https://dev-0skfin92.us.auth0.com/',
  algorithms: ['RS256']
}); 

app.use(jwtCheck);



// inicia el servidor, si se conecta a la base de datos envia un mensaje en la terminal y se pone a escuchar un puerto, de otra manera lanza error

const main = () => {
    return app.listen(process.env.PORT,() => {
        console.log(`estoy escuchando el puerto ${process.env.PORT} desde el backend!`)
        });
};

bdConnection(main);
