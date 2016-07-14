"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AbstractComposition_1 = require("../Abstract/AbstractComposition");
/**
 * Main Composition
 */
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.apply(this, arguments);
    }
    Main.prototype.characters = function () {
        return [
            this.randomProfile
        ];
    };
    Main.prototype.setup = function (app, container, randomProfile) {
        var _this = this;
        this.app = app;
        this.randomProfile = randomProfile;
        document.querySelector(container).addEventListener('click', function (e) {
            var target = e.target;
            if (target.dataset.hasOwnProperty('profileName')) {
                _this.switch(target.dataset['profileName']);
            }
        });
    };
    Main.prototype.stage = function (scene, camera, characters) {
        this.scene = scene;
        scene.add(characters[this.randomProfile]);
    };
    Main.prototype.update = function (scene, camera, characters, time, delta) {
    };
    Main.prototype.switch = function (name) {
        var _this = this;
        this.app.characters.get(name).then(function (profile) {
            _this.scene.remove(_this.scene.children[1]);
            _this.scene.add(profile);
        });
    };
    return Main;
}(AbstractComposition_1.AbstractComposition));
exports.Main = Main;
//# sourceMappingURL=Main.js.map