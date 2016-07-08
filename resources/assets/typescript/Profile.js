"use strict";
var THREE = require('three');
global.THREE = THREE;
var Characters_1 = require("./Profile/Characters");
/**
 * Import the TrackballControls
 */
require('../../../node_modules/three/examples/js/controls/TrackballControls');
var Profile = (function () {
    function Profile() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        this.control = new THREE.TrackballControls(this.camera, document.getElementById('canvas'));
        this.control.noPan = true;
        this.control.noZoom = true;
        this.characters = new Characters_1.Characters();
    }
    Profile.prototype.init = function () {
        // let characters = ;
        //
        // let head = new THREE.Mesh(new THREE.BoxGeometry(200, 200, 200), new THREE.MeshBasicMaterial(
        //     {color: 'green', wireframe: true}
        // ));
        //
        // let body = new THREE.Mesh(new THREE.BoxGeometry(300, 400, 200), new THREE.MeshBasicMaterial(
        //     {color: 'yellow', wireframe: true}
        // ));
        //
        // head.position.set(0, 200, 0);
        // body.position.set(0, -300, 0);
        //
        // head.add(
        //     body
        // );
        //
        // console.dir(head)
        // console.dir(characters.first())
        // console.dir(this.characters.first());
        this.scene.add(this.characters.first());
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.position.z = 1000;
        this.renderer.setPixelRatio(1);
        this.renderer.setSize(500, 500);
        document.querySelector('#canvas').appendChild(this.renderer.domElement);
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
        var loop = function () {
            requestAnimationFrame(loop);
            // head.rotation.y += 0.01;
            _this.control.update();
            _this.renderer.render(_this.scene, _this.camera);
        };
        /**
         * Start Loop
         */
        loop();
    };
    return Profile;
}());
exports.Profile = Profile;
//# sourceMappingURL=Profile.js.map