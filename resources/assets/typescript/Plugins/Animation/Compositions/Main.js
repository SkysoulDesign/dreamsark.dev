"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AbstractComposition_1 = require("../Abstract/AbstractComposition");
var Helpers_1 = require("../../../Helpers");
/**
 * Main Composition
 */
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.apply(this, arguments);
    }
    Main.prototype.objects = function () {
        return [
            'base',
            this.activeProfile
        ];
    };
    Main.prototype.setup = function (app, container, activeProfile) {
        var _this = this;
        this.app = app;
        this.activeProfile = Helpers_1.toCamelCase(activeProfile);
        document.querySelector(container).addEventListener('click', function (e) {
            var target = e.target;
            if (target.dataset.hasOwnProperty('profileName')) {
                _this.switch(target.dataset['profileName'], target.dataset['translation']);
            }
        });
    };
    Main.prototype.stage = function (scene, camera, objects) {
        this.scene = scene;
        objects.base.position.set(0, -25, 2);
        objects.base.rotation.y = Math.PI;
        scene.add(objects[this.activeProfile], objects.base);
    };
    Main.prototype.update = function (scene, camera, objects, time, delta) {
    };
    Main.prototype.switch = function (name, translation) {
        var _this = this;
        window['dreamsark'].vueInstance.$set('position', {
            name: name,
            translation: translation
        });
        this.app.objects.get(name).then(function (profile) {
            if (_this.activeProfile == profile.name)
                return console.log('already active');
            var current = _this.scene.getObjectByName(_this.activeProfile);
            _this.scene.remove(_this.scene.remove(current));
            _this.scene.add(profile);
            _this.activeProfile = profile.name;
        });
    };
    return Main;
}(AbstractComposition_1.AbstractComposition));
exports.Main = Main;
//# sourceMappingURL=Main.js.map