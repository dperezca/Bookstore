"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ProdOrderRepository = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _typeorm = require("typeorm");

var _ProdOrder = require("../entities/ProdOrder");

var _Products = require("../entities/Products");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProdOrderRepository = exports.ProdOrderRepository = (_dec = (0, _typeorm.EntityRepository)(_ProdOrder.ProdOrder), _dec(_class = function (_Repository) {
    _inherits(ProdOrderRepository, _Repository);

    function ProdOrderRepository() {
        _classCallCheck(this, ProdOrderRepository);

        return _possibleConstructorReturn(this, (ProdOrderRepository.__proto__ || Object.getPrototypeOf(ProdOrderRepository)).apply(this, arguments));
    }

    _createClass(ProdOrderRepository, [{
        key: "newOrderList",


        // Nueva lista de productos
        value: async function newOrderList(id, products) {
            try {
                for (var i = 0; i < products.products.length; i++) {
                    var prodOrder = new _ProdOrder.ProdOrder();
                    prodOrder.purchase = id;
                    prodOrder.product = products.products[i].id;
                    prodOrder.amount = products.products[i].amount;
                    await this.save(prodOrder);
                }
            } catch (error) {
                throw error;
            }
        }
    }]);

    return ProdOrderRepository;
}(_typeorm.Repository)) || _class);