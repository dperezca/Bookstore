'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Product = undefined;

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10;

var _typeorm = require('typeorm');

var _ProdOrder = require('./ProdOrder');

var _Categorias = require('./Categorias');

var _Idiomas = require('./Idiomas');

var _Estados = require('./Estados');

var _Users = require('./Users');

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

var Product = exports.Product = (_dec = (0, _typeorm.Entity)(), _dec2 = (0, _typeorm.PrimaryGeneratedColumn)(), _dec3 = (0, _typeorm.ManyToOne)(function () {
    return _Users.User;
}, function (seller) {
    return seller.id;
}, { eager: true }), _dec4 = (0, _typeorm.ManyToOne)(function () {
    return _Categorias.Categorias;
}, function (categoria) {
    return categoria.id;
}, { nullable: false }, { eager: true }), _dec5 = (0, _typeorm.Column)("varchar", { nullable: false }), _dec6 = (0, _typeorm.Column)("varchar", { nullable: false }), _dec7 = (0, _typeorm.Column)("varchar", { nullable: true }), _dec8 = (0, _typeorm.ManyToOne)(function () {
    return _Idiomas.Idiomas;
}, function (idioma) {
    return idioma.cod;
}, { nullable: false }, { eager: true }), _dec9 = (0, _typeorm.ManyToOne)(function () {
    return _Estados.Estados;
}, function (estado) {
    return estado.estadoId;
}, { nullable: false }), _dec10 = (0, _typeorm.Column)("float", { nullable: false }), _dec11 = (0, _typeorm.OneToMany)(function () {
    return _ProdOrder.ProdOrder;
}, function (prodOrder) {
    return prodOrder.product;
}), _dec(_class = (_class2 = function Product() {
    _classCallCheck(this, Product);

    _initDefineProp(this, 'id', _descriptor, this);

    _initDefineProp(this, 'created', _descriptor2, this);

    _initDefineProp(this, 'category', _descriptor3, this);

    _initDefineProp(this, 'title', _descriptor4, this);

    _initDefineProp(this, 'author', _descriptor5, this);

    _initDefineProp(this, 'ISBN', _descriptor6, this);

    _initDefineProp(this, 'idioma', _descriptor7, this);

    _initDefineProp(this, 'estado', _descriptor8, this);

    _initDefineProp(this, 'price', _descriptor9, this);

    _initDefineProp(this, 'prodOrder', _descriptor10, this);
}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'id', [_dec2], {
    enumerable: true,
    initializer: function initializer() {
        return undefined;
    }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'created', [_dec3], {
    enumerable: true,
    initializer: function initializer() {
        return _Users.User;
    }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'category', [_dec4], {
    enumerable: true,
    initializer: function initializer() {
        return _Categorias.Categorias;
    }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'title', [_dec5], {
    enumerable: true,
    initializer: function initializer() {
        return "";
    }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'author', [_dec6], {
    enumerable: true,
    initializer: function initializer() {
        return "";
    }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, 'ISBN', [_dec7], {
    enumerable: true,
    initializer: function initializer() {
        return "";
    }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, 'idioma', [_dec8], {
    enumerable: true,
    initializer: function initializer() {
        return _Idiomas.Idiomas;
    }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, 'estado', [_dec9], {
    enumerable: true,
    initializer: function initializer() {
        return _Estados.Estados;
    }
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, 'price', [_dec10], {
    enumerable: true,
    initializer: function initializer() {
        return "";
    }
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, 'prodOrder', [_dec11], {
    enumerable: true,
    initializer: function initializer() {
        return _ProdOrder.ProdOrder;
    }
})), _class2)) || _class);