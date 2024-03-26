const express = require("express");

const mysql = require("mysql");

const app = express();

let conexion  = mysql.createConnection({
  host: "bvdc3gz89m7hvrigui8d-mysql.services.clever-cloud.com",
  database: "bvdc3gz89m7hvrigui8d",
  user: "untwargtc7ujbkvg",
  password: "1s2gfEsLo9mS9wzdG8Sj"
});

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/", function(req,res){
    res.render("registro");
});

app.post("/validar" , function(req,res){
  const datos = req.body;

  
  let cedula = datos.ced;
  let nombre = datos.nom;
  let apellido = datos.apell;
  let correo = datos.correo;
  let contrasena = datos.pass;

  let buscar = "SELECT * FROM tabla_usuarios WHERE ced = "+cedula +" ";

  conexion.query(buscar, function(error, row){
    if(error){
      throw error;
    }else{
      
      if(row.length>0){
        console.log("no se pudo registrar, usuario esistente");
      }else{

        let registrar = "INSERT INTO tabla_usuarios (ced, nombre, apellido, correo, contrasena) VALUES ('"+cedula +"', '"+nombre +"', '"+apellido +"', '"+correo +"', '"+contrasena +"')";

        conexion.query(registrar, function(error){
           if(error){
              throw error;
          }else{
              console.log("datos almacenados bien");
          }

        });

      }

    }

  });


});

app.listen(3306, function(){
    console.log("conexion exitosa http://localhost:3306");
});