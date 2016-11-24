import { BootableInterface } from "../../../Interfaces/BootableInterface";
import { ModulesInterface } from "../Interfaces/ModulesInterface";
import { Mouse } from "./Mouse";
import Promise = require('bluebird');

/**
 * Raycaster Class
 */
export class Raycaster extends THREE.Raycaster implements BootableInterface, ModulesInterface {

    private camera;
    private mouse;
    private scene;
    private collection = [];

    constructor() {
        super()
    }

    public boot({camera, mouse, scene}) {
        this.camera = camera;
        this.mouse = mouse;
        this.scene = scene;
        this.params.Points.threshold = 10;
    }

    push(object, callback: Function) {

        object.userData.raycaster = {
            callback
        };

        this.collection.push(object);
    }

    public process(mouse: Mouse) {

        if (!this.collection.length) return;

        // this.params.Points.threshold = 2;
        this.setFromCamera(mouse.normalized, this.camera);

        let intersects = this.intersectObjects(this.collection, true);
        
        console.log('clicked', intersects)

        if (intersects.length) {

            intersects[0].object.userData.raycaster.callback(
                intersects[0].object, intersects
            );

        }

    }

    public remove(object: THREE.Object3D) {

        this.collection.forEach((item, index) => {

            if (object === item) {
                this.collection.splice(index, 1)
            }

        });

    }

    public update(time: number, delta: number): void {

        // if (!this.collection.length) return;

        // this.setFromCamera(this.mouse.normalized, this.camera);

        // let intersects = this.intersectObjects(this.collection, true);

        // if (intersects.length) {
        //     console.log(intersects)
        //     // console.log(intersects[0])
        // }


        // for (let i = 0; i < intersects.length; i++) {

        //     if (intersects[0].object instanceof THREE.Points) {
        //     }

        //     // let object = intersects[i].object.userData.raycaster;
        //     // object.callback();

        // }

    }

}
