"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Components_1 = require("../Abstract/Components");
var Helpers_1 = require("../../Helpers");
/**
 * Characters Class
 */
var Characters = (function (_super) {
    __extends(Characters, _super);
    function Characters() {
        _super.call(this);
        /**
         * Characters Collection
         * @type {Character[]}
         */
        this.collection = [
            require('../Characters/Designer')
        ];
        /**
         * List of Initialized Object
         * @type {THREE.Object3D[]}
         */
        this.initialized = {};
    }
    Characters.prototype.boot = function (app) {
        var _this = this;
        this.app = app;
        this.loader = app.loader;
        this.collection.forEach(function (character) {
            for (var name_1 in character) {
                if (character.hasOwnProperty(name_1)) {
                    _this.init(name_1, {
                        loaded: false,
                        object: character[name_1]
                    });
                }
            }
        });
    };
    Characters.prototype.init = function (name, character) {
        var _this = this;
        return new Promise(function (accept, reject) {
            if (character.object instanceof Function)
                character.object = new character.object(_this.app);
            character.name = name.toLowerCase();
            if (!character.force && character.object.hasOwnProperty('defer') && character.object.defer) {
                character.loaded = false;
                _this.initialized[character.name] = character;
                return accept(character);
            }
            if (character.object.models instanceof Function) {
                _this.load(character.object.models(), function (models, materials) {
                    character.loaded = true;
                    character.object = character.object.init(character.object.name, models, materials);
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
    Characters.prototype.get = function (name) {
        var _this = this;
        name = name.toLowerCase();
        return new Promise(function (accept, reject) {
            if (_this.initialized.hasOwnProperty(name)) {
                if (!_this.initialized[name].loaded) {
                    _this.initialized[name].force = true;
                    _this.init(name, _this.initialized[name]).then(function (character) {
                        accept(character.object);
                    });
                }
            }
        });
    };
    /**
     * Load The Object with Ajax
     * @param models
     * @param callback
     */
    Characters.prototype.load = function (models, callback) {
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
    Characters.prototype.first = function () {
        return;
    };
    return Characters;
}(Components_1.Components));
exports.Characters = Characters;
//# sourceMappingURL=Characters.js.map