"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Initializable_1 = require("../../Abstracts/Initializable");
var Helpers_1 = require("../../../Helpers");
var Promise = require("bluebird");
/**
 * Objects Class
 */
var Objects = (function (_super) {
    __extends(Objects, _super);
    function Objects() {
        _super.apply(this, arguments);
        this.instances = {};
    }
    Object.defineProperty(Objects.prototype, "collection", {
        get: function () {
            return require.context('../../Resources/Objects', true, /\.js$/);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Initialize Object
     */
    Objects.prototype.initialize = function (instance) {
        var _this = this;
        var loaders = {
            0: this.app.model,
            1: this.app.material,
            2: this.app.animation
        };
        return Promise
            .map([instance.models, instance.materials, instance.animations], function (item, index) {
            return item ? loaders[index].load(item) : null;
        })
            .then(function (resolutions) {
            /**
             * Parse Animation and store it on userData.animations
             */
            var mesh = instance.create.apply(instance, resolutions);
            /**
             * If Animation is set
             */
            if (instance.animations) {
                var objects_1 = [];
                /**
                 * hacky but... if its a group.. send the bones trough the userData
                 */
                if (mesh instanceof THREE.Group) {
                    mesh.children.forEach(function (child) {
                        if (child instanceof THREE.SkinnedMesh) {
                            objects_1.push(child);
                        }
                    });
                }
                else {
                    objects_1.push(mesh);
                }
                for (var _i = 0, objects_2 = objects_1; _i < objects_2.length; _i++) {
                    var object = objects_2[_i];
                    var actions = _this.app.animation.create(object, object.geometry.bones, resolutions[2]);
                    /**
                     * Give a chance for the actions to be configurable
                     */
                    if (Helpers_1.is.Function(instance.configAnimation))
                        instance.configAnimation(actions);
                    object.userData.animations = actions;
                }
            }
            return mesh;
        });
    };
    Objects.prototype.update = function (time, delta) {
    };
    return Objects;
}(Initializable_1.Initializable));
exports.Objects = Objects;
//# sourceMappingURL=Objects.js.map