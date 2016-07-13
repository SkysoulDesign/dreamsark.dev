"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Plugins_1 = require("../Plugins");
window['dreamsark'].exposes({
    THREE: require('three')
});
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
            characters: require('./Classes/Characters'),
            effectComposer: require('./Classes/EffectComposer'),
        };
        if (canvas instanceof String) {
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
        if (composition === void 0) { composition = 'main'; }
        var payload = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            payload[_i - 1] = arguments[_i];
        }
        this.compositions.start(composition, payload);
        this.animate();
    };
    /**
     * Switch Character
     */
    Profile.prototype.switch = function (id) {
    };
    Profile.prototype.animate = function () {
        var _this = this;
        var clock = new THREE.Clock(), loop = function (time) {
            var delta = clock.getDelta();
            requestAnimationFrame(loop);
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
//# sourceMappingURL=Profile.js.map