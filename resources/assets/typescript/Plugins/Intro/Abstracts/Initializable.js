"use strict";
var Helpers_1 = require("../../../Helpers");
var Helpers_2 = require("../../Helpers");
var Promise = require("bluebird");
/**
 * Initializable Class
 */
var Initializable = (function () {
    function Initializable() {
        this.recursive = true;
        this.hasCollection = Object.keys(this.collection).length !== 0;
    }
    Object.defineProperty(Initializable.prototype, "collection", {
        /**
         * Public properties that must to be overridden
         */
        get: function () { },
        enumerable: true,
        configurable: true
    });
    Initializable.prototype.boot = function (app) {
        var _this = this;
        this.app = app;
        /**
         * If Collection is empty, then don't attempt to load it
         */
        if (!this.hasCollection)
            return;
        Helpers_1.requireAll(this.collection).forEach(function (object) {
            for (var name_1 in object) {
                _this.instances[Helpers_1.toCamelCase(name_1)] = {
                    loaded: false,
                    instance: null,
                    constructor: object[name_1]
                };
            }
        });
    };
    /**
     * Get Object by its name
     *
     * @param object
     * @returns {"bluebird".Bluebird}
     */
    Initializable.prototype.get = function (object) {
        var _this = this;
        var name = Helpers_1.toCamelCase(object);
        return new Promise(function (accept, reject) {
            if (_this.instances.hasOwnProperty(name)) {
                /**
                 * If already loaded send it
                 */
                if (_this.instances[name].loaded) {
                    return accept(_this.instances[name].instance);
                }
                return _this
                    .initialize(new _this.instances[name].constructor(_this.app))
                    .then(function (instance) {
                    _this.instances[name].instance = instance;
                    _this.instances[name].loaded = true;
                    instance.name = name;
                    accept(instance);
                });
            }
            if (!_this.hasCollection) {
                return _this
                    .initialize(object)
                    .then(function (instance) {
                    _this.instances[name] = {
                        instance: instance,
                        loaded: true,
                        constructor: null
                    };
                    instance.name = name;
                    accept(instance);
                });
            }
            throw "object doesnt contain own property " + name;
        });
    };
    /**
     * Load objects
     *
     * @param objects
     * @returns {Bluebird<U>}
     */
    Initializable.prototype.load = function (objects) {
        var _this = this;
        var keys = Object.keys(objects), items = keys.map(function (key) { return objects[key]; });
        return Promise
            .map(items, function (item) { return _this.get(item); })
            .then(function (resolutions) { return Helpers_2.zip(resolutions, keys); });
    };
    return Initializable;
}());
exports.Initializable = Initializable;
//# sourceMappingURL=Initializable.js.map