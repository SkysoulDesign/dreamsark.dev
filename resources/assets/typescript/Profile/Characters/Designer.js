"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Character_1 = require("../Abstract/Character");
/**
 * Character: Designer
 */
var Designer = (function (_super) {
    __extends(Designer, _super);
    function Designer() {
        _super.apply(this, arguments);
    }
    Designer.prototype.create = function () {
        var material = this.material(), head = new THREE.Mesh(new THREE.BoxGeometry(200, 200, 200), material), body = new THREE.Mesh(new THREE.BoxGeometry(300, 400, 200), material);
        head.position.set(0, 200, 0);
        body.position.set(0, -300, 0);
        head.add(body);
        return head;
    };
    Designer.prototype.material = function () {
        return new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
    };
    return Designer;
}(Character_1.Character));
exports.Designer = Designer;
//# sourceMappingURL=Designer.js.map