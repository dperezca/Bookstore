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


        // Registro de usuario con los datos del JSON
        value: async function createProduct(product) {
            try {
                // Crea el usuario
                var newProduct = new _Products.Product();
                console.log(newProduct);
                console.log(product);
                newProduct.seller = product.seller;
                console.log(newProduct);
                newProduct.category = product.category;
                newProduct.title = product.title;
                newProduct.author = product.author;
                newProduct.ISBN = product.ISBN;
                newProduct.idioma = product.idioma;
                newProduct.estado = product.estado;
                console.log(newProduct);
                return await this.save(newProduct);
            } catch (error) {
                return error;
            }
        }
    }]);

    return ProductRepository;
}(_typeorm.Repository)) || _class);