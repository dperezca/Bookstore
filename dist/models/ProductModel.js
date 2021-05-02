"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ProductRepository = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _typeorm = require("typeorm");

var _Products = require("../entities/Products");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProductRepository = exports.ProductRepository = (_dec = (0, _typeorm.EntityRepository)(_Products.Product), _dec(_class = function (_Repository) {
    _inherits(ProductRepository, _Repository);

    function ProductRepository() {
        _classCallCheck(this, ProductRepository);

        return _possibleConstructorReturn(this, (ProductRepository.__proto__ || Object.getPrototypeOf(ProductRepository)).apply(this, arguments));
    }

    _createClass(ProductRepository, [{
        key: "createProduct",
        value: async function createProduct(product, user) {
            try {
                // Crea el producto
                var newProduct = new _Products.Product();
                product.created = user;
                return await this.save(product);
            } catch (error) {
                throw error;
            }
        }
    }, {
        key: "findById",
        value: async function findById(id) {
            try {
                var product = await this.findOne({ id: id }, { relations: ["category", "idioma", "estado"] });
                if (product === undefined || product.length <= 0) {
                    throw "El producto no existe";
                } else {
                    return product;
                }
            } catch (error) {
                throw error;
            }
        }
    }, {
        key: "findByQuery",
        value: async function findByQuery(query) {
            try {
                if (Object.getOwnPropertyNames(query).includes("pricemin") && Object.getOwnPropertyNames(query).includes("pricemax")) {
                    query.price = (0, _typeorm.Between)(query.pricemin, query.pricemax);
                    delete query.pricemin;
                    delete query.pricemax;
                } else if (Object.getOwnPropertyNames(query).includes("pricemin")) {
                    query.price = (0, _typeorm.MoreThanOrEqual)(query.pricemin).LessThanOrEqual(25);
                    delete query.pricemin;
                } else if (Object.getOwnPropertyNames(query).includes("pricemax")) {
                    console.log("maximo");
                    query.price = (0, _typeorm.LessThanOrEqual)(query.pricemax);
                    delete query.pricemin;
                }
                var listProd = await this.find({
                    where: [query]
                });
                if (listProd.length === 0) {
                    return "No se encontraton coincidencias";
                } else {
                    return listProd;
                }
            } catch (error) {
                return error;
            }
        }
    }, {
        key: "updateById",
        value: async function updateById(id, newProductInfo) {
            try {
                console.log("Actualizando producto");
                return await this.update(id, newProductInfo);
            } catch (error) {
                return error;
            }
        }
    }]);

    return ProductRepository;
}(_typeorm.Repository)) || _class);