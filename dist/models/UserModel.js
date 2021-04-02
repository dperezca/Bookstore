"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UserRepository = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _typeorm = require("typeorm");

var _Users = require("../entities/Users");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var service = require('../../services.js');

var UserRepository = exports.UserRepository = (_dec = (0, _typeorm.EntityRepository)(_Users.User), _dec(_class = function (_Repository) {
    _inherits(UserRepository, _Repository);

    function UserRepository() {
        _classCallCheck(this, UserRepository);

        return _possibleConstructorReturn(this, (UserRepository.__proto__ || Object.getPrototypeOf(UserRepository)).apply(this, arguments));
    }

    _createClass(UserRepository, [{
        key: "createUser",


        // Registro de usuario con los datos del JSON
        value: async function createUser(userInfo) {
            try {
                // Crea el usuario
                var user = new _Users.User();
                // Actualiza info con los datos de la request
                user.userName = userInfo.username;
                user.password = userInfo.password;
                user.firstName = userInfo.nombre.toUpperCase();
                user.lastName = userInfo.apellido.toUpperCase();
                user.email = userInfo.email;
                user.rol = userInfo.rol;
                return await this.save(user);
            } catch (error) {
                throw error;
            }
        }

        // Modificación de datos de usuario

    }, {
        key: "updateUser",
        value: async function updateUser(userId, userInfo) {
            try {
                // Encuentra el usuario con el ID que viene en la request
                var user = await this.findOne({ id: userId });
                // Revisa que exista
                if (user === undefined || user.length <= 0) {
                    // Si no existe, devuelve error
                    return "El usuario no existe";
                } else {
                    // Si existe, actualiza y devuelve nuevos datos
                    user.firstName = userInfo.firstName;
                    user.password = userInfo.password;
                    user.lastName = userInfo.lastName;
                    user.email = userInfo.email;
                    user.rol = userInfo.rol;
                    user.userName = userInfo.userName;
                    await this.update(userId, user);
                    var newUserInfo = await this.find({ id: userId });
                    return newUserInfo;
                }
            } catch (error) {
                throw error;
            }
        }

        //Login

    }, {
        key: "login",
        value: async function login(username, password) {
            try {
                // Busqueda por nombre de usuario
                var find = await this.find({ where: { userName: username }, relations: ["rol"] });
                if (find === 'undefined' || find.length <= 0) {
                    return "Usuario no existe";
                } // Revisa si la contraseña es la guardada
                else if (find[0].password !== password) {
                        return "Constraseña incorrecta";
                    } else {
                        var token = service.createToken(find[0].id, find[0].rol.rolId);
                        return token;
                    }
            } catch (error) {
                return error;
            }
        }
    }, {
        key: "getUserInfo",
        value: async function getUserInfo(idNum) {
            try {
                var find = await this.findOne({ where: { id: idNum }, relations: ["rol"] });
                return find;
            } catch (error) {
                return error;
            }
        }
    }]);

    return UserRepository;
}(_typeorm.Repository)) || _class);