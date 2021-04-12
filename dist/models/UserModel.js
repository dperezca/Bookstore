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
var bcrypt = require("bcryptjs");

var UserRepository = exports.UserRepository = (_dec = (0, _typeorm.EntityRepository)(_Users.User), _dec(_class = function (_Repository) {
    _inherits(UserRepository, _Repository);

    function UserRepository() {
        _classCallCheck(this, UserRepository);

        return _possibleConstructorReturn(this, (UserRepository.__proto__ || Object.getPrototypeOf(UserRepository)).apply(this, arguments));
    }

    _createClass(UserRepository, [{
        key: "updateUser",


        // Modificación de datos de usuario
        value: async function updateUser(userId, userInfo) {
            try {
                // Si lo que modifica es la password, la hashea
                if (userInfo.password) {
                    userInfo.password = await bcrypt.hash(userInfo.password, 2);
                }
                await this.update(userId, userInfo);
                var user = await this.find({ where: { id: userId }, select: ["firstName", "lastName", "userName", "email"], relations: ["rol"] });
                return user;
            } catch (error) {
                throw error;
            }
        }
    }, {
        key: "getUserInfo",
        value: async function getUserInfo(idNum) {
            try {
                var find = this.find({ where: { id: idNum }, select: ["firstName", "lastName", "userName", "email"], relations: ["rol"] });
                return find;
            } catch (error) {
                return error;
            }
        }
    }]);

    return UserRepository;
}(_typeorm.Repository)) || _class);