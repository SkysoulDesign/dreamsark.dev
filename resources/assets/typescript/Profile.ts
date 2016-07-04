import THREE = require('three');
global.THREE = THREE;

import {Characters} from "./Profile/Characters";

/**
 * Import the TrackballControls
 */
require('../../../node_modules/three/examples/js/controls/TrackballControls');

export class Profile {

    private scene;
    private camera;
    private renderer;
    private control;
    private characters;

    constructor() {

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });

        this.control = new THREE.TrackballControls(this.camera, document.getElementById('canvas'));
        this.control.noPan = true;
        this.control.noZoom = true;

        this.characters = new Characters();

    }

    init() {

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

        this.scene.add(
            this.characters.first()
        );

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.position.z = 1000;

        this.renderer.setPixelRatio(1);
        this.renderer.setSize(500, 500);

        document.querySelector('#canvas').appendChild(
            this.renderer.domElement
        );

    }

    /**
     * Start The Interaction
     * @param item
     */
    start() {
        this.init();
        this.animate();
    }

    /**
     * Switch Character
     */
    switch(id:number) {

    }

    animate() {

        let loop = () => {

            requestAnimationFrame(loop);

            // head.rotation.y += 0.01;

            this.control.update();

            this.renderer.render(
                this.scene, this.camera
            );

        }

        /**
         * Start Loop
         */
        loop();

    }

}
