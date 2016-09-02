"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Plugins_1 = require("../../Abstract/Plugins");
var Helpers_1 = require("../../Helpers");
require("expose?THREE!three");
var Intro = (function (_super) {
    __extends(Intro, _super);
    /**
     * Constructor
     *
     * @param app
     * @param canvas
     */
    function Intro(app, canvas) {
        _super.call(this);
        if (canvas.constructor === String) {
            canvas = document.querySelector(canvas);
        }
        this.canvas = canvas;
        this.app = app;
        this.app.bootstrap(this, Helpers_1.requireAll(require.context("./Modules", true, /\.js$/)));
    }
    /**
     * Start The Interaction
     * @param item
     */
    Intro.prototype.start = function (composition) {
        var payload = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            payload[_i - 1] = arguments[_i];
        }
        try {
            this.compositions.start(composition, payload);
            this.animate();
        }
        catch (error) {
            console.log(error);
        }
    };
    /**
     * Animation Loop
     */
    Intro.prototype.animate = function () {
        var _this = this;
        var clock = new THREE.Clock(), loop = function (time) {
            var delta = clock.getDelta();
            requestAnimationFrame(loop);
            /**
             * Update Modules
             */
            _this.compositions.update(time, delta);
            _this.renderer.update(time, delta);
            _this.debugger.update(time, delta);
            // this.modules.forEach(
            //     module => module.update(time, delta)
            // )
        };
        /**
         * Start Loop
         */
        loop(0);
    };
    return Intro;
}(Plugins_1.Plugins));
exports.Intro = Intro;
/**
 * Auto install itself
 */
window['dreamsark'].install({
    Intro: Intro
});
//# sourceMappingURL=Intro.js.map