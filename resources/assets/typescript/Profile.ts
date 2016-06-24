import THREE = require('three');
import Vector3 = THREE.Vector3;
global.THREE = THREE;

let head;

class Profile {

    private scene;
    private camera;
    private renderer;
    private control;

    constructor() {

        console.log();

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });


        this.control = require('../../../node_modules/three/examples/js/controls/TrackballControls');
        this.control = new THREE.TrackballControls(this.camera, document.getElementById('canvas'));
        this.control.noPan = true;
        this.control.noZoom = true;

        this.init();

    }

    init() {

        let material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});

        head = new THREE.Mesh(new THREE.BoxGeometry(200, 200, 200), material);
        let body = new THREE.Mesh(new THREE.BoxGeometry(300, 400, 200), material);

        body.position.set(0, -300, 0);

        head.position.set(0, 200, 0);
        head.add(
            body
        );

        this.scene.add(head);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.position.z = 1000;

        this.renderer.setPixelRatio(1);
        this.renderer.setSize(500, 500);

        document.querySelector('#canvas').appendChild(
            this.renderer.domElement
        );

    }

    animate() {

        requestAnimationFrame(app.animate);

        head.rotation.y += 0.01;

        app.control.update();

        app.renderer.render(
            app.scene, app.camera
        );

    }

}

let app = new Profile();
app.animate();