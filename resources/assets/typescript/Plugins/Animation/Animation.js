"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Plugins_1 = require("../../Abstract/Plugins");
var Helpers_1 = require("../../Helpers");
require("expose?THREE!three");
/**
 * Animation Class
 */
var Animation = (function (_super) {
    __extends(Animation, _super);
    function Animation(app, canvas) {
        _super.call(this);
        if (canvas.constructor === String) {
            canvas = document.querySelector(canvas);
        }
        this.canvas = canvas;
        app.bootstrap(this, Helpers_1.requireAll(require.context("./Classes", false, /\.js$/)));
    }
    /**
     * Start The Interaction
     * @param item
     */
    Animation.prototype.start = function (composition) {
        var payload = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            payload[_i - 1] = arguments[_i];
        }
        try {
            this.compositions.start(composition, payload);
        }
        catch (e) {
            console.log('got you');
        }
    };
    Animation.prototype.animate = function () {
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
    return Animation;
}(Plugins_1.Plugins));
exports.Animation = Animation;
/**
 * Auto install itself
 */
window['dreamsark'].install({
    Animation: Animation
});
//# sourceMappingURL=Animation.js.map