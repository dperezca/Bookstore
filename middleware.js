
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
  next();
}

exports.ensureAuthenticatedVend = function(req, res, next) {
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

  if(payload.rol === 3 || 1) {
    req.user = payload.sub;
    next();
  }
  else {
    return res
    .status(401)
    .send({message: "No tiene acceso, debe ser vendedor"});
  }

}