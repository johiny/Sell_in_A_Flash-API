import  Express  from "express";

const app = Express();

app.get("/Ventas", (req,res) => {

    const vehiculos = [] // traer de la BD

    console.log("¿quieres las ventas?")
    res.send("No hay ventas sorry")
})


app.post("/Ventas/Newventa",(req,res) => {

    //enviar vehiculo a la base de datos
    res.send("venta guardada correctamente!")
    console.log("procesando venta")
})
app.listen(5000,() => {console.log("estoy escuchando desde el backend!")})