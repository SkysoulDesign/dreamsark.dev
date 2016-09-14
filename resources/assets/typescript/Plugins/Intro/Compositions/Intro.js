"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Composition_1 = require("../Abstracts/Composition");
var Animator_1 = require("../Modules/Animator");
/**
 * Intro Composition
 */
var Intro = (function (_super) {
    __extends(Intro, _super);
    function Intro() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(Intro.prototype, "objects", {
        get: function () {
            return [
                'artist3d',
                'actor',
                'actress',
                'animation',
                'art-director',
                'camera-director',
                'concept-artist',
                'costume-designer',
                'director',
                'editor',
                'effects',
                'executive-producer',
                'lighting-artist',
                'make-up-artist',
                'packaging-designer',
                'pre-stage-project-coordinator',
                'project-coordinator',
                'prop',
                'recording-artist',
                'render-and-composite',
                'rigging-artist',
                'screenwriter',
                'script-supervisor',
                'set-designer',
                'sound-effect',
                'stage-manager',
                'storyboard-artist',
                'swing-gang',
                'voice-artist',
                'base'
            ];
        },
        enumerable: true,
        configurable: true
    });
    Intro.prototype.setup = function () {
        // console.log('hi')
    };
    Intro.prototype.stage = function (_a) {
        var _this = this;
        var actor = _a.actor, artist3d = _a.artist3d, base = _a.base;
        setTimeout(function () {
            _this.app.loader.load('/models/Actor.json').then(function (a) {
                console.log('what next', a);
            });
        }, 5000);
        artist3d.position.x = 30;
        this.scene.add(actor, base, artist3d);
        Animator_1.Animator
            .from(actor)
            .play('idle')
            .play('lookAround');
        console.log(artist3d); // faltando animacao
        Animator_1.Animator
            .from(artist3d)
            .play('idle')
            .play('lookAround');
    };
    Intro.prototype.update = function (_a, time, delta) {
        var actor = _a.actor, base = _a.base;
        actor.rotation.y += .05 - delta;
        actor.rotation.z += .05 - delta;
        base.rotation.y += .05 - delta;
        base.rotation.z += .05 - delta;
    };
    return Intro;
}(Composition_1.Composition));
exports.Intro = Intro;
//# sourceMappingURL=Intro.js.map