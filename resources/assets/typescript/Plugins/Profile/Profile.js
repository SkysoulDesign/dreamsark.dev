"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Plugins_1 = require("../Plugins");
require("expose?THREE!three");
// window['dreamsark'].exposes({
//     THREE: require('three')
// });
/**
 * Profile Class
 */
var Profile = (function (_super) {
    __extends(Profile, _super);
    function Profile(app, canvas) {
        _super.call(this);
        this.components = {
            camera: require('./Classes/Camera'),
            browser: require('./Classes/Browser'),
            controls: require('./Classes/Controls'),
            scene: require('./Classes/Scene'),
            compositions: require('./Classes/Compositions'),
            light: require('./Classes/Light'),
            renderer: require('./Classes/Renderer'),
            manager: require('./Classes/Manager'),
            loader: require('./Classes/Loader'),
            animator: require('./Classes/animator'),
            objects: require('./Classes/Objects'),
            material: require('./Classes/Material'),
            animation: require('./Classes/Animation'),
            effectComposer: require('./Classes/EffectComposer')
        };
        if (canvas.constructor === String) {
            canvas = document.querySelector(canvas);
        }
        this.canvas = canvas;
        app.bootstrap(this, this.components);
    }
    /**
     * Start The Interaction
     * @param item
     */
    Profile.prototype.start = function (composition) {
        var payload = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            payload[_i - 1] = arguments[_i];
        }
        this.compositions.start(composition, payload);
        this.animate();
    };
    Profile.prototype.animate = function () {
        var _this = this;
        var clock = new THREE.Clock(), loop = function (time) {
            var delta = clock.getDelta();
            requestAnimationFrame(loop);
            _this.loader.process();
            _this.controls.update();
            _this.animator.update(time, delta);
            _this.light.update(time, delta);
            _this.compositions.update(time, delta);
            _this.renderer.update(time, delta);
            // this.effectComposer.update(time, delta);
        };
        /**
         * Start Loop
         */
        loop(0);
    };
    return Profile;
}(Plugins_1.Plugins));
exports.Profile = Profile;
/**
 * Auto install itself
 */
window['dreamsark'].install({
    Profile: Profile
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlByb2ZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsd0JBQXNCLFlBQVksQ0FBQyxDQUFBO0FBYW5DLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBRTlCLGdDQUFnQztBQUNoQyw4QkFBOEI7QUFDOUIsTUFBTTtBQUVOOztHQUVHO0FBQ0g7SUFBNkIsMkJBQU87SUFnQ2hDLGlCQUFZLEdBQUcsRUFBRSxNQUFNO1FBRW5CLGlCQUFPLENBQUM7UUFuQkwsZUFBVSxHQUFHO1lBQ2hCLE1BQU0sRUFBRSxPQUFPLENBQUMsa0JBQWtCLENBQUM7WUFDbkMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQztZQUNyQyxRQUFRLEVBQUUsT0FBTyxDQUFDLG9CQUFvQixDQUFDO1lBQ3ZDLEtBQUssRUFBRSxPQUFPLENBQUMsaUJBQWlCLENBQUM7WUFDakMsWUFBWSxFQUFFLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQztZQUMvQyxLQUFLLEVBQUUsT0FBTyxDQUFDLGlCQUFpQixDQUFDO1lBQ2pDLFFBQVEsRUFBRSxPQUFPLENBQUMsb0JBQW9CLENBQUM7WUFDdkMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQztZQUNyQyxNQUFNLEVBQUUsT0FBTyxDQUFDLGtCQUFrQixDQUFDO1lBQ25DLFFBQVEsRUFBRSxPQUFPLENBQUMsb0JBQW9CLENBQUM7WUFDdkMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQztZQUNyQyxRQUFRLEVBQUUsT0FBTyxDQUFDLG9CQUFvQixDQUFDO1lBQ3ZDLFNBQVMsRUFBRSxPQUFPLENBQUMscUJBQXFCLENBQUM7WUFDekMsY0FBYyxFQUFFLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQztTQUN0RCxDQUFBO1FBTUcsRUFBRSxDQUFBLENBQUMsTUFBTSxDQUFDLFdBQVcsS0FBSyxNQUFNLENBQUMsQ0FBQSxDQUFDO1lBQzlCLE1BQU0sR0FBc0IsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvRCxDQUFDO1FBRUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFFckIsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRXpDLENBQUM7SUFFRDs7O09BR0c7SUFDSCx1QkFBSyxHQUFMLFVBQU0sV0FBa0I7UUFBRSxpQkFBVTthQUFWLFdBQVUsQ0FBVixzQkFBVSxDQUFWLElBQVU7WUFBVixnQ0FBVTs7UUFDaEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUQseUJBQU8sR0FBUDtRQUFBLGlCQXdCQztRQXRCRyxJQUFJLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFDekIsSUFBSSxHQUFHLFVBQUEsSUFBSTtZQUVQLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUU3QixxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUU1QixLQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3RCLEtBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDdkIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2xDLEtBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztZQUMvQixLQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDdEMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2xDLDJDQUEyQztRQUUvQyxDQUFDLENBQUE7UUFFTDs7V0FFRztRQUNILElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVaLENBQUM7SUFFTCxjQUFDO0FBQUQsQ0FBQyxBQWpGRCxDQUE2QixpQkFBTyxHQWlGbkM7QUFqRlksZUFBTyxVQWlGbkIsQ0FBQTtBQUVEOztHQUVHO0FBQ0gsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUN4QixTQUFBLE9BQU87Q0FDVixDQUFDLENBQUMifQ==