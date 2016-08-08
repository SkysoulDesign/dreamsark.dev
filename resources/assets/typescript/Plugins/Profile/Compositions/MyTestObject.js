"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//author cloud
var AbstractComposition_1 = require("../Abstract/AbstractComposition");
var Utilities_1 = require("./Utilities");
// import My2DImage = require ("Utilities");
/**
 * Main Composition
 */
var MyTestObject = (function (_super) {
    __extends(MyTestObject, _super);
    function MyTestObject() {
        _super.apply(this, arguments);
    }
    MyTestObject.prototype.setup = function (app) {
        this.app = app;
    };
    MyTestObject.prototype.stage = function (scene, camera, characters) {
        var width = this.app.browser.width;
        var height = this.app.browser.height;
        //this.app.renderer.render();
        var camera2 = new THREE.OrthographicCamera(0, 720, 480, 0, -1000, 1000);
        this.m_OrgthCamera = camera1;
        var l_CameraHelper = new THREE.CameraHelper(camera2);
        scene.add(l_CameraHelper);
        this.app.renderer.camera = camera2;
        var l_Test = new Utilities_1.My2DImage("img/profile/dreamsArkRef89.png", 720, 480, this.app);
        l_Test.m_Plane.position.set(360, 240, 0);
        scene.add(l_Test.m_Plane);
    };
    MyTestObject.prototype.update = function () {
        //this.m_OrgthCamera.
        //   this.cube.rotation.x += 0.1;
        // this.cube.rotation.y += 0.1;
    };
    return MyTestObject;
}(AbstractComposition_1.AbstractComposition));
exports.MyTestObject = MyTestObject;
/*var geometry = new THREE.PlaneGeometry( 5, 20, 32 );
var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
var plane = new THREE.Mesh( geometry, material );
scene.add( plane );*/
/*


// instantiate a loader
var loader = new THREE.ImageLoader();

// load a image resource
loader.load(
    // resource URL
    'textures/skyboxsun25degtest.png',
    // Function when resource is loaded
    function ( image ) {
        // do something with it

        // like drawing a part of it on a canvas
        var canvas = document.createElement( 'canvas' );
        var context = canvas.getContext( '2d' );
        context.drawImage( image, 100, 100 );
    },
    // Function called when download progresses
    function ( xhr ) {
        console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
    },
    // Function called when download errors
    function ( xhr ) {
        console.log( 'An error happened' );
    }
);
*/
//# sourceMappingURL=MyTestObject.js.map