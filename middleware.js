
var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('./config');

exports.ensureAuthenticated = function(req, res, next) {
  if(!req.headers.authorization) {
    return res
      .status(403)
      .send({message: "Tu petición no tiene cabecera de autorización"});
  }
  
  var token = req.headers.authorization;
  var payload = jwt.decode(token, config.TOKEN_SECRET);
  
  if(payload.exp <= moment().unix()) {
    return res
        .status(401)
        .send({message: "El token ha expirado"});
  }
  req.user = payload.sub;
  req.rol = payload.rol;
  next();
}

exports.ensureActiveUserInfo = function() {
  return function(req,res,next) {
     // Con la información del TOKEN controla que el usuario sea ADMIN o sea pida la información del usuario logueados
    console.log(`Usuario logueado: ${req.user} - Compras pedidas para usuario ${req.params.id}`);
    if (req.rol === 1 || req.user == req.params.id) {
      console.log(`OK - El usuario puede acceder a las compras`);
      next();
    } else {
      res.status(401).send("ERROR - No puede acceder a la información de otro usuario");
    }
  }
}

exports.ensureOnlySomeRoles = function(roles) {
  return function(req,res,next) {
    const validar = roles.find(rol => rol == req.rol);
    if (validar) {
      console.log("Usuario con permiso");
      next()
    } else {
    console.log("El rol del usuario no le permite realizar la acción");
    res.status(401).send("El rol del usuario no le permite realizar la acción");}
   
  }
}

exports.ensureCreator = function(roles) {
  return function(req,res,next) {
    const validar = roles.find(rol => rol == req.rol);
    if (validar) {
      console.log("Usuario con permiso");
      next()
    } else {
    console.log("El rol del usuario no le permite realizar la acción");
    res.status(401).send("El rol del usuario no le permite realizar la acción");}
   
  }
}