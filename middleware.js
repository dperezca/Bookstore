
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
  console.log("rol",payload)
  next();
}

exports.ensureAuthenticatedVend = function(roles) {
  return function(req, res, next) {
    console.log(roles.length);
    console.log(req.rol);
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