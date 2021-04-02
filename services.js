var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('./config');

exports.createToken = function(userId, rolUser) {
  var payload = {
  sub: userId,
  rol: rolUser,
  iat: moment().unix(),
  exp: moment().add(14, "days").unix(),
  };
return jwt.encode(payload, config.TOKEN_SECRET);
};