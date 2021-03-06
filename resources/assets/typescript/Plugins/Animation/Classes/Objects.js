"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Components_1 = require("../Abstract/Components");
var Helpers_1 = require("../../Helpers");
var Helpers_2 = require("../../../Helpers");
/**
 * Objects Class
 */
var Objects = (function (_super) {
    __extends(Objects, _super);
    function Objects() {
        _super.apply(this, arguments);
        /**
         * Objects Collection
         * @type {Character[]}
         */
        this.collection = Helpers_2.requireAll(require.context("../Objects", false, /\.js$/));
        /**
         * List of Initialized Object
         * @type {THREE.Object3D[]}
         */
        this.initialized = {};
    }
    Objects.prototype.boot = function (app) {
        var _this = this;
        this.loader = app.loader;
        this.collection.forEach(function (object) {
            for (var name_1 in object) {
                if (object.hasOwnProperty(name_1)) {
                    _this.init(name_1, {
                        loaded: false,
                        object: object[name_1]
                    });
                }
            }
        });
    };
    Objects.prototype.init = function (name, character) {
        var _this = this;
        name = Helpers_2.toCamelCase(name);
        return new Promise(function (accept, reject) {
            if (character.object instanceof Function)
                character.object = new character.object(_this.app);
            character.name = name;
            if (!character.force && character.object.hasOwnProperty('defer') && character.object.defer) {
                character.loaded = false;
                _this.initialized[character.name] = character;
                return accept(character);
            }
            if (character.object.models instanceof Function) {
                /**
                 * Load Models
                 */
                var items = character.object.models();
                if (character.object.textures instanceof Function)
                    items = Helpers_2.extend(items, character.object.textures());
                _this.load(items, function (object, materials) {
                    var textures = {}, geometry = {};
                    for (var i in object) {
                        if (object[i] instanceof THREE.Texture)
                            textures[i] = object[i];
                        else
                            geometry[i] = object[i];
                    }
                    character.loaded = true;
                    character.object = character.object.init(character.name, geometry, textures, materials);
                    _this.initialized[character.name] = character;
                    return accept(character);
                });
                return null;
            }
            console.log('still to implement... if no models at all');
        });
    };
    /**
     * Get a Character
     * @param name
     * @returns {Promise<T>|Promise}
     */
    Objects.prototype.get = function (name) {
        var _this = this;
        name = Helpers_2.toCamelCase(name);
        return new Promise(function (accept, reject) {
            if (_this.initialized.hasOwnProperty(name)) {
                if (!_this.initialized[name].loaded) {
                    _this.initialized[name].force = true;
                    _this.init(name, _this.initialized[name]).then(function (character) {
                        accept(character.object);
                    });
                }
                else {
                    accept(_this.initialized[name].object);
                }
            }
            else {
                console.log("There is no character called: " + name);
                reject(name);
            }
        });
    };
    /**
     * Load The Object with Ajax
     * @param models
     * @param callback
     */
    Objects.prototype.load = function (models, callback) {
        var counter = 1;
        var max = Helpers_1.countKeys(models);
        var _loop_1 = function(name_2) {
            this_1.loader.load(models[name_2], function (object, materials) {
                object.name = name_2;
                models[name_2] = object;
                if (counter !== max)
                    return ++counter;
                callback.apply(void 0, [models].concat(materials));
            });
        };
        var this_1 = this;
        for (var name_2 in models) {
            _loop_1(name_2);
        }
    };
    return Objects;
}(Components_1.Components));
exports.Objects = Objects;
//# sourceMappingURL=Objects.js.map