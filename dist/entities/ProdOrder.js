"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ProdOrder = undefined;

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

var _typeorm = require("typeorm");

var _Products = require("./Products");

var _Purchase = require("./Purchase");

function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
        enumerable: descriptor.enumerable,
        configurable: descriptor.configurable,
        writable: descriptor.writable,
        value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var ProdOrder = exports.ProdOrder = (_dec = (0, _typeorm.Entity)(), _dec2 = (0, _typeorm.PrimaryGeneratedColumn)(), _dec3 = (0, _typeorm.ManyToOne)(function () {
    return _Products.Product;
}, function (product) {
    return product.prodId;
}, { eager: true }), _dec4 = (0, _typeorm.ManyToOne)(function () {
    return _Purchase.Purchase;
}, function (purchase) {
    return purchase.purchaseId;
}, { eager: true }), _dec5 = (0, _typeorm.Column)("integer"), _dec(_class = (_class2 = function ProdOrder() {
    _classCallCheck(this, ProdOrder);

    _initDefineProp(this, "prodOrderId", _descriptor, this);

    _initDefineProp(this, "product", _descriptor2, this);

    _initDefineProp(this, "purchase", _descriptor3, this);

    _initDefineProp(this, "amount", _descriptor4, this);
}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prodOrderId", [_dec2], {
    enumerable: true,
    initializer: function initializer() {
        return undefined;
    }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "product", [_dec3], {
    enumerable: true,
    initializer: function initializer() {
        return _Products.Product;
    }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "purchase", [_dec4], {
    enumerable: true,
    initializer: function initializer() {
        return _Purchase.Purchase;
    }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "amount", [_dec5], {
    enumerable: true,
    initializer: function initializer() {
        return "";
    }
})), _class2)) || _class);