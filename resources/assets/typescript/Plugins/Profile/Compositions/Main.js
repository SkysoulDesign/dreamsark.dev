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
                _this.switch(target.dataset['profileName'], target.dataset['localizedName']);
            }
        });
    };
    Main.prototype.stage = function (scene, camera, objects) {
        this.scene = scene;
        objects.base.position.set(0, -25, 2);
        objects.base.rotation.y = Math.PI;
        scene.add(objects[this.activeProfile], objects.base);
    };
    Main.prototype.update = function (scene, camera, objects, time, delta) { };
    Main.prototype.switch = function (name, localized) {
        var _this = this;
        window['dreamsark'].vueInstance.$set('position', name);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIk1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsb0NBQWtDLGlDQUFpQyxDQUFDLENBQUE7QUFDcEUsd0JBQTBCLGtCQUFrQixDQUFDLENBQUE7QUFFN0M7O0dBRUc7QUFDSDtJQUEwQix3QkFBbUI7SUFBN0M7UUFBMEIsOEJBQW1CO0lBcUU3QyxDQUFDO0lBL0RHLHNCQUFPLEdBQVA7UUFDSSxNQUFNLENBQUM7WUFDSCxNQUFNO1lBQ04sSUFBSSxDQUFDLGFBQWE7U0FDckIsQ0FBQTtJQUNMLENBQUM7SUFFRCxvQkFBSyxHQUFMLFVBQU0sR0FBRyxFQUFFLFNBQVMsRUFBRSxhQUFhO1FBQW5DLGlCQWVDO1FBYkcsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsYUFBYSxHQUFHLHFCQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFaEQsUUFBUSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBQSxDQUFDO1lBRXpELElBQUksTUFBTSxHQUFnQixDQUFDLENBQUMsTUFBTSxDQUFDO1lBRW5DLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDL0MsS0FBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQTtZQUMvRSxDQUFDO1FBRUwsQ0FBQyxDQUFDLENBQUE7SUFFTixDQUFDO0lBRUQsb0JBQUssR0FBTCxVQUFNLEtBQUssRUFBRSxNQUFNLEVBQUUsT0FBTztRQUV4QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUVuQixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBRWxDLEtBQUssQ0FBQyxHQUFHLENBQ0wsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUM1QyxDQUFDO0lBRU4sQ0FBQztJQUVELHFCQUFNLEdBQU4sVUFBTyxLQUFLLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxJQUFHLENBQUM7SUFFdEMscUJBQU0sR0FBZCxVQUFlLElBQUksRUFBRSxTQUFTO1FBQTlCLGlCQXNCQztRQXBCRyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFdkQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLE9BQU87WUFFbkMsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLGFBQWEsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDO2dCQUNuQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBRXpDLElBQUksT0FBTyxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUNwQyxLQUFJLENBQUMsYUFBYSxDQUNyQixDQUFBO1lBRUQsS0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQ2IsS0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQzdCLENBQUM7WUFFRixLQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN4QixLQUFJLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFFdEMsQ0FBQyxDQUFDLENBQUE7SUFFTixDQUFDO0lBRUwsV0FBQztBQUFELENBQUMsQUFyRUQsQ0FBMEIseUNBQW1CLEdBcUU1QztBQXJFWSxZQUFJLE9BcUVoQixDQUFBIn0=