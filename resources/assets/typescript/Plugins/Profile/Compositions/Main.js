"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AbstractComposition_1 = require("../Abstract/AbstractComposition");
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.apply(this, arguments);
    }
    Main.prototype.characters = function () {
        return [
            'designer'
        ];
    };
    Main.prototype.stage = function (scene, camera, characters) {
        scene.add(characters.designer);
    };
    Main.prototype.update = function (scene, camera, characters, time, delta) {
    };
    return Main;
}(AbstractComposition_1.AbstractComposition));
exports.Main = Main;
//# sourceMappingURL=Main.js.map