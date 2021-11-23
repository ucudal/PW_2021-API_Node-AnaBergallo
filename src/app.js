var express = require('express');
var fs = require('fs');
var cors = require('cors');
var app = express();
var cookies = require("cookie-parser");
var bodyParser = require('body-parser');
app.use(cookies());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser());
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // CORS
    next();
}); 

app.get("/hola-mundo", function(req, res) {
    res.send("¡Hola mundo!");
});

app.get('/experiencia-laboral', function(req, res) {
  let result = [] ;
  fs.readFile('docs/experiencia.csv', 'utf-8', function(error,  data){
    let lineas = data.split('\n');
    let cont = 0 ;
    for (let linea of lineas){
      if (cont > 0) {
        let info = {}; 
        let renglon = linea.split(';');
        info['empresa'] = renglon[0]; 
        info['puesto'] = renglon[1];
        info['descripcion'] = renglon[2];
        info['fechaInicio'] = new Date(renglon[3]).toLocaleDateString('es-UY');
        info['fechaFin'] = new Date(renglon[4]).toLocaleDateString('es-UY');
        result.push(info);
      } ;
      cont ++;
    }
  res.send({'experiencia-laboral': result});
  })
});

app.get('/skills', function(req, res) {
  let result = [] ;
  fs.readFile('docs/skills.csv', 'utf-8', function(error,  data){
    let lineas = data.split('\n');
    let cont = 0 ;
    for (let linea of lineas){
      if (cont > 0) {
        let info = {}; 
        let renglon = linea.split(';');
        info['name'] = renglon[0]; 
        info['description'] = renglon[1];
        result.push(info);
      } ;
      cont ++;
    }
  res.send(result);
  })
});

app.get('/languages', function(req, res) {
  let result = [] ;
  fs.readFile('docs/languages.csv', 'utf-8', function(error,  data){
    let lineas = data.split('\n');
    let cont = 0 ;
    for (let linea of lineas){
      if (cont > 0) {
        let info = {}; 
        let renglon = linea.split(';');
        info['name'] = renglon[0]; 
        info['description'] = renglon[1];
        result.push(info);
      } ;
      cont ++;
    }
  res.send(result);
  })
});

app.get('/other_info', function(req, res) {
  let result = [] ;
  fs.readFile('docs/other_info.csv', 'utf-8', function(error,  data){
    let lineas = data.split('\n');
    let cont = 0 ;
    for (let linea of lineas){
      if (cont > 0) {
        let info = {}; 
        let renglon = linea.split(';');
        info['name'] = renglon[0]; 
        info['description'] = renglon[1];
        result.push(info);
      } ;
      cont ++;
    }
  res.send(result);
  })
});

app.get('/education', function(req, res) {
  let result = [] ;
  fs.readFile('docs/education.csv', 'utf-8', function(error,  data){
    let lineas = data.split('\n');
    let cont = 0 ;
    for (let linea of lineas){
      if (cont > 0) {
        let info = {};
        let renglon = linea.split(';');
        info['name'] = renglon[0]; 
        info['institution'] = renglon[1];
        info['description'] = renglon[2];
        info['state'] = renglon[3];
        result.push(info);
      } ;
      cont ++;
    }
  res.send(result);
  })
});


app.post('/enviar-formulario', function(req, res) {
  let nombreContacto = req.body.nombreContacto;
  if (!nombreContacto) {
    res.status(400).send("Falta el nombre de contacto");
  } else { 
    let documento = req.body.documento;
    let email = req.body.email;
    let content = nombreContacto+';'+documento+';'+email+'\n';
    fs.open('docs/users.csv', 'a', 666, function( e, id ) {
    fs.write(id, content, null, 'utf8', function(){
      fs.close(id, () => {console.log("ok")});
    });
    });
    res.cookie("PW_2021-CV_Contacto", nombreContacto, {
      });
    res.send("OK");
  }
  
});

app.use(function(req, res, next) {
    res.status(404).send("404 - No fue encontrado");
});

app.listen(process.env.PORT || 3001, (a) => {
  console.log("Servidor disponible en http://localhost:3001")
});
 
module.exports = app;