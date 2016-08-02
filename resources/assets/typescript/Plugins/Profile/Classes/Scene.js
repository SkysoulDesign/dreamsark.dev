"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Scene Class
 */
var Scene = (function (_super) {
    __extends(Scene, _super);
    function Scene() {
        _super.call(this);
        this.fog = new THREE.FogExp2(0xe1f8ff, .002345);
    }
    Scene.prototype.boot = function (app) {
    };
    return Scene;
}(THREE.Scene));
exports.Scene = Scene;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2NlbmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTY2VuZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQTs7R0FFRztBQUNIO0lBQTJCLHlCQUFXO0lBS2xDO1FBQ0ksaUJBQU8sQ0FBQTtRQUNQLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBTkQsb0JBQUksR0FBSixVQUFLLEdBQUc7SUFDUixDQUFDO0lBT0wsWUFBQztBQUFELENBQUMsQUFWRCxDQUEyQixLQUFLLENBQUMsS0FBSyxHQVVyQztBQVZZLGFBQUssUUFVakIsQ0FBQSJ9