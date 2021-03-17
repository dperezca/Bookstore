"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RolRepository = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _Roles = require("../entities/Roles");

var _typeorm = require("typeorm");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RolRepository = exports.RolRepository = (_dec = (0, _typeorm.EntityRepository)(_Roles.Rol), _dec(_class = function (_Repository) {
    _inherits(RolRepository, _Repository);

    function RolRepository() {
        _classCallCheck(this, RolRepository);

        return _possibleConstructorReturn(this, (RolRepository.__proto__ || Object.getPrototypeOf(RolRepository)).apply(this, arguments));
    }

    _createClass(RolRepository, [{
        key: "getRolDesc",


        //Buscar descripción del Rol
        value: async function getRolDesc(rolId) {
            try {
                var rolDesc = await this.find({ rolId: rolId });
                return rolDesc;
            } catch (error) {
                return error;
            }
        }
    }]);

    return RolRepository;
}(_typeorm.Repository)) || _class);