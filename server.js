import  Express  from "express";

const app = Express();
app.use(Express.json());

app.get("/Ventas", (req,res) => {

    const productos = [
        {id:'122', vendedor:'Juan Orozco',nombre:'portatil', marca:'hp', precio:'1500000'},
        {id:'132', vendedor:'Juan Paz',nombre:'smartphone', marca:'samsumg', precio:'1000000'},
        {id:'142', vendedor:'Johan Sebastian Bach',nombre:'smartphone', marca:'motorola', precio:'800000'},
    ] // traer de la BD

    console.log("¿quieres las ventas?")
    res.send(productos)
})


app.post("/Ventas/Newventa",(req,res) => {

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