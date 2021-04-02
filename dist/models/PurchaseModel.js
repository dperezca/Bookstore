"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PurchaseRepository = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _typeorm = require("typeorm");

var _Purchase = require("../entities/Purchase");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PurchaseRepository = exports.PurchaseRepository = (_dec = (0, _typeorm.EntityRepository)(_Purchase.Purchase), _dec(_class = function (_Repository) {
    _inherits(PurchaseRepository, _Repository);

    function PurchaseRepository() {
        _classCallCheck(this, PurchaseRepository);

        return _possibleConstructorReturn(this, (PurchaseRepository.__proto__ || Object.getPrototypeOf(PurchaseRepository)).apply(this, arguments));
    }

    _createClass(PurchaseRepository, [{
        key: "newPurchase",


        // Nueva compra
        value: async function newPurchase(purchaseInfo) {
            try {
                var purchase = new _Purchase.Purchase();
                purchase.seller = purchaseInfo.seller;
                purchase.buyer = purchaseInfo.buyer;
                return await this.save(purchase);
            } catch (error) {
                throw error;
            }
        }
    }, {
        key: "deletePurchase",
        value: async function deletePurchase(id) {
            try {
                await this.delete({ purchaseId: id });
            } catch (error) {
                throw error;
            }
        }
    }, {
        key: "findAll",
        value: async function findAll() {
            try {
                var list = await this.find();
                // const newList = [];
                // console.log(list[0].seller.id);
                // for (var i = 0; i<list.length - 1; i++) {
                //     newList.push(
                //         {"purchaseId": list[i].purchaseId,
                //         "seller": {"id": list[i].seller.id,"username": list[i].seller.userName},
                //         "buyer": {"id": list[i].seller.id,"username": list[i].seller.userName}},
                //         "prodOrder": {"id": list[i].seller.id,"username": list[i].seller.userName}},
                //         );

                return list;
            } catch (error) {
                return error;
            }
        }
    }]);

    return PurchaseRepository;
}(_typeorm.Repository)) || _class);