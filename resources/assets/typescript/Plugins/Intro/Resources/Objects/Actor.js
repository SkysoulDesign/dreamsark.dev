"use strict";
var Actor = (function () {
    function Actor() {
    }
    Object.defineProperty(Actor.prototype, "models", {
        get: function () {
            return {
                character: '/models/Actor.json',
                base: '/models/Actor.json',
                top: '/models/Actor.json',
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Actor.prototype, "materials", {
        get: function () {
            return {
                basic: 'basicMaterial'
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Actor.prototype, "animations", {
        get: function () {
            return {
                base: 'baseAnimation'
            };
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Create Object
     *
     * @param models
     * @param materials
     * @returns {THREE.SkinnedMesh}
     */
    Actor.prototype.create = function (models, _a, animations) {
        var basic = _a.basic;
        var geometry = new THREE.BoxGeometry(100, 100, 100);
        console.log(models);
        return new THREE.Mesh(geometry, basic);
    };
    return Actor;
}());
exports.Actor = Actor;
//# sourceMappingURL=Actor.js.map