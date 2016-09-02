"use strict";
var Helpers_1 = require("../../../Helpers");
var Promise = require("bluebird");
/**
 * Compositions Class
 */
var Compositions = (function () {
    function Compositions() {
        this.instances = {};
        this.active = null;
    }
    Compositions.prototype.boot = function (application) {
        this.app = application;
        application.app.bootstrap(this.instances, Helpers_1.requireAll(require.context("../Compositions", true, /\.js$/)), this.app);
    };
    /**
     * get composition
     *
     * @param name
     * @returns {any}
     */
    Compositions.prototype.get = function (name) {
        for (var index in this.instances) {
            if (this.instances[index].constructor.name.toLowerCase() === name) {
                return this.instances[index];
            }
        }
        throw "There is no composition called: " + name;
    };
    /**
     * Start Composition
     * @param compositionName
     * @param payload
     * @returns Promise
     */
    Compositions.prototype.start = function (compositionName, payload) {
        var _this = this;
        var composition = this.get(compositionName);
        /**
         * Setup The scene
         */
        if (typeof composition.setup === 'function') {
            composition.setup.apply(composition, [this.app].concat(payload));
        }
        return Promise
            .map(composition.objects, function (object) {
            return _this.app.objects.get(object);
        })
            .then(function (objects) {
            var objs = {};
            objects.forEach(function (b) {
                objs[b.name] = b;
            });
            composition.stage(objs);
            return objs;
        })
            .then(function (objects) {
            _this.active = { composition: composition, objects: objects };
        });
    };
    /**
     * Update Loop
     * @param time
     * @param delta
     */
    Compositions.prototype.update = function (time, delta) {
        if (!this.active)
            return;
        this.active.composition.update(this.active.objects, time, delta);
    };
    return Compositions;
}());
exports.Compositions = Compositions;
//# sourceMappingURL=Compositions.js.map