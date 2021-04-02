
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

exports.ensureAuthenticatedVend = function(roles) {
  return function(req, res, next) {
     for (var i = 0; i < roles.length; i++) {
       if (req.rol == roles[i]) {
         console.log("ok");
         console.log(req.rol)
       }
       console.log(roles[i]);
     }
  // TO DO: Comprobar el rol contra el array de roles que tenemos en la funcion principal
    // if(payload.rol === 3 || 1) {
    //   req.user = payload.sub;
    //   next();
    // }
    // else {
    //   return res
    //   .status(401)
    //   .send({message: "No tiene acceso, debe ser vendedor"});
    // }
    next();
}


}

exports.ensureActiveUserInfo = function() {
  return function(req,res,next) {
     // Con la información del TOKEN controla que el usuario sea ADMIN o sea pida la información del usuario logueado
    if (req.rol === 1 || req.user == req.params.id) {
      next();
    } else {
      res.status(401).send("No puede acceder a la información de otro usuario");
    }
  }
}