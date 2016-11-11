module DreamsArk.Modules {

    /**
     * Detect events on THREE.Object3D
     */
    export class Raycaster implements Initializable {

        public instance:THREE.Raycaster;

        constructor() {
            this.instance = new THREE.Raycaster();
        }

        configure():void {

        }

    }

}