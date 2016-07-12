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
var Profile = (function (_super) {
    __extends(Profile, _super);
    function Profile(app) {
        _super.call(this);
        this.canvas = document.querySelector('#canvas');
        this.components = {
            camera: require('./Classes/Camera'),
            browser: require('./Classes/Browser'),
            controls: require('./Classes/Controls'),
            scene: require('./Classes/Scene'),
            light: require('./Classes/Light'),
            renderer: require('./Classes/Renderer'),
            manager: require('./Classes/Manager'),
            loader: require('./Classes/Loader'),
            animator: require('./Classes/animator'),
            characters: require('./Classes/Characters'),
            effectComposer: require('./Classes/EffectComposer'),
        };
        app.bootstrap(this, this.components);
    }
    Profile.prototype.init = function () {
        var _this = this;
        this.characters.get('designer').then(function (character) {
            _this.scene.add(character);
        });
    };
    /**
     * Start The Interaction
     * @param item
     */
    Profile.prototype.start = function () {
        this.init();
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
window['dreamsark'].install(Profile);
//# sourceMappingURL=Profile.js.map