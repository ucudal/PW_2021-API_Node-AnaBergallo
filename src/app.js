var express = require('express');
var fs = require('fs');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser());
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // CORS
    next();
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
        info['inicio'] = new Date(renglon[3]).toLocaleDateString('es-UY');
        info['fin'] = new Date(renglon[4]).toLocaleDateString('es-UY');
        result.push(info);
      } ;
      cont ++;
    }
  res.send(result);
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
  let nombreC = req.body.nombreContacto;
  console.log('   BODYYYY:   :'+nombreC);
  let documento = req.body.documento;
  console.log('   BODYYYY:   :'+documento);
  let email = req.body.email;
  console.log('   BODYYYY:   :'+email);
  let content = nombreC+';'+documento+';'+email+'\n';

  fs.open('docs/users.csv', 'a', 666, function( e, id ) {
   fs.write(id, content, null, 'utf8', function(){
    fs.close(id, function(){
     console.log('file is updated');
    });
   });
  });
  res.cookie("PW_2021-CV_Contacto", nombreC, {
    httpOnly: true,
    sameSite: 0,
    });
});

app.listen(process.env.PORT || 3001, (a) => {
  console.log("Servidor disponible en http://localhost:3001")
});
 
module.exports = app;