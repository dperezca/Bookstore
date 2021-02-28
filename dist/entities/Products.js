"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Product = undefined;

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8;

var _typeorm = require("typeorm");

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

var Product = exports.Product = (_dec = (0, _typeorm.Entity)(), _dec2 = (0, _typeorm.PrimaryGeneratedColumn)(), _dec3 = (0, _typeorm.Column)("integer"), _dec4 = (0, _typeorm.Column)("integer"), _dec5 = (0, _typeorm.Column)("varchar"), _dec6 = (0, _typeorm.Column)("varchar"), _dec7 = (0, _typeorm.Column)("varchar", { nullable: true }), _dec8 = (0, _typeorm.Column)("integer"), _dec9 = (0, _typeorm.Column)("integer"), _dec(_class = (_class2 = function Product() {
    _classCallCheck(this, Product);

    _initDefineProp(this, "prodId", _descriptor, this);

    _initDefineProp(this, "seller", _descriptor2, this);

    _initDefineProp(this, "category", _descriptor3, this);

    _initDefineProp(this, "title", _descriptor4, this);

    _initDefineProp(this, "author", _descriptor5, this);

    _initDefineProp(this, "ISBN", _descriptor6, this);

    _initDefineProp(this, "idioma", _descriptor7, this);

    _initDefineProp(this, "estado", _descriptor8, this);
}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prodId", [_dec2], {
    enumerable: true,
    initializer: function initializer() {
        return undefined;
    }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "seller", [_dec3], {
    enumerable: true,
    initializer: function initializer() {
        return "";
    }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "category", [_dec4], {
    enumerable: true,
    initializer: function initializer() {
        return "";
    }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "title", [_dec5], {
    enumerable: true,
    initializer: function initializer() {
        return "";
    }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "author", [_dec6], {
    enumerable: true,
    initializer: function initializer() {
        return "";
    }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "ISBN", [_dec7], {
    enumerable: true,
    initializer: function initializer() {
        return "";
    }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "idioma", [_dec8], {
    enumerable: true,
    initializer: function initializer() {
        return "";
    }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "estado", [_dec9], {
    enumerable: true,
    initializer: function initializer() {
        return "";
    }
})), _class2)) || _class);