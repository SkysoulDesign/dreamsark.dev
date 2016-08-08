//author cloud
import {AbstractComposition} from "../Abstract/AbstractComposition";
import {My2DImage} from "./Utilities";
import {Loader} from "../Classes/Loader";
// import My2DImage = require ("Utilities");

/**
 * Main Composition
 */

export class MyTestObject extends AbstractComposition {
    private cube:THREE.Object3D;
    private app;
    private m_OrgthCamera:THREE.OrthographicCamera;
    setup(app){
        this.app = app;
    }

    stage(scene, camera:THREE.Camera, characters) {
        var width = this.app.browser.width;
        let height = this.app.browser.height;
        //this.app.renderer.render();
        let  camera2 = new THREE.OrthographicCamera(
            0,720,
            480,0,
            -1000, 1000 );
        this.m_OrgthCamera = camera1;
        var l_CameraHelper = new THREE.CameraHelper(camera2);
        scene.add(l_CameraHelper);
        this.app.renderer.camera = camera2;

        var l_Test = new My2DImage("img/profile/dreamsArkRef89.png",720,480,this.app);
        l_Test.m_Plane.position.set(360,240,0);
        scene.add( l_Test.m_Plane);
    }

    update(){
        //this.m_OrgthCamera.
     //   this.cube.rotation.x += 0.1;
       // this.cube.rotation.y += 0.1;
    }

}

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
