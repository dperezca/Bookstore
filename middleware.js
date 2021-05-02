
var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('./config');

// Chequea que el usuario este autenticado con el TOKEN
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

// Con la información del TOKEN controla que el usuario sea ADMIN o sea pida la información del usuario logueados
exports.ensureActiveUserInfo = function() {
  return function(req,res,next) {
    console.log(`Usuario logueado: ${req.user} - Info pedida de usuario: ${req.params.id}`);
    console.log(`Rol: ${req.rol}`)
    if (req.rol === 1 || req.user == req.params.id) {
      console.log(`OK - El usuario tiene acceso a ver la info`);
      next();
    } else {
      res.status(401).send("ERROR - No puede acceder a la información pedida");
    }
  }
}

// Chequea que el usuario tenga alguno de los roles que vienen como parámetros
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

// 
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