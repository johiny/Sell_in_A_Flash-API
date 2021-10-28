import { MongoClient } from "mongodb";
import dotenv from "dotenv"

dotenv.config({path:"./.env"})

const connectionstring = process.env.DATABASE_URL;

const mongo = new MongoClient(connectionstring, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let SFBD;

const getDB = () => {
    return SFBD
}

const bdConnection = (callback) => {
    mongo.connect((err,db) => {
        if (err) {
            console.error("error terrible conectandose a la base de datos",err)
            return "ERROR"
        }
        else {
        SFBD = db.db("SellInAFlash");
        console.log("conexion exitosa!")
        return callback();
        }
        })};

export {bdConnection,getDB};