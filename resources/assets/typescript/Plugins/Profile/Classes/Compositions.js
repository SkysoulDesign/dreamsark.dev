"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Components_1 = require("../Abstract/Components");
var Helpers_1 = require("../../../Helpers");
/**
 * Compositions Class
 */
var Compositions = (function (_super) {
    __extends(Compositions, _super);
    function Compositions() {
        _super.apply(this, arguments);
        this.compositions = Helpers_1.requireAll(require.context("../Compositions", true, /\.js$/));
        // private compositions = {
        //     main: require('../Compositions/Main'),
        //     project: require('../Compositions/Project')
        // };
        this.initialized = {};
        this.active = null;
    }
    Compositions.prototype.boot = function (app) {
        window['dreamsark'].bootstrap(this.initialized, this.compositions);
    };
    /**
     *
     * @param name
     * @returns {any}
     */
    Compositions.prototype.get = function (name) {
        for (var index in this.initialized) {
            if (this.initialized[index].constructor.name.toLowerCase() === name) {
                return this.initialized[index];
            }
        }
        console.log("There is no composition called: " + name);
    };
    Compositions.prototype.start = function (compositionName, payload) {
        var _this = this;
        var composition = this.get(compositionName);
        /**
         * if no composition, abort
         */
        if (!composition)
            return;
        /**
         * Setup The scene
         */
        composition.setup.apply(composition, [this.app].concat(payload));
        var objects = {}, objectList = composition.objects(), callback = function () {
            composition.stage(_this.app.scene, _this.app.camera, objects);
            /**
             * Set Active Composition after Loading every object
             * @type {any}
             */
            _this.active = {
                objects: objects,
                composition: composition
            };
        };
        if (!objectList)
            return callback();
        var counter = 0;
        objectList.forEach(function (name) {
            _this.app.objects.get(name).then(function (object) {
                objects[name] = object;
                counter++;
                if (objectList.length === counter) {
                    callback();
                }
            });
        });
    };
    Compositions.prototype.update = function (time, delta) {
        if (!this.active)
            return;
        this.active.composition.update(this.app.scene, this.app.camera, this.active.objects, time, delta);
    };
    return Compositions;
}(Components_1.Components));
exports.Compositions = Compositions;
//# sourceMappingURL=Compositions.js.map